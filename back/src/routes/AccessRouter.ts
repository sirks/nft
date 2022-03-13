import express from 'express';
import Access from '../dao/Access';
import {BaseRestResp, ERR, OK} from "../types";
import {dummyStore} from "../ipfs/ipfsUtils";
import recoverAddress, {mint, ownerOf} from "../contractUtils";
import {setTimeout} from "timers";
import {isAddress} from "ethers/lib/utils";

const router = express.Router();
const dao = new Access();

router.get('/mint', async (req, res) => {
    if (
        typeof req.query.event !== 'string'
        || typeof req.query.token !== 'string'
        || typeof req.query.address !== 'string') {
        const err: BaseRestResp = {err: {msg: "pass event, token, address in query params", code: ERR.INCORRECT_DATA}}
        res.status(400).send(err);
        return
    }
    if (!isAddress(req.query.address)) {
        const err: BaseRestResp = {err: {msg: "wrong address format", code: ERR.INCORRECT_DATA}}
        res.status(400).send(err);
        return
    }
    const client = await dao.findToken(req.query.event, req.query.token)
    if (!client) {
        const err: BaseRestResp = {err: {msg: "No such event/token", code: ERR.NO_SUCH_TOKEN}}
        res.status(404).send(err);
        return;
    }
    if (client.address || client.processing) {
        const err: BaseRestResp = {err: {msg: "token already used", code: ERR.TOKEN_USED}}
        res.status(404).send(err);
        return;
    }
    client.processing = true;
    await dao.update(client);
    // generateArt();
    const ipfsToken = await dummyStore();
    try {
        const mintResult = await mint(req.query.address, ipfsToken.url)
        console.log("mint ok", JSON.stringify(mintResult));
    } catch (e) {
        console.log("mint error", e.stack);
        const err: BaseRestResp = {err: {msg: "could not mint ticket", code: ERR.INCORRECT_DATA}}
        res.status(400).send(err);
        setTimeout(async () => {
            client.processing = false;
            await dao.update(client);
        }, 60000)
        return;
    }

    client.processing = false;
    client.address = req.query.address;
    await dao.update(client);

    const ok: BaseRestResp = {data: {img: ipfsToken.data.image.href}}
    res.send(ok);
    console.log("mint done", req.query.event, req.query.token, req.query.address, ok);
});

router.get('/entrance', async (req, res) => {
    if (
        typeof req.query.event !== 'string'
        || typeof req.query.token !== 'string'
        || typeof req.query.signature !== 'string') {
        const err: BaseRestResp = {err: {msg: "pass event, token, signature in query params", code: ERR.INCORRECT_DATA}}
        res.status(400).send(err);
        return
    }
    const entrance = await dao.findToken(req.query.event, req.query.token)
    const address = recoverAddress(req.query.token, req.query.signature)
    if (entrance && entrance.address) {
        if (entrance.address === address) {
            const ok: BaseRestResp = {data: {code: OK.RETURNING_VISIT}}
            res.send(ok);
            return
        }
        const err: BaseRestResp = {err: {msg: "token already used", code: ERR.TOKEN_USED}}
        res.status(404).send(err);
        return;
    }
    const ownerAddress = await ownerOf(req.query.token);
    if (ownerAddress === address) {
        if (entrance) {
            entrance.address = address
            await dao.update(entrance)
        } else {
            await dao.create({event: req.query.event, token: req.query.token, address})
        }
        const ok: BaseRestResp = {data: {code: OK.NEW_VISIT}}
        res.send(ok);
        return;
    }
    const err: BaseRestResp = {err: {msg: "not your token", code: ERR.TOKEN_STOLEN}}
    res.status(404).send(err);
})

export default router;
