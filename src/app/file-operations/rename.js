import fs from 'fs';

export function rename(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            throw new Error(`Error renaming file: ${error.message}`);
        } else {
            console.log(`${oldPath} has been renamed to ${newPath}.`);
        }
    });
}
