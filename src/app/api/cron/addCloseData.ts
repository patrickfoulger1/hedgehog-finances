export default function addCloseData(stockData, watchlist) {
    const returnData = watchlist.map((entry) => {
        // iterate through each user in pingData
        const entryCopy = { ...entry };
        const stock = entryCopy.stockSymbol;
        const stockInfo = stockData.find((item) => item.meta.symbol === stock);
        entryCopy.close = parseFloat(stockInfo.values[0].close); // get close value.
        entryCopy.currency = stockInfo.meta.currency; // get currency value.
        return entryCopy;
    });

    return returnData;
}
