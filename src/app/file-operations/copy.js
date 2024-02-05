import fs from 'fs';

export function copy(source, destination) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);
    readStream.pipe(writeStream).on('finish', () => {
        console.log(`${source} has been copied to ${destination}`);
    });
}
