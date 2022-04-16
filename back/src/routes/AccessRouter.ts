import express from 'express';
import Access from '../dao/Access';
import {BaseRestResp, ERR, Metadata, OK} from "../types";
import {dummyStore, ipfs2https} from "../ipfs/ipfsUtils";
import {mint, tokenIdBy, tokenURI} from "../contractUtils/contractUtils";
import {isAddress} from "ethers/lib/utils";
import axios, {AxiosResponse} from "axios";
import {checkTicket} from "../techchill/techchill";

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
        const err: BaseRestResp = {err: {msg: "No such event/token", code: ERR.TOKEN_NOT_EXIST}}
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
            || typeof req.query.token !== 'string'
            || typeof req.query.entrance !== 'string'
        ) {
            const err: BaseRestResp = {err: {msg: "pass event, token, entrance in query params", code: ERR.INCORRECT_DATA}}
            res.status(400).send(err);
            return;
        }

        const event = req.query.event;
        const entrance = req.query.entrance.toLowerCase();
        const token = await dao.findToken(event, req.query.token);
        if (!token) {
            const err: BaseRestResp = {err: {msg: "No such event/token", code: ERR.TOKEN_NOT_EXIST}};
            res.status(404).send(err);
            return;
        }

        if (token && token.address && token.transactionHash) {
            if (token.entrances) {
                if (token.entrances.includes(entrance)) {
                    const err: BaseRestResp = {err: {msg: "token already scanned", code: ERR.TOKEN_SCANNED}};
                    res.status(404).send(err);
                    return;
                }
                token.entrances.push(entrance);
            } else {
                token.entrances = [entrance];
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

// router.get('/is-minted', mintMiddleware, async (req, res) => {
//     try {
//         const isMinted: BaseRestResp = {data: false};
//         const client = res.locals.client;
//         if ((client.address && !client.processing) || client.transactionHash) {
//             isMinted.data = true;
//         }
//         res.send(isMinted);
//     } catch (e) {
//         const err: BaseRestResp = {err: {msg: "Something went wrong", code: ERR.INCORRECT_DATA}}
//         res.status(400).send(err);
//         return;
//     }
// });

router.get('/get-minted', async (req: express.Request, res: express.Response) => {
    try {
        if (
            typeof req.query.event !== 'string'
            || typeof req.query.token !== 'string') {
            const err: BaseRestResp = {err: {msg: "pass event, token in query params", code: ERR.INCORRECT_DATA}};
            res.status(400).send(err);
            return;
        }
        const client = await dao.findToken(req.query.event, req.query.token);
        if (!client) {
            const err: BaseRestResp = {err: {msg: "No such event/token", code: ERR.TOKEN_NOT_EXIST}}
            res.status(404).send(err);
            return;
        }

        const ok: BaseRestResp = {data: {}};

        // isnt minted
        if (!((client.address && !client.processing) || client.transactionHash)) {
            ok.data = false;
            res.send(ok);
            return;
        }

        if (client.img && client.tokenId) {
            ok.data.img = client.img;
            ok.data.tokenId = client.tokenId;
            res.send(ok);
            return;
        }

        if (client.transactionHash) {
            console.log('has transactionHash', client.transactionHash);
            const tokenId = await tokenIdBy(client.transactionHash);
            if (typeof tokenId === "number") {
                console.log(tokenId);
                client.tokenId = tokenId;
                ok.data.tokenId = tokenId;
                if (!client.img) {
                    const tokenUrl = await tokenURI(tokenId.toString());
                    const metadataJson: AxiosResponse<Metadata> = await axios.get<Metadata>(ipfs2https(tokenUrl));
                    if (metadataJson.status === 200 && metadataJson.data.image) {
                        const img = metadataJson.data.image;
                        client.img = img;
                        ok.data.img = img;
                    }
                } else {
                    ok.data.img = client.img;
                }
                await dao.update(client);
            } else {
                const err: BaseRestResp = {err: {msg: "Not token id", code: ERR.INCORRECT_DATA}};
                res.status(400).send(err);
                return;
            }

        } else {
            const err: BaseRestResp = {err: {msg: "Dont have transaction hash", code: ERR.INCORRECT_DATA}};
            res.status(400).send(err);
            return;
        }
        res.send(ok);
    } catch (e) {
        console.log(e.stack);
        const err: BaseRestResp = {err: {msg: "Something went wrong", code: ERR.INCORRECT_DATA}};
        res.status(400).send(err);
        return;
    }
});

router.get('/check-ticket', async (req: express.Request, res: express.Response) => {
    if (typeof req.query.code !== 'string'){
        const err: BaseRestResp = {err: {msg: "pass ticketId in query params", code: ERR.INCORRECT_DATA}};
        res.status(400).send(err);
        return;
    }
    const ticketExists = await checkTicket(req.query.code);
    if(ticketExists){
        const ok: BaseRestResp = {data: {code: OK.TICKET_EXISTS}};
        res.send(ok);
    }
    else{
        const err: BaseRestResp = {err: {msg: "ticket not exist", code: ERR.TICKET_NOT_EXIST}};
        res.send(err);
    }
});

export default router;
