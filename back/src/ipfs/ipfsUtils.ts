import {File, NFTStorage} from "nft.storage";
import {NFT_STORAGE_KEY} from "../config/config";
import generateArt from "../art/generateArt";


// connect to a different API
const nftStorage = new NFTStorage({token: NFT_STORAGE_KEY});

async function getArtFile() {
    const content = await generateArt();
    return new File([content], "techchill.png", {type: "image/png"});
}

export async function dummyStore() {
    const img = await getArtFile();
    return store(img, "TechChill Art", "Yet another TechChill Art");
}

export async function store(image: File, name: string, description: string) {
    return await nftStorage.store({image, name, description});
}

export function ipfs2https(uri: string) {
    return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
}
