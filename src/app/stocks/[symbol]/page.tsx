import { getStocks } from "@/utils/frontendApiConfig";
import Header from "@/components/header";
import getSessionUser from "@/utils/getSessionUser";
import StockInfo from "./stock-info";
import { checkUserWatchlist } from "@/serverActions";
import { FailedStockFetch, StockData } from "@/lib/types";
import { unstable_cache } from "next/cache";
import DividendInfoComponent from "@/components/dividendInfoComponent";
import getDividendInfo from "@/utils/finModelingConfig";
import { getCompanyNews } from "@/utils/finnhub";
import StockNews from './stockNews'
import { StockNewsData } from "@/lib/types";
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
  const news: StockNewsData[] = await getCompanyNews(symbol)
  const dividendInfo = await getDividendInfo(symbol);


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
      <div className="sm:max-w-8/12 mx-auto shadow-lg rounded-lg">
        <StockInfo
          stockData={stock}
          userId={user.id}
          isSymbolOnWatchlist={isSymbolOnWatchlist}
        ></StockInfo>
        <DividendInfoComponent dividendinfo={dividendInfo} />
      </div>
      <h2>Company news</h2>
      <div className="news">
        {!news.length ? <p>No news were found for this company</p> : (
          news.map((post) => {
            return <StockNews post={post} key={post.id} />
          })
        )}
      </div>
    </>
  );
}