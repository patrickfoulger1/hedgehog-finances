import { StockData, Watchlist } from "@/lib/types";
// import { StockData } from "@/lib/types";
import { getStocks } from "../../utils/frontendApiConfig";
// import { apiKey, reservedApiKey } from "../../utils/frontendApiConfig";
// import { useEffect, useState } from "react";
import { LineChart } from "@/components/lineChart";

export const dynamic = "force-dynamic";
export default async function Charts({ stocks }: { stocks: Watchlist[] }) {
  const stockData = await getStocks(stocks.map((stock) => stock.stockSymbol));
  const watchlistDisplay = stockData.map((stockData: StockData) => {
    if (stockData) {
      return (
        <div key={stockData.meta.symbol} className="my-chart">
          <LineChart
            stockValues={stockData.values}
            stockMetaData={stockData.meta}
          />
        </div>
      );
    } else {
      <>test</>;
    }
  });

  return <div className="charts">{watchlistDisplay}</div>;
}
