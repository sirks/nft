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

export async function getTokenURI(ticketid: string): Promise<string> {

    return await fetch(`${CONTRACT_BASE_URL}/token-uri/${ticketid}`).then(r => r.text());
}

export async function getOwnerOf(ticketid: string): Promise<string> {

    return await fetch(`${CONTRACT_BASE_URL}/owner-of/${ticketid}`).then(r => r.text());
}

const ACCESS_BASE_URL = `${SERVER}/access`

export async function mint(ticketid: string, address: string): Promise<BaseRestResp> {
    return await fetch(`${ACCESS_BASE_URL}/mint?ticketid=${ticketid}&address=${address}`)
        .then(r=>r.json());
}

const EVENT_BASE_URL = `${SERVER}/event`

export async function register(code: string, ticket: string): Promise<BaseRestResp> {
    return await fetch(`${EVENT_BASE_URL}/register?code=${code}&ticket=${ticket}`)
        .then(r=>r.json());
}

// export async function getMinted(event: string, hash: string): Promise<BaseRestResp> {
//     return await fetch(`${ACCESS_BASE_URL}/get-minted?event=${event}&token=${hash}`)
//         .then(r=>r.json());
// }

// export async function checkIfMinted(event: string, hash: string, address: string): Promise<BaseRestResp> {
//     return await fetch(`${ACCESS_BASE_URL}/is-minted?event=${event}&token=${hash}&address=${address}`)
//         .then(r=>r.json());
// }

export async function entrance(ticketid: string, entrance: string): Promise<BaseRestResp> {
    return await fetch(`${ACCESS_BASE_URL}/entrance?ticketid=${ticketid}&entrance=${entrance}`)
        .then(r=>r.json());
}

export async function checkTicket(code: string): Promise<BaseRestResp> {
    return await fetch(`${ACCESS_BASE_URL}/check-ticket?id=${code}`)
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
