import { NS } from "@ns";
import { spawn } from "child_process";

export async function main(ns: NS): Promise<void> {
    // trying to execute terminal commands
    const ls = spawn("ls", ["-lh", "/"]);
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      
      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    // while we don't have the TOR node
    /*
    while (!(ns.hasTorRouter())) {
        // check if we have the money to buy it
        
    }
    */

    // run script to buy from TOR node (while loop)

}