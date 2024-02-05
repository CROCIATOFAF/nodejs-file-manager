import os from 'os';

export function printCPUs() {
    const cpus = os.cpus();
    console.log(`Overall CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: Model - ${cpu.model}, Clock Rate - ${Math.round(cpu.speed / 1000)} GHz`);
    });
}
