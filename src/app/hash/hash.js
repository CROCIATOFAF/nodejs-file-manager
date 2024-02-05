import fs from 'fs';
import crypto from 'crypto';

export function hashFile(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const hash = crypto.createHash('sha256');

    fileStream.on('data', function (data) {
        hash.update(data, 'utf8');
    });

    fileStream.on('end', function () {
        const fileHash = hash.digest('hex');
        console.log(`Hash of ${filePath}: ${fileHash}`);
    });

    fileStream.on('error', function (error) {
        console.error(`Error reading the file: ${error.message}`);
    });
}
