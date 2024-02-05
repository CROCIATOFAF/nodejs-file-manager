import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { copy } from './copy.js';

const unlinkAsync = promisify(fs.unlink);

export async function move(source, destination, cwd = process.cwd()) {
    try {
        const absoluteSource = path.isAbsolute(source) ? source : path.resolve(cwd, source);
        console.log(`Resolved source: ${absoluteSource}`);

        let finalDestination = path.isAbsolute(destination) ? destination : path.resolve(cwd, destination);
        try {
            const stats = await fs.promises.stat(finalDestination);
            if (stats.isDirectory()) {
                finalDestination = path.join(finalDestination, path.basename(source));
            }
        } catch {
        }
        console.log(`Resolved destination: ${finalDestination}`);

        await copy(absoluteSource, finalDestination);
        await unlinkAsync(absoluteSource);
        console.log(`Successfully moved ${source} to ${finalDestination}`);
    } catch (error) {
        console.error(`Error moving file: ${error}`);
    }
}
