import os from 'os';

export function printUsername() {
    console.log(os.userInfo().username);
}
