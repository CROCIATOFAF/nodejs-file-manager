import readline from 'readline';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { stdin as input, stdout as output } from 'process';

// Navigation and File Operations
import { navigateUp } from './navigation/up.js';
import { changeDirectory } from './navigation/cd.js';
import { listDirectory } from './navigation/list.js';
import { read } from './file-operations/read.js';
import { create } from './file-operations/create.js';
import { rename } from './file-operations/rename.js';
import { copy } from './file-operations/copy.js';
import { move } from './file-operations/move.js';
import { deleteFile } from './file-operations/delete.js';
import { hashFile } from './hash/hash.js';

import { printArchitecture } from './os-info/architecture.js';
import { printCPUs } from './os-info/cpus.js';
import { printEOL } from './os-info/eol.js';
import { printHomeDir } from './os-info/homedir.js';
import { printUsername } from './os-info/username.js';

import { compress } from './compression/compress.js'
import { decompress } from './compression/decompress.js'

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

export default App;
