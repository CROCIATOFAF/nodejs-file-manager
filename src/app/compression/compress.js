import fs from 'fs';
import path from 'path';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipe = promisify(pipeline);

export async function compress(sourcePath, destinationDir, cwd = process.cwd()) {
    try {
        const fullSourcePath = path.resolve(cwd, sourcePath);
        const sourceFileName = path.basename(fullSourcePath);
        const compressedFileName = sourceFileName + '.br';
        
        let finalDestinationPath;
        if (await isDirectory(destinationDir)) {
            finalDestinationPath = path.join(destinationDir, compressedFileName);
        } else {
            finalDestinationPath = destinationDir;
        }

        await pipe(
            fs.createReadStream(fullSourcePath),
            createBrotliCompress(),
            fs.createWriteStream(finalDestinationPath)
        );

        console.log(`File compressed successfully and saved to ${finalDestinationPath}`);
    } catch (error) {
        console.error(`Compression failed: ${error.message}`);
    }
}

async function isDirectory(path) {
    try {
        const stat = await fs.promises.stat(path);
        return stat.isDirectory();
    } catch {
        return false;
    }
}
