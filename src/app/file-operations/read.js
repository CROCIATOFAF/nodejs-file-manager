import fs from 'fs';

export function read(filePath) {
    console.log(`Attempting to read file: ${filePath}`);
    const readStream = fs.createReadStream(filePath, 'utf-8');
    
    readStream.on('data', chunk => {
        console.log(chunk);
    }).on('error', error => {
        console.error(`Error reading file: ${error.message}`);
    }).on('end', () => {
        console.log('Finished reading file.');
    });
}
