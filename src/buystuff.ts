import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // trying to execute terminal commands with HTML inject
    // get reference to terminal text field
    let terminalInput = document.getElementById("terminal-input");
    // set value to run
    terminalInput.value = "home;buy -l;";
    // get reference to event handler
    let handler = Object.keys(terminalInput)[1];
    // set internal values
    terminalInput[handler].onChange({target:terminalInput});
    // simulate enter
    terminalInput[handler].onKeyDown({key: "Enter", preventDefault:()=>null});
    // while we don't have the TOR node
    /*
    while (!(ns.hasTorRouter())) {
        // check if we have the money to buy it
        
    }
    */

    // run script to buy from TOR node (while loop)

}