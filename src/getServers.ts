import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  function search(server: string,internet: string[],ns: NS) {
    // make array of neighboring servers
    let network: string[] = ns.scan(server);
    // for each server in the network
    for (let i = 0; i < network.length; ++i) {
      // if internet does not include server
      if (!(internet.includes(network[i]))) {
        // add the server to the internet
        internet.push(network[i]);
        // search this server
        search(network[i],internet,ns);
      }
    }
    // return value of internet
    return internet;
  }
  // get array of all servers
  let internet: string[] = search("home",[],ns);
  // get root access on servers
  ns.run("getRoot.js",1,...internet);
  // copy payload to servers
  ns.run("copyPayload.ts",1,...internet);
  return
}
