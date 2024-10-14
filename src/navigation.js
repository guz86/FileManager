import { resolve, parse, dirname } from 'path';

export function changeDirectory(newDir) {
    const currentDir = process.cwd();
    const rootDir = parse(currentDir).root;
    const targetDir = resolve(currentDir, newDir);

    if (!targetDir.startsWith(rootDir)) {
        console.log("You can't go upper than root directory");
        return;
    }

    if (dirname(targetDir) === rootDir) {
        console.log("You are already in the root directory.");
        return;
    }

    process.chdir(targetDir);
    console.log(`You are now in ${process.cwd()}`);
}
