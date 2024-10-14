import fs from 'fs';
import path from 'node:path';

export const moveFile = (src, destDir) => {
    const sourcePath = path.resolve(src);
    const destinationDir = path.resolve(destDir);

    fs.stat(sourcePath, (err, stats) => {
        if (err) {
            console.error(`Operation move failed: ${err.message}`);
            return;
        }

        if (stats.isDirectory()) {
            console.error(`Operation move failed: Source is a directory`);
            return;
        }

        const fileName = path.basename(sourcePath);
        const destinationPath = path.join(destinationDir, fileName);

        fs.mkdir(destinationDir, { recursive: true }, (err) => {
            if (err) {
                console.error(`Operation move failed: ${err.message}`);
                return;
            }

            const readableStream = fs.createReadStream(sourcePath);
            const writableStream = fs.createWriteStream(destinationPath);

            readableStream.on('error', (err) => {
                console.error(`Operation move failed: ${err.message}`);
            });

            writableStream.on('error', (err) => {
                console.error(`Operation move failed: ${err.message}`);
            });

            writableStream.on('finish', () => {
                fs.unlink(sourcePath, (err) => {
                    if (err) {
                        console.error(`Operation move failed: ${err.message}`);
                    } else {
                        console.log(`File moved from ${sourcePath} to ${destinationPath}`);
                    }
                });
            });

            readableStream.pipe(writableStream);
        });
    });
};
