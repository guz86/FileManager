import fs from 'fs';

export function list() {
    const currentDir = process.cwd();

    fs.readdir(currentDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Operation ls failed:', err);
            return;
        }

        const folders = [];
        const fileList = [];

        files.forEach(file => {
            const fileType = file.isDirectory() ? 'directory' : 'file';
            const name = file.name;

            if (fileType === 'directory') {
                folders.push({ Name: name, Type: fileType });
            } else {
                fileList.push({ Name: name, Type: fileType });
            }
        });

        const sortedFolders = folders.sort((a, b) => a.Name.localeCompare(b.Name));
        const sortedFiles = fileList.sort((a, b) => a.Name.localeCompare(b.Name));

        const result = [...sortedFolders, ...sortedFiles];

        console.table(result);
    });
}