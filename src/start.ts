import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // run TOR script (need better tech for this, must be manual for now)
    //ns.exec("buystuff.js", "home");
    // run search, root, and copy script
    ns.run("getServers.js");
    // attack (while loop w/ search)
    ns.run("moneyMaker.js");
    // buy servers (while loop)
    ns.run("buyServers.js");
    // buy hacknet (while loop)
    ns.run("buyHacknet.js");
    // progress through milestones
    ns.run("milestones.js");
    // print done
    ns.tprint("Start up completed!");
    return
}