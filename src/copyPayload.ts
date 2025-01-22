import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // declare internet as array of strings
    let internet: string[] = ns.args as string[];
    // on each network
    for (let i = 0; i < internet.length; ++i) {
        // copy payloads
        ns.scp("h.js",internet[i]);
        ns.scp("w.js",internet[i]);
        ns.scp("g.js",internet[i]);
    }
}