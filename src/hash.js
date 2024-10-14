import fs from 'fs';
import { createHash } from 'crypto';

export const hashFile = (filePath) => {
    const hash = createHash('md5');

    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => {
        hash.update(data);
    });

    stream.on('end', () => {
        console.log(`Hash of file ${filePath}: ${hash.digest('hex')}`);
    });

    stream.on('error', (err) => {
        console.error(`Operation hash failed: ${err.message}`);
    });
};
