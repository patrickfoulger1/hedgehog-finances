import getStockData from "@/app/api/keys/frontendApiConfig";
import Header from "@/components/header";
import getSessionUser from "@/utils/getSessionUser";
import StockInfo from "./stock-info";

export default async function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const user = await getSessionUser();
  const stockData = await getStockData(symbol);

  return (
    <>
      <Header user={user}></Header>
      <StockInfo stockData={stockData}></StockInfo>
    </>
  );
}
