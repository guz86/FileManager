import readline from 'readline';
import { homedir } from 'os';
import { changeDirectory } from './navigation.js';
import { list } from './ls.js';
import { cat } from './cat.js';
import { create } from './create.js';
import { renameFile } from './rename.js';
import { copyFile } from './copy.js';
import { remove } from './remove.js';

const start = () => {
    function getUsername() {
        const args = process.argv.slice(2);
        const usernameArg = args.find(arg => arg.startsWith('--username='));

        if (usernameArg) {
            return usernameArg.split('=')[1];
        }

        return 'Nobody';
    }

    const username = getUsername();

    const readlineInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Enter a command: '
    });

    readlineInstance.on('line', (input) => {
        const command = input.trim();

        if (command === '.exit') {
            process.exit(0);
        } else if (command.startsWith('cd ')) {
            const path = command.slice(3).trim();
            changeDirectory(path);
        } else if (command === 'up') {
            changeDirectory('..');
        } else if (command === 'ls') {
            list();
        } else if (command.startsWith('cat ')) {
            const filePath = command.slice(4).trim();
            cat(filePath);
        } else if (command.startsWith('add ')) {
            const fileName = command.slice(4).trim();
            create(fileName);
        } else if (command.startsWith('rn ')) {
            const [oldPath, newFileName] = command.slice(3).trim().split(' ');
            renameFile(oldPath, newFileName);
        } else if (command.startsWith('cp ')) {
            const [src, dest] = command.slice(3).trim().split(' ');
            copyFile(src, dest);
        }
        else if (command.startsWith('mv ')) {
            const [src, dest] = command.slice(3).trim().split(' ');
            moveFile(src, dest);
        }
        else if (command.startsWith('rm ')) {
            const filePath = command.slice(3).trim();
            remove(filePath);
        }
        else {
            console.log("Invalid input");
        }

        console.log(`You are currently in ${process.cwd()}`);
        readlineInstance.prompt();
    });

    process.on('SIGINT', () => {
        process.exit(0);
    });

    process.on('exit', () => console.log(`\nThank you for using File Manager, ${username}, goodbye!`));

    console.log(`Welcome to the File Manager, ${username}!`);
    process.chdir(homedir());
    console.log(`You are currently in ${process.cwd()}`);
    readlineInstance.prompt();
}

start();
