import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fs from 'fs';

const pipe = promisify(pipeline);

export async function compress(sourcePath, destinationPath) {
    try {
        await pipe(
            fs.createReadStream(sourcePath),
            createBrotliCompress(),
            fs.createWriteStream(destinationPath)
        );

        console.log(`File compressed successfully and saved to ${destinationPath}`);
    } catch (error) {
        console.error(`Compression failed: ${error.message}`);
    }
}
