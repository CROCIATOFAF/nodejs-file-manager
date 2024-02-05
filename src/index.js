import readline from 'readline';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { stdin as input, stdout as output } from 'process';

import { navigateUp } from './app/navigation/up.js';
import { changeDirectory } from './app/navigation/cd.js';
import { listDirectory } from './app/navigation/list.js';

import { read } from './app/file-operations/read.js';
import { create } from './app/file-operations/create.js';
import { rename } from './app/file-operations/rename.js';
import { copy } from './app/file-operations/copy.js';
import { move } from './app/file-operations/move.js';
import { deleteFile } from './app/file-operations/delete.js';
import { hashFile } from './app/hash/hash.js';


import { printArchitecture } from './app/os-info/architecture.js';
import { printCPUs } from './app/os-info/cpus.js';
import { printEOL } from './app/os-info/eol.js';
import { printHomeDir } from './app/os-info/homedir.js';
import { printUsername } from './app/os-info/username.js';

import { compress } from './app/compression/compress.js';
import { decompress } from './app/compression/decompress.js';



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
        // const [cmd, ...args] = command.split(' ');
        const args = command.split(' ');
        const cmd = args[0];
        const option = args[1];

        if (cmd === 'os') {
            switch (option) {
                case '--EOL':
                    printEOL();
                    break;
                case '--cpus':
                    printCPUs();
                    break;
                case '--homedir':
                    printHomeDir();
                    break;
                case '--username':
                    printUsername();
                    break;
                case '--architecture':
                    printArchitecture();
                    break;
                default:
                    console.log('Invalid option for os command');
            }
            return;
        }

        switch (cmd) {
            case 'up':
                this.cwd = navigateUp(this.cwd);
                break;
            case 'cd':
                if (args.length >= 2) {
                    const newPath = path.resolve(this.cwd, args[1]);
                    fs.promises.stat(newPath)
                        .then(stats => {
                            if (stats.isDirectory()) {
                                this.cwd = newPath;
                                console.log(`You are currently in ${this.cwd}`);
                            } else {
                                console.log(`${args[1]} is not a directory.`);
                            }
                        })
                        .catch(() => console.log(`The directory ${args[1]} does not exist.`));
                } else {
                    console.log('Usage: cd <directoryPath>');
                }
                break;
            case 'ls':
                listDirectory(this.cwd);
                break;
            case 'cat':
                if (args.length) {
                    const filePath = path.join(this.cwd, args[1]);
                    console.log(`Reading file at path: ${filePath}`);
                    read(filePath);
                } else {
                    console.log('Usage: cat <filename>');
                }
                break;
            case 'add':
                if (args.length) {
                    const filePath = path.join(this.cwd, args[1]);
                    create(filePath);
                } else {
                    console.log('Usage: add <newFileName>');
                }
                break;
            case 'rm':
                if (args.length) {
                    const filePath = path.join(this.cwd, args[1]);
                    deleteFile(filePath);
                } else {
                    console.log('Usage: rm <filename>');
                }
                break;
            case 'rn':
                if (args.length >= 3) {
                    const oldPath = path.join(this.cwd, args[1]);
                    const newPath = path.join(this.cwd, args[2]);
                    rename(oldPath, newPath);
                } else {
                    console.log('Usage: rn <oldPath> <newPath>');
                }
                break;
            case 'cp':
                if (args.length >= 3) {
                    const sourcePath = path.join(this.cwd, args[1]);
                    const destinationPath = path.join(this.cwd, args[2]);
                    copy(sourcePath, destinationPath).catch(console.error);
                } else {
                    console.log('Usage: cp <sourcePath> <destinationPath>');
                }
                break;
            case 'mv':
                if (args.length === 2) move(path.join(this.cwd, args[0]), path.join(this.cwd, args[1]));
                else console.log('Usage: mv <sourcePath> <destinationPath>');
                break;
            case 'hash':
                if (args.length >= 2) {
                    const filePath = path.resolve(this.cwd, args[1]);
                    hashFile(filePath);
                } else {
                    console.log('Usage: hash <path_to_file>');
                }
                break;
            case 'compress':
                if (args.length === 3) {
                    compress(args[1], args[2])
                        .then(() => console.log('Compression completed.'))
                        .catch(error => console.error(`Compression error: ${error.message}`));
                } else {
                    console.log('Usage: compress <path_to_file> <path_to_destination>');
                }
                break;
            case 'decompress':
                if (args.length === 3) {
                    const sourceFilePath = args[1];
                    const destinationFilePath = args[2];
                    const resolvedSourceFilePath = path.isAbsolute(sourceFilePath) ? sourceFilePath : path.join(this.cwd, sourceFilePath);
                    const resolvedDestinationFilePath = path.isAbsolute(destinationFilePath) ? destinationFilePath : path.join(this.cwd, destinationFilePath);
                    decompress(resolvedSourceFilePath, resolvedDestinationFilePath)
                        .then(() => console.log('Decompression completed.'))
                        .catch(error => console.error(`Decompression error: ${error.message}`));
                } else {
                    console.log('Usage: decompress <path_to_compressed_file> <path_to_destination>');
                }
                break;

            case '.exit':
                this.rl.close();
                break;
            default:
                console.log('Invalid input');
        }
        process.nextTick(() => this.printCwd());
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
