import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // execute terminal commands with HTML inject
    // get reference to terminal text field
    let terminalInput = document.getElementById("terminal-input");
    // set value to run
    // @ts-ignore
    terminalInput.value = "home;buy -l;";
    // get reference to event handler
    // @ts-ignore
    let handler = Object.keys(terminalInput)[1];
    // set internal values
    // @ts-ignore
    terminalInput[handler].onChange({target:terminalInput});
    // simulate enter
    // @ts-ignore
    terminalInput[handler].onKeyDown({key: "Enter", preventDefault:()=>null});
    // while we don't have the TOR node
    while (!(ns.hasTorRouter())) {
        // try to buy the Tor Router

        // sleep
        ns.sleep(10000);
    }
    // while we don't have BruteSSH.exe
    while (!(ns.fileExists("BruteSSH.exe", "home"))) {
        // try to buy BruteSSH.exe
        // @ts-ignore
        terminalInput.value = "home;buy BrueteSSH.exe";
        // simulate enter
        // @ts-ignore
        terminalInput[handler].onKeyDown({key: "Enter", preventDefault:()=>null});
        // sleep
        ns.sleep(10000);
    } 
    while (!(ns.fileExists("FTPcrack.exe", "home"))) {
        // try to buy BruteSSH.exe
        // @ts-ignore
        terminalInput.value = "home;buy FTPcrack.exe";
        // simulate enter
        // @ts-ignore
        terminalInput[handler].onKeyDown({key: "Enter", preventDefault:()=>null});
        // sleep
        ns.sleep(10000);
    } 
    while (!(ns.fileExists("relaySMTP.exe", "home"))) {
        // try to buy BruteSSH.exe
        // @ts-ignore
        terminalInput.value = "home;buy relaySMTP.exe";
        // simulate enter
        // @ts-ignore
        terminalInput[handler].onKeyDown({key: "Enter", preventDefault:()=>null});
        // sleep
        ns.sleep(10000);
    } 
    while (!(ns.fileExists("HTTPWorm.exe", "home"))) {
        // try to buy BruteSSH.exe
        // @ts-ignore
        terminalInput.value = "home;buy HTTPWorm.exe";
        // simulate enter
        // @ts-ignore
        terminalInput[handler].onKeyDown({key: "Enter", preventDefault:()=>null});
        // sleep
        ns.sleep(10000);
    } 
    while (!(ns.fileExists("SQLInject.exe", "home"))) {
        // try to buy BruteSSH.exe
        // @ts-ignore
        terminalInput.value = "home;buy SQLInject.exe";
        // simulate enter
        // @ts-ignore
        terminalInput[handler].onKeyDown({key: "Enter", preventDefault:()=>null});
        // sleep
        ns.sleep(10000);
    }
}