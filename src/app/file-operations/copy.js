import fs from 'fs';

export async function copy(sourcePath, destinationPath) {
    try {
        await fs.promises.copyFile(sourcePath, destinationPath);
        console.log(`File copied from ${sourcePath} to ${destinationPath}`);
    } catch (err) {
        console.error(`Error copying file: ${err.message}`);
    }
}
