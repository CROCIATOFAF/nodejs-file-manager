import App from './app/app.js';

const getUsernameFromArgs = (args) => args.find(arg => arg.startsWith('--username='))?.split('=')[1] ?? null;
const username = getUsernameFromArgs(process.argv.slice(2));

if (!username) {
    console.error('Please provide a username with the --username= flag.');
    process.exit(1);
}

const app = new App(username);
app.start();