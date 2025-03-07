import { FailedStockFetch, StockData } from "@/lib/types";

import { getStocks } from "../../utils/frontendApiConfig";

import { LineChart } from "@/components/lineChart";
import Link from "next/link";
import { Watchlist } from "@prisma/client";

export const dynamic = "force-dynamic";
export default async function Charts({ stocks }: { stocks: Watchlist[] }) {
  const stockData: (StockData | FailedStockFetch)[] = await getStocks(
    stocks.map((stock) => stock.stockSymbol)
  );

  let watchlistDisplay;
  if (stocks.length) {
    watchlistDisplay = stockData.map((res: StockData | FailedStockFetch) => {
      //if has the type of StockData
      const stock = res as StockData;
      if (stock.meta) {
        return (
          <div
            key={stock.meta.symbol}
            className="my-chart flex justify-center items-center sm:block"
          >
            <Link href={`/stocks/${stock.meta.symbol}`}>
              <LineChart
                stockValues={stock.values}
                stockMetaData={stock.meta}
              />
            </Link>
          </div>
        );
      }
    });
  } else {
    watchlistDisplay = (
      <div className="no-content">
        <p>No stocks added to the watchlist</p>
      </div>
    );
  }

  return (
    <div className="charts lg:flex lg:flex-row lg:justify-center">
      {watchlistDisplay}
    </div>
  );
}
