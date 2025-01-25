import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // run TOR script (need better tech for this, must be manual for now)
    //ns.exec("buystuff.js", "home");
    // run search
    ns.run("getServers.js");
    // wait for port 1 to be written to
    await ns.nextPortWrite(1);
    // peek port 1
    let internet: string[] = ns.peek(1);
    // run root script
    ns.run("getRoot.js", 1, ...internet);
    // run copy script
    ns.run("copyPayload.js", 1, ...internet);
    // attack (while loop w/ search)
    ns.run("moneyMaker.js", 1, ...internet);
    // buy servers (while loop)
    ns.run("buyServers.js");
    // buy hacknet (while loop)
    ns.run("buyHacknet.js");
    // print done
    ns.tprint("Start up completed!");
    return
}