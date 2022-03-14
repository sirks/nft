const path = require('path');
const GIFEncoder = require('gifencoder');
const { createCanvas, createImageData, loadImage } = require('canvas');
const fs = require('fs');

const width = 256
const height = 256

const canvas = createCanvas(width, height)

const ctx = canvas.getContext('2d');

async function artsToGif(num, delay) {
    const img = await loadImage(path.join(__dirname, 'techchill_white.png'));
    const encoder = new GIFEncoder(256, 256);
    // stream the results as they are available into techchill_nft_gif.gif
    encoder.createReadStream().pipe(fs.createWriteStream(path.join(__dirname, 'techchill_nft_gif.gif')));

    encoder.start();
    encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    encoder.setDelay(delay);  // frame delay in ms
    encoder.setQuality(10); // image quality. 10 is default.
    for (let i = 0; i < num; i++) {
        encoder.addFrame(generateArt(img));
    }
    encoder.finish();
}

function generateArt(img) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const updatedImageData = rgbSplit(imageData, {
        rOffset: 4,
        gOffset: 0,
        bOffset: 0
    });
    ctx.putImageData(updatedImageData, 0, 0);

    return ctx;
}


// min and max included
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function rgbSplit(imageData, options) {
    // destructure the offset values from options, default to 0
    const {rOffset = 0, gOffset = 0, bOffset = 0} = options;
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

artsToGif(100, 100);
