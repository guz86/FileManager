import fs from 'fs';
import path from 'path';

export function create(fileName) {
    const currentDir = process.cwd();
    const filePath = path.join(currentDir, fileName);

    fs.writeFile(filePath, '', (err) => {
        if (err) {
            console.error(`Operation create failed: ${err}`);
        } else {
            console.log(`File created: ${filePath}`);
        }
    });
};