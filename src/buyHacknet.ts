import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    while (ns.hacknet.numNodes() < ns.hacknet.maxNumNodes()) {
        const limit = 500000;
        const money = ns.getServerMoneyAvailable("home");
        const nodeCost = ns.hacknet.getPurchaseNodeCost();
        if (money > nodeCost && nodeCost < limit) {
          ns.hacknet.purchaseNode();
          ns.tprint("Purchased new node!");
        }
        else {
          for (let i = 0; i < ns.hacknet.numNodes(); ++i) {
            const levelCost = ns.hacknet.getLevelUpgradeCost(i);
            const ramCost = ns.hacknet.getRamUpgradeCost(i)
            const coreCost = ns.hacknet.getCoreUpgradeCost(i)
            if (money > levelCost && levelCost < limit) {
              ns.hacknet.upgradeLevel(i);
              ns.tprint("Purchased new level on node ", i);
            }
            else if (money > ramCost && ramCost < limit) {
              ns.hacknet.upgradeRam(i);
              ns.tprint("Purchased more ram on node ", i);
            }
            else if (money > coreCost && coreCost < limit) {
              ns.hacknet.upgradeCore(i);
              ns.tprint("Purchased more cores on node ", i);
            }
          }
        }
        await ns.sleep(10000);
      }
}