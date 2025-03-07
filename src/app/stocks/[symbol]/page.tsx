import { getStocks } from "@/utils/frontendApiConfig";
import Header from "@/components/header";
import getSessionUser from "@/utils/getSessionUser";
import StockInfo from "./stock-info";
import { checkUserWatchlist } from "@/serverActions";
import { FailedStockFetch, StockData } from "@/lib/types";
import { unstable_cache } from "next/cache";

export default async function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const user = await getSessionUser();
  const getStocksWithCache = unstable_cache(
    async (symbols: string[]) => {
      return getStocks(symbols);
    },
    ["stock-page"],
    {
      revalidate: 1800,
    }
  );
  const stockData: (StockData | FailedStockFetch)[] = await getStocksWithCache([
    symbol,
  ]);
  const failedStockFetch = stockData[0] as FailedStockFetch;
  const stock = stockData[0] as StockData;
  if (failedStockFetch.status === "rejected") {
    return (
      <>
        <Header user={user}></Header>
        <div className="no-content">
          <p>
            You reached your limit on API calls on free plan.<br></br>Please,
            try again in 60 seconds
          </p>
        </div>
      </>
    );
  }

  const isSymbolOnWatchlist = await checkUserWatchlist(
    user.id,
    stock.meta.symbol
  );
  return (
    <>
      <Header user={user}></Header>
      <div className="max-w-300 mx-auto">
        <StockInfo
          stockData={stock}
          userId={user.id}
          isSymbolOnWatchlist={isSymbolOnWatchlist}
        ></StockInfo>
      </div>
    </>
  );
}
