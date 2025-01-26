import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    const stockSymbols = ns.stock.getSymbols();
    const initialFunds = ns.getServerMoneyAvailable('home');
    const maxStocks = 1000;

    for (const symbol of stockSymbols) {
        const price = ns.stock.getAskPrice(symbol);
        const sharesToBuy = Math.min(Math.floor(initialFunds / price), maxStocks);
        
        if (sharesToBuy > 0) {
            ns.stock.buy(symbol, sharesToBuy);
            ns.tprint(`Bought ${sharesToBuy} shares of ${symbol} at ${price}`);
        }
    }
}