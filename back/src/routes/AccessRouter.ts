import express from 'express';
import Access from '../dao/Access';
import bodyParser from 'body-parser';
import {BaseRestResp} from "../types";
import {ERR} from "../errors";
import {dummyStore} from "../ipfs/ipfsUtils";

const router = express.Router();
const dao = new Access();

router.get('/', async (req, res) => {
    if (typeof req.query.event !== 'string' || typeof req.query.token !== 'string') {
    return
    }
    const client = await dao.findToken(req.query.event, req.query.token)
    if (!client) {
        const err: BaseRestResp = {err: {msg: "No such event/token", code: ERR.NO_SUCH_TOKEN}}
        res.status(404).send(err);
        return;
    }
    if (client.address) {
        const err: BaseRestResp = {err: {msg: "token already used", code: ERR.TOKEN_USED}}
        res.status(400).send(err);
        return;
    }


    // res.send(data);
});

router.get('/img', async (req, res) => {
    dummyStore();
    res.send("data");
});

export default router;
