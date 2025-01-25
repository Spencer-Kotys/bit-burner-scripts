import { NS } from "@ns";

function getTarget(ns: NS, internet: string[]): string {
    // create base variables
    let targetName: string = "";
    let highestScore: number = 0;
    // loop through internet array
    for (let i = 0; i < internet.length; ++i) {
        const server = internet[i];
        // check if server is not home server
        if (server != "home") {
            // check if server is hackable
            if (ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
                // get percentage of money that is hacked with one thread
                let percentage: number = ns.hackAnalyze(server);
                // get max amount of money on server
                let maxMoney: number = ns.getServerMaxMoney(server);
                // get time to hack server
                let hackTime: number = ns.getHackTime(server);
                // calculate score
                let score: number = (percentage * maxMoney) / hackTime;
                // check if score is highest yet
                if (score > highestScore) {
                    // set highest score and target name to new server
                    highestScore = score;
                    targetName = server;
                }
            }
        }
    }
    return targetName;
}

function checkInternet(ns: NS, internet: string[]): string[] {
    // peek port 1
    let port1: string[] = ns.peek(1);
    // if internet is not the same as port 1 and is not null
    if (internet != port1 && (!(port1.includes("NULL PORT DATA")))) {
        // set internet to port 1
        internet = port1;
    }
    return internet;
}

// calculate number of threads to run on server
function getNumOfThreads(ns: NS, server: string, scriptRam: number) {
    // get amount of RAM on server
    const serverRam: number = ns.getServerMaxRam(server);
    // get current RAM used
    const usedRam: number = ns.getServerUsedRam(server);
    // calculate number of threads to run based on Ram, round down to nearest whole number
    const threads: number = Math.floor((serverRam - usedRam) / scriptRam);
    // return number of threads
    return threads;
  }

export async function main(ns: NS): Promise<void> {
    // declare internet as array of strings
    let internet: string[] = ns.args as string[];
    // get script Ram requirements
    const weakenRam: number = ns.getScriptRam("w.js", "home");
    const growRam: number = ns.getScriptRam("g.js", "home");
    const hackRam: number = ns.getScriptRam("h.js", "home");
    // run while loop
    while (true) {
        // get best target based on highest percentage of money hacked per thread
        let target: string = getTarget(ns, internet);
        // check if security level is above min security level
        if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
            // if security is greater than current level
      if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        // weaken it
        for (let i = 0; i< internet.length; ++i) {
          let server: string = internet[i];
          // get number of threads to run
          let numOfThreads: number = getNumOfThreads(ns, server, weakenRam);
          // execute payload on server with number of threads
          if (numOfThreads > 0) {
            ns.exec("w.js",server,numOfThreads,target);
          }
        }
      }
        }
        // check if there are new servers
        internet = checkInternet(ns, internet);
    }
    return;
 }