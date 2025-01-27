import { NS } from '@ns'

export async function main(ns: NS): Promise<void> {
    // get array of all stock symbols
    const stockSymbols: string[] = ns.stock.getSymbols();
    // while loop to check stock market
    while (true) {
        // get stock portfolio
        for (const symbol of stockSymbols) {
            // get current shares
            const shares: number = ns.stock.getPosition(symbol)[0];
            // if we have shares
            if (shares > 0) {
                // get forecast
                const forecast: number = ns.stock.getForecast(symbol);
                //ns.tprint(`Forecast for ${symbol}: ${forecast}`);
                // get average cost of shares
                const cost: number = ns.stock.getPosition(symbol)[1];
                // if forecast is less than 0.6 and the stock is profitable
                if (forecast < 0.6 && ns.stock.getBidPrice(symbol) > cost) {
                    // sell shares
                    ns.stock.sellStock(symbol, shares);
                    // get gain
                    const gain: number = ns.stock.getSaleGain(symbol, shares, "long");
                    ns.tprint(`Sold ${shares} shares of ${symbol} for a gain of ${gain}`);
                }
            }
        }
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
                //ns.tprint(`Best forecast is ${bestForecast} for ${stockToBuy}`);
            }  
        }
        // get price of stock to buy
        let price: number = ns.stock.getAskPrice(stockToBuy);
        // get the max shares of a stock
        let maxShares: number = ns.stock.getMaxShares(stockToBuy);
        // get the current shares of the stock we have
        let currentShares: number = ns.stock.getPosition(stockToBuy)[0];
        // get the number of shares we can buy
        // Calculate the number of shares we can afford to buy with the current funds
        const affordableShares: number = Math.floor(currentFunds / price);
        // Calculate the maximum number of shares we can buy without exceeding the max shares limit
        const maxPurchasableShares: number = maxShares - currentShares;
        // Determine the number of shares to buy, which is the minimum of the affordable shares and the max purchasable shares
        let sharesToBuy: number = Math.min(affordableShares, maxPurchasableShares);
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