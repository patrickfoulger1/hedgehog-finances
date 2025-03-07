"use client"
import { LineChart } from "@/components/lineChart"
import AddToWatchlistBtn from "@/components/addToWatchlistBtn"


export default function StockInfo({ stockData, userId, isSymbolOnWatchlist }) {

  // console.log(stockData);

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="">{stockData.meta.symbol}</h1>
        <AddToWatchlistBtn userId={userId} stockSymbol={stockData.meta.symbol} isSymbolOnWatchlist={isSymbolOnWatchlist} />
      </div>
      <LineChart stockValues={stockData.values} stockMetaData={stockData.meta} ></LineChart>
    </>
  )
}
