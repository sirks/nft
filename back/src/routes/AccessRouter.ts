import express from 'express';
import Access from '../dao/Access';
import {BaseRestResp, ERR, OK} from "../types";
import {storeArt} from "../ipfs/ipfsUtils";
import {mint, tokenIdBy} from "../contractUtils/contractUtils";
import {isAddress} from "ethers/lib/utils";
import {checkTicket} from "../techchill/techchill";

const router = express.Router();
const dao = new Access();

router.get('/check-ticket', async (req: express.Request, res: express.Response) => {
    if (typeof req.query.id !== 'string') {
        const err: BaseRestResp = {err: {msg: "pass id in query query", code: ERR.INCORRECT_DATA}};
        res.status(400).send(err);
        return;
    }
    const access = await dao.findToken(req.query.id);
    if (access) {
        if (access.transactionHash) {
            if (!access.tokenId) {
                const tokenId = await tokenIdBy(access.transactionHash)
                if (tokenId) {
                    access.tokenId = tokenId
                    await dao.update(access)
                }
            }
            const ok: BaseRestResp = {data: {code: OK.MINTED, img: access.img, tokenId: access.tokenId}};
            res.status(200).send(ok);
            return;
        } else {
            const ok: BaseRestResp = {data: {code: OK.TICKET_EXISTS}};
            res.send(ok);
            return;
        }
    }
    const ticketExists = await checkTicket(req.query.id);
    if (ticketExists) {
        await dao.create({ticketId: req.query.id});
        const ok: BaseRestResp = {data: {code: OK.TICKET_EXISTS}};
        res.send(ok);
    } else {
        const err: BaseRestResp = {err: {msg: "ticket not exist", code: ERR.TICKET_NOT_EXIST}};
        res.send(err);
    }
});


async function mintMiddleware(req: express.Request, res: express.Response, next) {
    if (typeof req.query.ticketid !== 'string' || typeof req.query.address !== 'string') {
        const err: BaseRestResp = {err: {msg: "pass ticketid, address in query params", code: ERR.INCORRECT_DATA}};
        res.status(400).send(err);
        return;
    }
    if (!isAddress(req.query.address)) {
        const err: BaseRestResp = {err: {msg: "wrong address format", code: ERR.INCORRECT_DATA}};
        res.status(400).send(err);
        return;
    }
    const access = await dao.findToken(req.query.ticketid);
    if (!access) {
        const err: BaseRestResp = {err: {msg: "No such ticket", code: ERR.TICKET_NOT_EXIST}}
        res.status(404).send(err);
        return;
    }
    // to set variables from middleware throughout a request
    res.locals.access = access;
    res.locals.address = req.query.address;
    next();
}

router.get('/mint', mintMiddleware, async (req: express.Request, res: express.Response) => {
    const access = res.locals.access;
    const address = res.locals.address;
    if (access.address) {
        const err: BaseRestResp = {err: {msg: "ticket minted", code: ERR.TICKET_MINTED}}
        res.status(404).send(err);
        return;
    }
    access.address = address;
    await dao.update(access);
    const ipfsToken = await storeArt();
    try {
        const mintResult:any = await mint(address, ipfsToken.url);
        console.log("mint ok", mintResult);
        access.transactionHash = mintResult.hash;
    } catch (e) {
        console.log("mint error", e.stack);
        const err: BaseRestResp = {err: {msg: "could not mint ticket", code: ERR.INCORRECT_DATA}}
        res.status(400).send(err);
        setTimeout(async () => {
            access.address = undefined;
            await dao.update(access);
        }, 60000);
        return;
    }

    access.img = ipfsToken.data.image.href;
    await dao.update(access);
    const ok: BaseRestResp = {data: {img: ipfsToken.data.image.href}}
    res.send(ok);
    console.log("mint done", req.query.ticketid, req.query.address, ok);
});

router.get('/entrance', async (req: express.Request, res: express.Response) => {
    try {
        if (typeof req.query.ticketid !== 'string' || typeof req.query.entrance !== 'string') {
            const err: BaseRestResp = {err: {msg: "pass entrance, ticketid in query params", code: ERR.INCORRECT_DATA}}
            res.status(400).send(err);
            return;
        }

        const token = await dao.findToken(req.query.ticketid);
        if (!token) {
            const err: BaseRestResp = {err: {msg: "No such token", code: ERR.TICKET_NOT_EXIST}};
            res.status(404).send(err);
            return;
        }
        const entrance = req.query.entrance.toLowerCase();
        if (token.address && token.transactionHash) {
            if (token.entrances) {
                if (token.entrances[entrance]) {
                    const err: BaseRestResp = {err: {msg: "ticket already scanned", code: ERR.TICKET_SCANNED}};
                    res.status(404).send(err);
                    return;
                }
                //can be undefined, which is a different business logic
                if (token.entrances[entrance] === false) {
                    token.entrances[entrance] = true;
                    await dao.update(token);
                    const ok: BaseRestResp = {data: {code: OK.NEW_VISIT}};
                    res.send(ok);
                    return;
                }
            }
            const err: BaseRestResp = {err: {msg: "not registered to this event", code: ERR.NOT_REGISTERED}};
            res.status(404).send(err);
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

// router.get('/get-minted', async (req: express.Request, res: express.Response) => {
//     try {
//         if (
//             typeof req.query.event !== 'string'
//             || typeof req.query.token !== 'string') {
//             const err: BaseRestResp = {err: {msg: "pass event, token in query params", code: ERR.INCORRECT_DATA}};
//             res.status(400).send(err);
//             return;
//         }
//         const client = await dao.findEventToken(req.query.event, req.query.token);
//         if (!client) {
//             const err: BaseRestResp = {err: {msg: "No such event/token", code: ERR.TOKEN_NOT_EXIST}}
//             res.status(404).send(err);
//             return;
//         }
//
//         const ok: BaseRestResp = {data: {}};
//
//         // isnt minted
//         if (!((client.address && !client.processing) || client.transactionHash)) {
//             ok.data = false;
//             res.send(ok);
//             return;
//         }
//
//         if (client.img && client.tokenId) {
//             ok.data.img = client.img;
//             ok.data.tokenId = client.tokenId;
//             res.send(ok);
//             return;
//         }
//
//         if (client.transactionHash) {
//             console.log('has transactionHash', client.transactionHash);
//             const tokenId = await tokenIdBy(client.transactionHash);
//             if (typeof tokenId === "number") {
//                 console.log(tokenId);
//                 client.tokenId = tokenId;
//                 ok.data.tokenId = tokenId;
//                 if (!client.img) {
//                     const tokenUrl = await tokenURI(tokenId.toString());
//                     const metadataJson: AxiosResponse<Metadata> = await axios.get<Metadata>(ipfs2https(tokenUrl));
//                     if (metadataJson.status === 200 && metadataJson.data.image) {
//                         const img = metadataJson.data.image;
//                         client.img = img;
//                         ok.data.img = img;
//                     }
//                 } else {
//                     ok.data.img = client.img;
//                 }
//                 await dao.update(client);
//             } else {
//                 const err: BaseRestResp = {err: {msg: "Not token id", code: ERR.INCORRECT_DATA}};
//                 res.status(400).send(err);
//                 return;
//             }
//
//         } else {
//             const err: BaseRestResp = {err: {msg: "Dont have transaction hash", code: ERR.INCORRECT_DATA}};
//             res.status(400).send(err);
//             return;
//         }
//         res.send(ok);
//     } catch (e) {
//         console.log(e.stack);
//         const err: BaseRestResp = {err: {msg: "Something went wrong", code: ERR.INCORRECT_DATA}};
//         res.status(400).send(err);
//         return;
//     }
// });

export default router;
