import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // declare internet as array of strings
    let internet: string[] = ns.args as string[];
    // declare array for one port servers
    let port1: string[] = [];
    // declare array for two port servers
    let port2: string[] = [];
    // declare array for three port servers
    let port3: string[] = [];
    // declare array for four port servers
    let port4: string[] = [];
    // declare array for five port servers
    let port5: string[] = [];
    // for each server on the internet
    for (let i = 0; i < internet.length; ++i) {
        // declare server as a string    
        let server: string = internet[i];
        // check if we already have root access
        if (!(ns.hasRootAccess(server))) {
            // get number to ports required to hack
            let ports: number = ns.getServerNumPortsRequired(server);
            // depending on the number of ports required do this
            switch (ports) {
                case 0:
                    ns.nuke(server);
                    break;
                case 1:
                    if (ns.fileExists("BruteSSH.exe", "home")) {
                        ns.brutessh(server);
                        ns.nuke(server);
                    }
                    else {
                        // add server to port1 list
                        port1.push(server);
                    }
                    break;
                case 2:
                    if (ns.fileExists("BruteSSH.exe", "home") && ns.fileExists("FTPcrack.exe", "home")) {
                        ns.brutessh(server);
                        ns.ftpcrack(server);
                        ns.nuke(server);
                    }
                    else {
                        // add server to port1 list
                        port2.push(server);
                    }
                    break;
                case 3:
                    if (ns.fileExists("BruteSSH.exe", "home") && ns.fileExists("FTPcrack.exe", "home") && ns.fileExists("relaySMTP.exe", "home")) {
                        ns.brutessh(server);
                        ns.ftpcrack(server);
                        ns.relaysmtp(server);
                        ns.nuke(server);
                    }
                    else {
                        // add server to port1 list
                        port3.push(server);
                    }
                    break;
                case 4:
                    if (ns.fileExists("BruteSSH.exe", "home") && ns.fileExists("FTPcrack.exe", "home") && ns.fileExists("relaySMTP.exe", "home") && ns.fileExists("HTTPWorm.exe", "home")) {
                        ns.brutessh(server);
                        ns.ftpcrack(server);
                        ns.relaysmtp(server);
                        ns.httpworm(server);
                        ns.nuke(server);
                    }
                    else {
                        // add server to port1 list
                        port4.push(server);
                    }
                    break;
                case 5:
                    if (ns.fileExists("BruteSSH.exe", "home") && ns.fileExists("FTPcrack.exe", "home") && ns.fileExists("relaySMTP.exe", "home") && ns.fileExists("HTTPWorm.exe", "home") && ns.fileExists("SQLInject.exe", "home")) {
                        ns.brutessh(server);
                        ns.ftpcrack(server);
                        ns.relaysmtp(server);
                        ns.httpworm(server);
                        ns.sqlinject(server);
                        ns.nuke(server);
                    }
                    else {
                        // add server to port1 list
                        port5.push(server);
                    }
                    break;
                default:
                    ns.tprint(server + " requires " + ports + " to hack!");
            }
        }
    }
    // wait for "BruteSSH to exist
    while (!(ns.fileExists("BruteSSH.exe", "home"))) {
        await ns.sleep(10000);
    }
    // go through 1 port list
    for (let i = 0; i< port1.length; ++i) {
        ns.brutessh(port1[i]);
        ns.nuke(port1[i]);
    }
    // wait for FTPcrack to exist
    while (!(ns.fileExists("FTPcrack.exe", "home"))) {
        await ns.sleep(10000);
    }
    for (let i = 0; i < port2.length; ++i) {
        ns.ftpcrack(port2[i]);
        ns.brutessh(port2[i]);
        ns.nuke(port2[i]);
    }
    // wait for RelaySMTP to exist
    while (!(ns.fileExists("RelaySMTP.exe", "home"))) {
        await ns.sleep(10000);
    }
    for (let i = 0; i < port3.length; ++i) {
        ns.relaysmtp(port3[i]);
        ns.ftpcrack(port3[i]);
        ns.brutessh(port3[i]);
        ns.nuke(port3[i]);
    }
    // wait for HTTPWorm to exist
    while (!(ns.fileExists("HTTPWorm.exe", "home"))) {
        await ns.sleep(10000);
    }
    for (let i = 0; i < port4.length; ++i) {
        ns.httpworm(port4[i]);
        ns.relaysmtp(port4[i]);
        ns.ftpcrack(port4[i]);
        ns.brutessh(port4[i]);
        ns.nuke(port4[i]);
    }
    // wait for SQLInject to exist
    while (!(ns.fileExists("SQLInject.exe", "home"))) {
        await ns.sleep(10000);
    }
    for (let i = 0; i < port5.length; ++i) {
        ns.sqlinject(port5[i]);
        ns.httpworm(port5[i]);
        ns.relaysmtp(port5[i]);
        ns.ftpcrack(port5[i]);
        ns.brutessh(port5[i]);
        ns.nuke(port5[i]);
    }
    // print done
    ns.tprint("Root access completed!");
    return;
}