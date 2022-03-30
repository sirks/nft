import express from 'express';
import {ownerOf, tokensOf, tokenURI} from "../contractUtils/contractUtils";

const router = express.Router();

router.get('/tokens-of/:address', async (req, res) => {
    res.send(await tokensOf(req.params.address));
});

router.get('/token-uri/:token', async (req, res) => {
    res.send(await tokenURI(req.params.token));
});
router.get('/owner-of/:token', async (req, res) => {
    res.send(await ownerOf(req.params.token));
});

export default router;
