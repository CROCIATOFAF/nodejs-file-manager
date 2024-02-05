import fs from 'fs';

export function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file:`, err);
        } else {
            console.log(`${filePath} has been deleted.`);
        }
    });
}
