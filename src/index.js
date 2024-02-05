import readline from 'readline';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { stdin as input, stdout as output } from 'process';

// Navigation and File Operations
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

import { compress } from './app/compression/compress.js'
import { decompress } from './app/compression/decompress.js'

const getUsernameFromArgs = (args) => args.find(arg => arg.startsWith('--username='))?.split('=')[1] ?? null;

class App {
    constructor(username) {
        this.username = username;
        this.cwd = os.homedir();
        this.rl = readline.createInterface({ input, output });
    }

    start() {
        console.log(`Welcome to the File Manager, ${this.username}! Current directory: ${this.cwd}`);
        this.rl.on('line', (line) => this.handleCommand(line.trim().split(/\s+/))).on('close', () => this.shutdown());
    }

    async handleCommand([cmd, ...args]) {
        try {
            switch (cmd) {
                case 'os':
                    this.handleOSCommands(args[0]);
                    break;
                case 'up':
                    this.cwd = navigateUp(this.cwd);
                    break;
                case 'cd':
                    this.cwd = await changeDirectory(this.cwd, args[0]);
                    break;
                case 'ls':
                    await listDirectory(this.cwd);
                    break;
                case 'cat':
                    await read(path.join(this.cwd, args[0]));
                    break;
                case 'add':
                    await create(path.join(this.cwd, args[0]));
                    break;
                case 'rm':
                    await deleteFile(path.join(this.cwd, args[0]));
                    break;
                case 'rn':
                    await rename(path.join(this.cwd, args[0]), path.join(this.cwd, args[1]));
                    break;
                case 'cp':
                    await copy(path.join(this.cwd, args[0]), path.join(this.cwd, args[1]));
                    break;
                case 'mv':
                    await move(path.join(this.cwd, args[0]), path.join(this.cwd, args[1]));
                    break;
                case 'hash':
                    await hashFile(path.join(this.cwd, args[0]));
                    break;
                case 'compress':
                    await compress(path.join(this.cwd, args[0]), path.join(this.cwd, args[1]));
                    break;
                case 'decompress':
                    await decompress(path.join(this.cwd, args[0]), path.join(this.cwd, args[1]));
                    break;
                case '.exit':
                    this.rl.close();
                    break;
                default:
                    console.log('Invalid command');
                    break;
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        } finally {
            console.log(`Current directory: ${this.cwd}`);
        }
    }

    handleOSCommands(option) {
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
                console.log('Invalid OS command');
                break;
        }
    }

    shutdown() {
        console.log(`Thank you for using File Manager, ${this.username}. Goodbye!`);
        process.exit();
    }
}

const username = getUsernameFromArgs(process.argv.slice(2));
if (!username) {
    console.error('Please provide a username with the --username= flag.');
    process.exit(1);
}

const app = new App(username);
app.start();
