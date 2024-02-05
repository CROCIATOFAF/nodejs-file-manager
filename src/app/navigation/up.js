import path from 'path';

export const navigateUp = (currentPath) => {
    if (currentPath === path.parse(currentPath).root) {
        console.log('You are already at the root directory.');
        return currentPath;
    }
    const newPath = path.resolve(currentPath, '..');
    return newPath;
};
