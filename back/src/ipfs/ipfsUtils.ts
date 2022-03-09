import {File, NFTStorage} from "nft.storage";
import {NFT_STORAGE_KEY} from "../config/config";
import fs from "fs";
import path from "path";
import generateArt from "../art/generateArt";


// connect to a different API
const nftStorage = new NFTStorage({token: NFT_STORAGE_KEY});

async function fileFromPath(filePath: string) {
    // const content = await fs.promises.readFile(filePath);
    const content = await generateArt();
    return new File([content], "techchill.png", {type: "image/png"});
}

export async function dummyStore() {
    const img = await fileFromPath(path.join(__dirname, "techchill_NFT_Art.png"));
    return store(img, "TechChill Art", "Yet another TechChill Art");
}

export async function store(image: File, name: string, description: string) {
    const stored = await nftStorage.store({image, name, description});
    console.log(stored);
    return stored;
}
