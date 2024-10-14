import fs from 'fs';
import path from 'node:path';

export function cat(filePath) {
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error: File does not exist:', err.message);
            return;
        }

        const readStream = fs.createReadStream(absolutePath, 'utf-8');

        readStream.on('error', (err) => {
            console.error('Operation cat failed', err.message);
        });

        readStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        readStream.on('end', () => {
            console.log('\n');
        });
    });
}
