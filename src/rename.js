import fs from 'fs';
import path from 'path';

export const renameFile = (oldPath, newFileName) => {
    const currentDir = process.cwd();
    const oldFilePath = path.join(currentDir, oldPath);
    const newFilePath = path.join(currentDir, newFileName);

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.error(`Operation rename failed: ${err.message}`);
        } else {
            console.log(`File renamed from ${oldPath} to ${newFileName}`);
        }
    });
};