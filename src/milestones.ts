import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // log the start of the script
    ns.print("Starting milestones script");
    // gain root access on CSEC (we will wait for our hack script to do this)
    while (!ns.hasRootAccess("CSEC")) {
        await ns.sleep(10000);
    }
    // log that we have root access on CSEC
    ns.print("Root access on CSEC acquired");
    // install backdoor on CSEC
    // wait until we have the hacking level required to install the backdoor
    while (ns.getServerRequiredHackingLevel("CSEC") > ns.getHackingLevel()) {
        await ns.sleep(10000);
    }
    // join CyberSec

    // install all augemtations from CyberSec

    // join NiteSec

    // install all augmentations from NiteSec

    // join BlackHand

    // install all augmentations from BlackHand
}