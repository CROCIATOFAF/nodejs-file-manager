import fs from 'fs';

export function copy(sourcePath, destinationPath) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(sourcePath);
        const writeStream = fs.createWriteStream(destinationPath);

        readStream.pipe(writeStream)
            .on('error', reject)
            .on('close', resolve);

        readStream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
            reject(err);
        });
        writeStream.on('error', (err) => {
            console.error(`Error writing file: ${err.message}`);
            reject(err);
        });
    })
    .then(() => console.log(`File copied from ${sourcePath} to ${destinationPath}`))
    .catch(err => console.error(`Error copying file: ${err.message}`));
}

// exp: cp file_name.txt /folder_name/file_name.txt
