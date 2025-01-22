import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    // How much RAM each purchased server will have. In this case, it'll be 16GB.
    const ram = 16;
    // Iterator we'll use for our loop
    let i = 0;
    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < ns.getPurchasedServerLimit()) {
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            // If we have enough money, then:
            // Purchase the server
            ns.purchaseServer("pserv-" + i, ram);
            // Increment our iterator to indicate that we've bought a new server
            ++i;
        }
        //Make the script wait for 10 seconds before looping again.
        //Removing this line will cause an infinite loop and crash the game.
        await ns.sleep(10000);
    }
}