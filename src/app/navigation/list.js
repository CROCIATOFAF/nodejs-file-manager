// navigation/list.js
import fs from 'fs';

export const listDirectory = (currentPath) => {
    try {
        const filesAndFolders = fs.readdirSync(currentPath, { withFileTypes: true });
        const sortedDirectories = filesAndFolders
            .filter(dirent => dirent.isDirectory())
            .sort((a, b) => a.name.localeCompare(b.name));

        const sortedFiles = filesAndFolders
            .filter(dirent => dirent.isFile())
            .sort((a, b) => a.name.localeCompare(b.name));

        const sorted = [...sortedDirectories, ...sortedFiles];

        sorted.forEach(dirent => {
            const type = dirent.isDirectory() ? 'DIR' : 'FILE';
            console.log(`${type} ${dirent.name}`);
        });
    } catch (error) {
        console.error('Operation failed', error);
    }
};
