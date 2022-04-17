import express from 'express';
import {ownerOf, tokensOf, tokenURI} from "../contractUtils/contractUtils";

const router = express.Router();

router.get('/tokens-of/:address', async (req, res) => {
    res.send(await tokensOf(req.params.address));
});

router.get('/token-uri/:ticketid', async (req, res) => {
    res.send(await tokenURI(req.params.ticketid));
});
router.get('/owner-of/:ticketid', async (req, res) => {
    res.send(await ownerOf(req.params.ticketid));
});

export default router;
