import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // run TOR script (need better tech for this, must be manual for now)
    //ns.exec("buystuff.js", "home");
    // run search and root script
    ns.exec("getServers.js","home");
    // copy payload to servers
    let internet = ns.exec("copyPayload.ts","home");
    // attack (while loop w/ search)

    // buy servers (while loop)

    // buy hacknet (while loop)

    // progress through milestones

}