import fs from 'fs';
import path from 'node:path';

export const remove = (filePath) => {
    const resolvedPath = path.resolve(filePath);

    fs.stat(resolvedPath, (err) => {
        if (err) {
            console.error(`Operation remove failed: ${err.message}`);
            return;
        }

        fs.unlink(resolvedPath, (err) => {
            if (err) {
                console.error(`Operation remove failed: ${err.message}`);
            } else {
                console.log(`File removed: ${resolvedPath}`);
            }
        });
    });
};
