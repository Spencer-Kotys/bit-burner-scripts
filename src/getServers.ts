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
  // clear port 1
  ns.clearPort(1);
  // write array to port 1
  ns.writePort(1,internet);
}
