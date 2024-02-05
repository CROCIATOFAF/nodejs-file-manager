import fs from 'fs';

export function rename(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error(`Error renaming file:`, err);
        } else {
            console.log(`${oldPath} has been renamed to ${newPath}.`);
        }
    });
}
