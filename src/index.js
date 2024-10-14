import readline from 'readline';
import { homedir } from 'os';

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

    const readlineInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Enter a command: '
    });

    readlineInstance.on('line', (input) => {
        if (input.trim() === '.exit') {
            exit();
        }

        console.log(`You are currently in ${process.cwd()}`);

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
