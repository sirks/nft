import {ethers} from "ethers";
import {Resp} from "./types";

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
