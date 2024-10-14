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

}

start();