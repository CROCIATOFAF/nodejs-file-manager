import fs from 'fs';

export function create(filePath) {
    fs.writeFile(filePath, '', 'utf-8', (err) => {
        if (err) {
            throw new Error(`Error creating file: ${error.message}`);
        } else {
            console.log(`File created: ${filePath}`);
        }
    });
}
