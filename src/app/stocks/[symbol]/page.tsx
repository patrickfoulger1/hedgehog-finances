import getStockData from "@/app/api/keys/frontendApiConfig";
import Header from "@/components/header";
import getSessionUser from "@/utils/getSessionUser";
import StockInfo from "./stock-info";
import { checkUserWatchlist } from "@/serverActions";

export default async function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const user = await getSessionUser();
  const stockData = await getStockData(symbol);
  if (stockData.code) {
    return (
      <>
        <Header user={user}></Header>
        <div className="no-content">
          <p>You reached your limit on API calls on free plan.<br></br>Please, try again in 60 seconds</p>
        </div>
      </>
    )
  }
  const isSymbolOnWatchlist = await checkUserWatchlist(user.id, stockData.meta.symbol)
  return (
    <>
      <Header user={user}></Header>
      <div className="max-w-300 mx-auto">
        <StockInfo stockData={stockData} userId={user.id} isSymbolOnWatchlist={isSymbolOnWatchlist}></StockInfo>
      </div>
    </>
  );
}
