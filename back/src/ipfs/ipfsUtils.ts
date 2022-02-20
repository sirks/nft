import {NFTStorage, File} from "nft.storage";
import {NFT_STORAGE_KEY} from "../../config";
import fs from "fs";
import path from "path";


// connect to a different API
const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    return new File([content], "crispy.png", { type: "image/png"})
}

export async function dummyStore(){
    const img = await fileFromPath(path.join(__dirname, "img.png"));
    return store(img, "Crispy Coin", "Yet another Crispy Coin");
}

export async function store(image:File, name:string, description:string) {
    const stored = await nftStorage.store({image, name, description})
    console.log(stored);
    return stored
}