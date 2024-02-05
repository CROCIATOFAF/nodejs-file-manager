import fs from 'fs';

export function create(filePath) {
    fs.writeFile(filePath, '', 'utf-8', (err) => {
        if (err) {
            console.error(`Error creating file: ${err.message}`);
        } else {
            console.log(`File created: ${filePath}`);
        }
    });
}
