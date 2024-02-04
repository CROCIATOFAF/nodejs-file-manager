import readline from 'readline';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { stdin as input, stdout as output } from 'process';

import { navigateUp } from './app/navigation/up.js';
import { changeDirectory } from './app/navigation/cd.js';
import { listDirectory } from './app/navigation/list.js';


// extracts the username from the command line arguments
const getUsernameFromArgs = (args) => {
    const usernameArg = args.find(arg => arg.startsWith('--username='));
    return usernameArg ? usernameArg.split('=')[1] : null;
};

class App {
    constructor(username) {
        this.username = username;
        this.cwd = os.homedir();
        this.rl = readline.createInterface({ input, output });
    }

    start() {
        console.log(`Welcome to the File Manager, ${this.username}!`);
        this.printCwd();
        this.rl.on('line', (line) => this.handleCommand(line.trim())).on('close', () => this.shutdown());
    }

    // handles commands from the REPL
    handleCommand(command) {
        const [cmd, ...args] = command.split(' ');
        switch (cmd) {
            case 'up':
                this.cwd = navigateUp(this.cwd);
                break;
            case 'cd':
                const newPath = changeDirectory(this.cwd, args.join(' '));
                if (newPath) {
                    this.cwd = newPath;
                }
                break;
            case 'ls':
                listDirectory(this.cwd);
                break;
            case '.exit':
                this.rl.close();
                break;
            default:
                console.log('Invalid input');
        }
        this.printCwd();
    }

    navigateUp() {
        // TODO: Implement functionality
    }

    changeDirectory(directory) {
        // TODO: Implement functionality
    }

    listDirectory() {
        // TODO: Implement functionality
    }

    printCwd() {
        console.log(`You are currently in ${this.cwd}`);
    }

    // Method to shut down the application
    shutdown() {
        console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
        process.exit();
    }
}

// Extracts the username from the command-line arguments
const username = getUsernameFromArgs(process.argv.slice(2));

if (!username) {
    console.error('Please provide a username with the --username= flag.');
    process.exit(1);
}

// Creates and starts the application
const app = new App(username);
app.start();

// Handles shutdown on Ctrl+C
process.on('SIGINT', () => {
    app.rl.close();
});
