import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    // get array of all stock symbols
    const stockSymbols: string[] = ns.stock.getSymbols();
    // get current funds
    const initialFunds: number = ns.getServerMoneyAvailable('home');
    const maxStocks = 1000;
    // while loop to check stock market
    while (true) {
        // loop through stock symbols
        for (const symbol of stockSymbols) {
            const price = ns.stock.getAskPrice(symbol);
            const sharesToBuy = Math.min(Math.floor(initialFunds / price), maxStocks);
            
            if (sharesToBuy > 0) {
                ns.stock.buyStock(symbol, sharesToBuy);
                ns.tprint(`Bought ${sharesToBuy} shares of ${symbol} at ${price}`);
            }
        }
        // wait for stock market to update
        await ns.stock.nextUpdate()
    }
}