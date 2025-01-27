import { NS } from "@ns";

function findBestTarget(ns: NS, internet: string[]): string {
    // initialize target name and highest score, set targetName to n00dles as default
    let targetName = "n00dles";
    let highestScore: number = 0;
    // loop through internet array
    for (const server of internet) {
        // check if server is not home server, we have root access, and server is hackable
        if (server != "home" && ns.hasRootAccess(server) && ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
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
    return targetName;
}

function checkInternet(ns: NS, internet: string[]): string[] {
    // peek port 1
    let port1: string[] = ns.peek(1);
    // if internet is not the same as port 1 and is not null
    if (JSON.stringify(internet) !== JSON.stringify(port1) && (!(port1.includes("NULL PORT DATA")))) {
        // set internet to port 1
        internet = port1;
    }
    return internet;
}

// calculate number of threads to run on server
function getNumOfThreads(ns: NS, server: string, scriptRam: number): number {
    // get amount of RAM on server
    const serverRam: number = ns.getServerMaxRam(server);
    // get current RAM used
    let usedRam: number = ns.getServerUsedRam(server);
    // if home server, add 100 GB to used RAM, this will save RAM for other scripts
    if (server === "home") {
        usedRam += 100;
    }
    // calculate number of threads to run based on Ram, round down to nearest whole number
    const threads: number = Math.floor((serverRam - usedRam) / scriptRam);
    // return number of threads
    return threads;
  }

export async function main(ns: NS): Promise<void> {
    // disable logs for Ram
    ns.disableLog("getServerMaxRam");
    ns.disableLog("getServerUsedRam");
    // declare internet as array of strings
    let internet: string[] = ns.args.filter(arg => typeof arg === 'string') as string[];
    // get script Ram requirements
    const weakenRam: number = ns.getScriptRam("w.js", "home");
    const growRam: number = ns.getScriptRam("g.js", "home");
    const hackRam: number = ns.getScriptRam("h.js", "home");
    // run while loop
    while (true) {
        // get best target based on highest percentage of money hacked per thread
        let target: string = findBestTarget(ns, internet);
        // check if security level is above min security level
        if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
            // weaken it
            for (const server of internet) {
                // get number of threads to run
                let numOfThreads: number = getNumOfThreads(ns, server, weakenRam);
                // execute payload on server with number of threads
                if (numOfThreads > 0) {
                    let error: number = ns.exec("w.js",server,numOfThreads,target);
                    if (error === 0) {
                        ns.tprint("Error: Weaken failed on " + server);
                    }
                }
            }
        }
        else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
            // grow it
            for (const server of internet) {
                let numOfThreads: number = getNumOfThreads(ns, server, growRam);
                // execute payload on server with number of threads
                if (numOfThreads > 0) {
                    let error: number = ns.exec("g.js",server,numOfThreads,target);
                    if (error === 0) {
                        ns.tprint("Error: Grow failed on " + server);
                    }
                }
            }
        }
        else {
            // hack it
            for (let i = 0; i< internet.length; ++i) {
                let server: string = internet[i];
                // get number of threads to run
                let numOfThreads: number = getNumOfThreads(ns, server, hackRam);
                // execute payload on server with number of threads
                if (numOfThreads > 0) {
                    let error: number = ns.exec("h.js",server,numOfThreads,target);
                    if (error === 0) {
                        ns.tprint("Error: Hack failed on " + server);
                    }
                }
            }
        }
        // check if there are new servers
        internet = checkInternet(ns, internet);
        // sleep 10 seconds
        await ns.sleep(10000);
    }
 }