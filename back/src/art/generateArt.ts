import {createImageData, createCanvas, loadImage} from 'canvas';
import fs from "fs";

type RGB = {
    rOffset: number,
    gOffset: number,
    bOffset: number
}

const width = 256
const height = 256

const canvas = createCanvas(width, height)

const ctx = canvas.getContext('2d');

export default function generateArt() {
    ctx.fillStyle = "#FCAF17";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // fill bg with black/gray lines
    for (let i = 0; i < 1000; i++) {
        const grayColor = randomIntFromInterval(30, 100);
        ctx.fillStyle = `rgb(${grayColor}, ${grayColor}, ${grayColor})`;

        const x = randomIntFromInterval(-50, canvas.width);
        const y = randomIntFromInterval(-50, canvas.height);

        const width = randomIntFromInterval(10, 140);
        const height = randomIntFromInterval(10, 20);
        ctx.fillRect(x, y, width, height);
    }

    // fill with orange lines
    for (let i = 0; i < 30; i++) {
        const green = randomIntFromInterval(160, 190);
        const blue = randomIntFromInterval(20, 50);
        ctx.fillStyle = `rgb(252, ${green}, ${blue})`;

        const x = randomIntFromInterval(0, canvas.width);
        const y = randomIntFromInterval(0, canvas.height);

        const width = randomIntFromInterval(20, 60);
        const height = randomIntFromInterval(5, 10);
        ctx.fillRect(x, y, width, height);
    }

    // logo on top
    loadImage('./src/art/techchill_white.png').then((img) => {
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const updatedImageData = rgbSplit(imageData, {
            rOffset: 4,
            gOffset: 0,
            bOffset: 0
        });
        ctx.putImageData(updatedImageData, 0, 0);

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./src/art/techchill_NFT_Art.png', buffer)
    });
}

// min and max included
function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function rgbSplit(imageData: ImageData, options: RGB): ImageData {
    // destructure the offset values from options, default to 0
    const { rOffset = 0, gOffset = 0, bOffset = 0 } = options;
    // clone the pixel array from original imageData
    const originalArray = imageData.data;
    const newArray = new Uint8ClampedArray(originalArray);
    // loop through every pixel and assign values to the offseted position
    for (let i = 0; i < originalArray.length; i += 4) {
        newArray[i + 0 + rOffset * 4] = originalArray[i + 0];
        newArray[i + 1 + gOffset * 4] = originalArray[i + 1];
        newArray[i + 2 + bOffset * 4] = originalArray[i + 2];
    }

    // return a new ImageData object
    return createImageData(newArray, imageData.width, imageData.height);
}

generateArt();
