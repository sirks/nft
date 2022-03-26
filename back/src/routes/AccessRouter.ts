import express from 'express';
import Access from '../dao/Access';
import {BaseRestResp, ERR, OK} from "../types";
import {dummyStore} from "../ipfs/ipfsUtils";
import recoverAddress, {mint, ownerOf} from "../contractUtils";
import {isAddress} from "ethers/lib/utils";

async function mintMiddleware(req: express.Request, res: express.Response, next) {
    if (
        typeof req.query.event !== 'string'
        || typeof req.query.token !== 'string'
        || typeof req.query.address !== 'string') {
        const err: BaseRestResp = {err: {msg: "pass event, token, address in query params", code: ERR.INCORRECT_DATA}};
        res.status(400).send(err);
        return;
    }
    if (!isAddress(req.query.address)) {
        const err: BaseRestResp = {err: {msg: "wrong address format", code: ERR.INCORRECT_DATA}};
        res.status(400).send(err);
        return;
    }
    const client = await dao.findToken(req.query.event, req.query.token);
    if (!client) {
        const err: BaseRestResp = {err: {msg: "No such event/token", code: ERR.NO_SUCH_TOKEN}}
        res.status(404).send(err);
        return;
    }
    // to set variables from middleware throughout a request
    res.locals.client = client;
    res.locals.address = req.query.address;
    next();
}

const router = express.Router();
const dao = new Access();

router.get('/mint', mintMiddleware, async (req: express.Request, res: express.Response) => {
    const client = res.locals.client;
    const address = res.locals.address;
    if (client.address || client.processing) {
        const err: BaseRestResp = {err: {msg: "token already used", code: ERR.TOKEN_USED}}
        res.status(404).send(err);
        return;
    }
    client.processing = true;
    await dao.update(client);
    const ipfsToken = await dummyStore();
    try {
        const mintResult = await mint(address, ipfsToken.url);
        const mintObj = JSON.parse(JSON.stringify(mintResult))
        client.transactionHash = mintObj.hash;
        console.log("mint ok", JSON.stringify(mintResult));
    } catch (e) {
        console.log("mint error", e.stack);
        const err: BaseRestResp = {err: {msg: "could not mint ticket", code: ERR.INCORRECT_DATA}}
        res.status(400).send(err);
        setTimeout(async () => {
            client.processing = false;
            await dao.update(client);
        }, 60000);
        return;
    }

    client.processing = false;
    client.address = address;
    client.img = ipfsToken.data.image.href;
    await dao.update(client);

    const ok: BaseRestResp = {data: {img: ipfsToken.data.image.href}}
    res.send(ok);
    console.log("mint done", req.query.event, req.query.token, req.query.address, ok);
});

router.get('/entrance', async (req: express.Request, res: express.Response) => {
    try {
        if (
            typeof req.query.event !== 'string'
            || typeof req.query.token !== 'string') {
            const err: BaseRestResp = {err: {msg: "pass event, token in query params", code: ERR.INCORRECT_DATA}}
            res.status(400).send(err);
            return;
        }
        const event = req.query.event;
        const token = await dao.findToken('', req.query.token);
        if (token && token.address && token.transactionHash) {
            if (token.entrances) {
                if (token.entrances.includes(event.toLowerCase())) {
                    const err: BaseRestResp = {err: {msg: "token already scanned", code: ERR.TOKEN_SCANNED}};
                    res.status(404).send(err);
                    return;
                }
                token.entrances.push(event);
            } else {
                token.entrances = [event];
            }
            await dao.update(token);
            const ok: BaseRestResp = {data: {code: OK.NEW_VISIT}};
            res.send(ok);
            return;
        }
        const err: BaseRestResp = {err: {msg: "token not minted", code: ERR.TOKEN_NOT_MINTED}}
        res.status(404).send(err);
    } catch (e) {
        const err: BaseRestResp = {err: {msg: "Something went wrong", code: ERR.INCORRECT_DATA}}
        res.status(400).send(err);
        return;
    }
})

router.get('/is-minted', mintMiddleware, async (req, res) => {
    try {
        const isMinted: BaseRestResp = {data: false};
        const client = res.locals.client;
        if (client.address && !client.processing && client.transactionHash) {
            isMinted.data = true;
        }
        res.send(isMinted);
    } catch (e) {
        const err: BaseRestResp = {err: {msg: "Something went wrong", code: ERR.INCORRECT_DATA}}
        res.status(400).send(err);
        return;
    }
});

export default router;
