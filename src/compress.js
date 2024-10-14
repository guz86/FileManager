import fs from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compressFile = (source, destination) => {
    const sourceStream = fs.createReadStream(source);
    const destinationStream = fs.createWriteStream(destination);
    const brotliCompress = createBrotliCompress();

    sourceStream
        .pipe(brotliCompress)
        .pipe(destinationStream)
        .on('finish', () => {
            console.log(`File compressed: ${destination}`);
        })
        .on('error', (err) => {
            console.error(`Operation compress failed: ${err.message}`);
        });
};

export const decompressFile = (source, destination) => {
    const sourceStream = fs.createReadStream(source);
    const destinationStream = fs.createWriteStream(destination);
    const brotliDecompress = createBrotliDecompress();

    sourceStream
        .pipe(brotliDecompress)
        .pipe(destinationStream)
        .on('finish', () => {
            console.log(`File decompressed: ${destination}`);
        })
        .on('error', (err) => {
            console.error(`Operation decompress failed: ${err.message}`);
        });
};
