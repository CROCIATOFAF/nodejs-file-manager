import fs from "fs";
import path from "path";

export const changeDirectory = (currentPath, targetPath) => {
    const newPath = path.resolve(currentPath, targetPath);
    try {
        if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
            return newPath;
        }
        console.log("The specified path does not exist or is not a directory.");
    } catch (error) {
        throw new Error("The specified path does not exist or is not a directory.");
    }
    return currentPath;
};
