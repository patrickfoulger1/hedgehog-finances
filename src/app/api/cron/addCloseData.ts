export default function addCloseData(stockData, pingData) {

    pingData.forEach((user) => { // iterate through each user in pingData
        user.stockSymbols.forEach((stock) => {
            // Find the stock data from stockData
            const stockInfo = stockData.find(item => item.meta.symbol === stock.symbol);
            stock.close = parseFloat(stockInfo.values[0].close); // get close value.
            stock.currency = stockInfo.meta.currency; // get currency value.
        });
    });

    return pingData; // return pingData.
}