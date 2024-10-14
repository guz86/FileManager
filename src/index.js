import readline from 'readline';
import { homedir } from 'os';
import { changeDirectory } from './navigation.js';
import { list } from './ls.js';
import { cat } from './cat.js';

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
            readlineInstance.prompt();
        } else if (command.startsWith('cat ')) {
            const filePath = command.slice(4).trim();
            cat(filePath);
            readlineInstance.prompt();
        } else {
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
