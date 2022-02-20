import {ethers} from "ethers";
import {BaseRestResp, Resp} from "./types";
import {fetchJson} from "ethers/lib/utils";
import {SERVER} from "./environment";

export function ipfs2https(uri: string) {
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
}

export async function signMessage(provider: ethers.providers.Web3Provider, message: string): Promise<string> {
    try {
        return await provider.getSigner().signMessage(message);
    } catch (err) {
        console.log("could not sign message");
        return "";
    }
}

export const verifyMessage = (msg: string, signature: string): Resp => {
    try {
        return {ok: ethers.utils.verifyMessage(msg, signature), nok: ""};
    } catch (err) {
        return {ok: "", nok: err};
    }
};

const CONTRACT_BASE_URL = `${SERVER}/contract`

export async function getTokensOf(address: string): Promise<string[]> {

    return await fetchJson(`${CONTRACT_BASE_URL}/tokens-of/${address}`);
}

export async function getTokenURI(token: string): Promise<string> {

    return await fetch(`${CONTRACT_BASE_URL}/token-uri/${token}`).then(r => r.text());
}

export async function getOwnerOf(token: string): Promise<string> {

    return await fetch(`${CONTRACT_BASE_URL}/owner-of/${token}`).then(r => r.text());
}

const ACCESS_BASE_URL = `${SERVER}/access`

export async function mint(event: string, token: string, address: string): Promise<BaseRestResp> {
    return await fetchJson(`${ACCESS_BASE_URL}/mint?event=${event}&token=${token}&address=${address}`)
}

export async function entrance(event: string, token: string, signature: string): Promise<BaseRestResp> {
    return await fetchJson(`${ACCESS_BASE_URL}/entrance?event=${event}&token=${token}&signature=${signature}`)
}
