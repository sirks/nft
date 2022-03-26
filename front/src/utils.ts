import {ethers} from "ethers";
import {SERVER} from "./environment";
import {BaseRestResp, Resp} from "./Types/types";

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
    try {
        return await fetch(`${CONTRACT_BASE_URL}/tokens-of/${address}`).then(r=>r.json());
    } catch (e) {
        return [];
    }

}

export async function getTokenURI(token: string): Promise<string> {

    return await fetch(`${CONTRACT_BASE_URL}/token-uri/${token}`).then(r => r.text());
}

export async function getOwnerOf(token: string): Promise<string> {

    return await fetch(`${CONTRACT_BASE_URL}/owner-of/${token}`).then(r => r.text());
}

const ACCESS_BASE_URL = `${SERVER}/access`

export async function mint(event: string, hash: string, address: string): Promise<BaseRestResp> {
    return await fetch(`${ACCESS_BASE_URL}/mint?event=${event}&token=${hash}&address=${address}`)
        .then(r=>r.json());
}

export async function checkIfMinted(event: string, hash: string, address: string): Promise<BaseRestResp> {
    return await fetch(`${ACCESS_BASE_URL}/is-minted?event=${event}&token=${hash}&address=${address}`)
        .then(r=>r.json());
}

export async function entrance(event: string, token: string): Promise<BaseRestResp> {
    return await fetch(`${ACCESS_BASE_URL}/entrance?event=${event}&token=${token}`)
        .then(r=>r.json());
}

export const onImageDownload = (id: string) => {
    const svg = document.getElementById(id!);
    const svgData = new XMLSerializer().serializeToString(svg!);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
        canvas.width = 800;
        canvas.height = 800;
        ctx?.drawImage(img, 0, 0, img.width * 4, img.height * 4);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "NFT_QRCode";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
};
