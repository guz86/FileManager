import readline from 'readline';

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
    console.log(`Welcome to the File Manager, ${username}!`);

    function exit() {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    }

    const readlineInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readlineInstance.on('line', (input) => {
        if (input.trim() === '.exit') {
            exit();
        }
    });

    process.on('SIGINT', () => {
        exit();
    });

}

start();