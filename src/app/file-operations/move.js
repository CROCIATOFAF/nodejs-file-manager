import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { copy } from './copy.js';

const unlinkAsync = promisify(fs.unlink);

export async function move(source, destination) {
    try {
        const absoluteSource = path.resolve(source);

        let finalDestination = path.resolve(destination);
        const stats = await fs.promises.stat(finalDestination).catch(() => null);

        if (stats && stats.isDirectory()) {
            finalDestination = path.join(finalDestination, path.basename(absoluteSource));
        }

        // console.log(`Resolved source: ${absoluteSource}`);
        // console.log(`Resolved destination: ${finalDestination}`);

        await copy(absoluteSource, finalDestination);
        await unlinkAsync(absoluteSource);
        console.log(`Successfully moved ${absoluteSource} to ${finalDestination}`);
    } catch (error) {
        console.error(`Error moving file: ${error.message}`);
    }
}
