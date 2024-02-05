import os from 'os';

export function printEOL() {
    try {
        console.log(JSON.stringify(os.EOL));
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}
