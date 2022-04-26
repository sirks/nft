import {store} from "./ipfsUtils";
import mime from 'mime'
import * as fs from "fs";
import * as path from "path";
import {File} from "nft.storage";

async function fileFromPath(filePath: string) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.lookup(filePath)
    return new File([content], path.basename(filePath), { type })
}

test('store works', async () => {
    const image = await fileFromPath(path.join(__dirname, "glow.gif"))
    const token = await store(image);
    expect(token.url).toBeGreaterThan(2);
});
