import express from 'express';
import Codes from "../dao/Codes";
import Events from "../dao/Events";
import {BaseRestResp, ERR, OK} from "../types";
import Access from "../dao/Access";

const router = express.Router();

const codesDao = new Codes();
const eventsDao = new Events();
const accessDao = new Access();

router.get('/register', async (req: express.Request, res: express.Response) => {
    if (typeof req.query.code !== 'string' || typeof req.query.ticket !== 'string') {
        const err: BaseRestResp = {err: {msg: "pass code, ticket in query param", code: ERR.INCORRECT_DATA}};
        res.status(400).send(err);
        return;
    }
    const access = await accessDao.findToken(req.query.ticket)
    if (!access) {
        const err: BaseRestResp = {err: {msg: "no such ticket", code: ERR.TICKET_NOT_EXIST}};
        res.status(400).send(err);
        return;
    }
    const code = await codesDao.findCode(req.query.code)
    if (!code) {
        const err: BaseRestResp = {err: {msg: "incorrect code", code: ERR.CODE_NOT_EXIST}};
        res.status(400).send(err);
        return;
    }
    const event = await eventsDao.findOneBy_id(code.event);
    if (!event) {
        //this should not happen
        const err: BaseRestResp = {err: {msg: "no such event", code: ERR.CODE_NOT_EXIST}};
        res.status(400).send(err);
        return;
    }
    if (access.entrances) {
        if (access.entrances[event.name] !== undefined) {
            const ok: BaseRestResp = {data: {code: OK.EVENT_ALREADY_REGISTERED, event}};
            res.status(200).send(ok);
            return;
        }
    }
    if (code.used >= code.total) {
        const err: BaseRestResp = {err: {msg: "code used", code: ERR.CODE_USED}};
        res.status(400).send(err);
        return;
    }
    if (access.entrances === undefined) {
        access.entrances = {}
    }
    access.entrances[event.name] = false
    await accessDao.update(access);
    code.used += 1;
    await codesDao.update(code);

    const ok: BaseRestResp = {data: {code: OK.EVENT_REGISTERED, event}};
    res.status(200).send(ok);
});

export default router;
