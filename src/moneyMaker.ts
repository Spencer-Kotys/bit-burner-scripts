import { NS } from "@ns";

function getTarget(ns: NS, internet: string[]): string {
    // create base variables
    let targetName = "";
    let highestPercentage = 0;
    // loop through internet array
    for (let i = 0; i < internet.length; ++i) {
        const server = internet[i];
        // check if server is not home server
        if (server != "home") {
            // check if server is hackable
            if (ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
                // get percentage of money that is hacked with one thread
                const percentage = ns.hackAnalyze(server);
                // check if percentage of money hacked is the highest percentage yet
                if (percentage > highestPercentage) {
                    // set highest percentage and target name to new server
                    highestPercentage = percentage;
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

export async function main(ns: NS): Promise<void> {
    // declare internet as array of strings
    let internet: string[] = ns.args as string[];
    // run while loop
    while (true) {
        let target: string = getTarget(ns, internet);
        internet = checkInternet(ns, internet);
    }
    return;
 }