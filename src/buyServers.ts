import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // How much RAM each purchased server will have. In this case, it'll be 32GB.
    const ram = 32;
    // Iterator we'll use for our loop
    let i = 0;
    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < ns.getPurchasedServerLimit()) {
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            // If we have enough money, then:
            // New server name will be "pserv-" + i
            let serverName = "pserv-" + i;
            // Purchase the server
            ns.purchaseServer(serverName, ram);
            // Copy the scripts to the new server
            ns.run("copyPayload.js", 1, serverName);
            // Get internet from port 1
            let internet = ns.readPort(1);
            // Add the server to the internet array
            internet.push(serverName);
            // Write to port 1
            ns.writePort(1, internet);
            // Increment our iterator to indicate that we've bought a new server
            ++i;
        }
        //Make the script wait for 10 seconds before looping again.
        //Removing this line will cause an infinite loop and crash the game.
        await ns.sleep(10000);
    }
    // If we reach this point, then we've reached the maximum amount of servers
    ns.tprint("Max servers purchased.");
    return
}