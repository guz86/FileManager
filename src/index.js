import readline from 'readline';
import { homedir } from 'os';
import { resolve, parse, dirname } from 'path';

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

    function exit() {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    }

    function changeDirectory(newDir) {
        const currentDir = process.cwd();
        const rootDir = parse(currentDir).root;

        const targetDir = resolve(currentDir, newDir);

        if (targetDir === rootDir) {
            console.log("You are already in the root directory.");
            console.log(`You are currently in ${process.cwd()}`);
            return;
        }

        if (!targetDir.startsWith(rootDir)) {
            console.log("You can't go upper than root directory");
            console.log(`You are currently in ${process.cwd()}`);
            return;
        }

        if (dirname(targetDir) === rootDir) {
            console.log("You can't go upper than root directory");
            console.log(`You are currently in ${process.cwd()}`);
            return;
        }

        process.chdir(targetDir);
        console.log(`You are now in ${process.cwd()}`);
    }

    function handleCommand(input) {
        const trimmedInput = input.trim().split(' ');

        if (trimmedInput[0] === '.exit') {
            exit();
        } else if (trimmedInput[0] === 'cd') {
            const newDir = trimmedInput[1] || '';
            changeDirectory(newDir);
        } else if (trimmedInput[0] === '') {
            return;
        } else {
            console.log('Invalid input');
            console.log(`You are currently in ${process.cwd()}`);
        }
    }

    const readlineInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Enter a command: '
    });

    readlineInstance.on('line', (input) => {
        handleCommand(input);
        readlineInstance.prompt();
    });

    process.on('SIGINT', () => {
        exit();
    });

    console.log(`Welcome to the File Manager, ${username}!`);
    process.chdir(homedir());
    console.log(`You are currently in ${process.cwd()}`);
    readlineInstance.prompt();
};

start();
