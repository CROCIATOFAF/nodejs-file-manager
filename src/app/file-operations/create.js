import fs from 'fs';

export function create(fileName) {
    fs.writeFile(fileName, '', (err) => {
        if (err) {
            console.error(`Error creating ${fileName}:`, err);
        } else {
            console.log(`${fileName} has been created.`);
        }
    });
}
