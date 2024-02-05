import fs from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipe = promisify(pipeline);

export async function decompress(filePath, destinationPath) {
    try {
        await pipe(
            fs.createReadStream(filePath),
            createBrotliDecompress(),
            fs.createWriteStream(destinationPath)
        );
        console.log(`Decompression completed: ${destinationPath}`);
    } catch (error) {
        console.error(`Decompression failed: ${error.message}`);
    }
}
