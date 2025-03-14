import { FailedStockFetch, StockData } from "@/lib/types";
import { unstable_cache } from "next/cache";
import { getStocks } from "../../utils/frontendApiConfig";
import { EmptyWatchlist } from "@/components/emptyWatchlist";
import { LineChart } from "@/components/lineChart";
import Link from "next/link";
import { Watchlist } from "@prisma/client";

export default async function Charts({ stocks }: { stocks: Watchlist[] }) {
  const getStocksWithCache = unstable_cache(
    async (symbols) => {
      return getStocks(symbols);
    },
    ["dashboard-stocks"],
    {
      revalidate: 1800,
    }
  );

  const stockData: (StockData | FailedStockFetch)[] = await getStocksWithCache(
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
        <EmptyWatchlist />
      </div>
    );
  }

  return (
    <div className="charts lg:flex lg:flex-row lg:justify-center">
      {watchlistDisplay}
    </div>
  );
}
