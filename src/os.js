import { execSync } from 'child_process';
import os from 'os';

export const printEOL = () => {
    console.log(`End-of-Line: ${JSON.stringify(os.EOL)}`);
};

export const printCPUsInfo = () => {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}:`);
        console.log(`  Model: ${cpu.model}`);
        console.log(`  Speed: ${(cpu.speed / 1000).toFixed(2)} GHz`);
    });
};

export const printHomeDir = () => {
    console.log(`Home Directory: ${os.homedir()}`);
};

export const printCurrentUser = () => {
    const username = execSync('whoami').toString().trim();
    console.log(`Current User: ${username}`);
};

export const printArchitecture = () => {
    console.log(`Architecture: ${os.arch()}`);
};
