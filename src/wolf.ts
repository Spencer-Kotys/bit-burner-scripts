import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    // get array of all stock symbols
    const stockSymbols: string[] = ns.stock.getSymbols();
    // while loop to check stock market
    while (true) {
        // get current funds minus 1 million
        let currentFunds: number = (ns.getServerMoneyAvailable('home')-1000000);
        // declare stock to buy
        let stockToBuy: string = "";
        // declare best forecast
        let bestForecast: number = 0;
        // loop through stock symbols
        for (const symbol of stockSymbols) {
            // get stock forcast
            const forecast = ns.stock.getForecast(symbol);
            // if forecast is the best we have seen
            if (forecast > bestForecast) {
                // set stock to buy
                stockToBuy = symbol;
                // set best forecast
                bestForecast = forecast;
            }  
        }
        // get price of stock to buy
        let price: number = ns.stock.getAskPrice(stockToBuy);
        // get the max shares of a stock
        let maxShares: number = ns.stock.getMaxShares(stockToBuy);
        // get the current shares of the stock we have
        let currentShares: number = ns.stock.getPosition(stockToBuy)[0];
        // get the number of shares we can buy
        let sharesToBuy: number = Math.min(Math.floor(currentFunds / price), maxShares - currentShares);
        // check if we can buy shares
        if (sharesToBuy > 0) {
            // buy shares
            ns.stock.buyStock(stockToBuy, sharesToBuy);
            ns.tprint(`Bought ${sharesToBuy} shares of ${stockToBuy} at ${price}`);
        }
        // wait for stock market to update
        await ns.stock.nextUpdate()
    }
}