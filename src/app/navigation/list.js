import fs from 'fs/promises';
import path from 'path';

async function listDirectory(directory) {
    try {
        const dirents = await fs.readdir(directory, { withFileTypes: true });
        const folders = [];
        const files = [];

        for (const dirent of dirents) {
            if (dirent.isDirectory()) {
                folders.push(dirent.name);
            } else {
                files.push(dirent.name);
            }
        }

        folders.sort();
        files.sort();

        const combined = [...folders, ...files].map((name, index) => ({
            Name: name,
            Type: folders.includes(name) ? 'Directory' : 'File',
        }));

        console.table(combined, ['Name', 'Type']);
    } catch (error) {
        console.error(`Error listing directory contents for ${directory}:`, error);
    }
}

export { listDirectory };
