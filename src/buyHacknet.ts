import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    while (ns.hacknet.numNodes() < ns.hacknet.maxNumNodes()) {
        // limit node cost ot 500k
        const limit = 500000;
        // get money available on home server
        const money = ns.getServerMoneyAvailable("home");
        // get cost of new node
        const nodeCost = ns.hacknet.getPurchaseNodeCost();
        // if we have enough money to buy a new node and the cost is less than the limit
        if (money > nodeCost && nodeCost < limit) {
            // purchase a new node
            ns.hacknet.purchaseNode();
        }
        // otherwise, upgrade existing nodes
        else {
            // loop through all nodes
            for (let i = 0; i < ns.hacknet.numNodes(); ++i) {
                // get cost of upgrading level, ram, and cores
                const levelCost = ns.hacknet.getLevelUpgradeCost(i);
                const ramCost = ns.hacknet.getRamUpgradeCost(i)
                const coreCost = ns.hacknet.getCoreUpgradeCost(i)
                // get lowest cost upgrade option
                const minCost = Math.min(levelCost, ramCost, coreCost);
                // if we have enough money to upgrade and the cost is less than the limit
                if (money > minCost && minCost < limit) {
                    // upgrade the node
                    if (minCost === levelCost) {
                        ns.hacknet.upgradeLevel(i);
                    }
                    else if (minCost === ramCost) {
                        ns.hacknet.upgradeRam(i);
                    }
                    else if (minCost === coreCost) {
                        ns.hacknet.upgradeCore(i);
                    }
                }
            }
        }
        // sleep for 10 seconds
        await ns.sleep(10000);
    }
    // complete msg
    ns.tprint("Completed Hacknet Node Purchase");
}