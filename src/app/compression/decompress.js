import fs from 'fs';
import path from 'path';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipe = promisify(pipeline);

export async function decompress(filePath, destinationDir) {
    try {
        const fileName = path.basename(filePath, '.br');
        const destinationPath = path.join(destinationDir, fileName);

        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }
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
