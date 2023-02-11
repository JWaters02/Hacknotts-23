import { exec } from "child_process";

export class CodeRunner {
    constructor() {
        // Load in all the exampes
    }

    public runExample(exampleID: number, code: string): boolean {
        const process = exec(`python3 -c "${code}"`)
        // console.log(code);
        process.stdout.on('data', msg => {
            console.log(msg);
        });
        return false;
    }
}