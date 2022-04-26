import {File, NFTStorage} from "nft.storage";
import {NFT_STORAGE_KEY} from "../config/config";
import generateArt from "../art/generateArt";


const nftStorage = new NFTStorage({token: NFT_STORAGE_KEY});

async function getArtFile() {
    const content = await generateArt();
    return new File([content], "techchill.png", {type: "image/png"});
}

export async function store(image: File) {
    return await nftStorage.store({description: "Techchill 2022 NFT", name: "", image});
}

export async function storeArt() {
    const image = await getArtFile();
    return await store(image);
}

export function ipfs2https(uri: string) {
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
}
