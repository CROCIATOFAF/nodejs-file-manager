import fs from 'fs';

export function read(filePath) {
    const readStream = fs.createReadStream(filePath, 'utf-8');
    readStream.on('data', chunk => {
        console.log(chunk);
    });
}
