"use client"
import { LineChart } from "@/components/lineChart"
import AddToWatchlistBtn from "@/components/addToWatchlistBtn"
import NotifyMeBtn from "@/components/notifyMeBtn"


export default function StockInfo({ stockData, userId, isSymbolOnWatchlist }) {


  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-center items-center">
        <h1 className="">{stockData.meta.symbol}</h1>
        <AddToWatchlistBtn userId={userId} stockSymbol={stockData.meta.symbol} isSymbolOnWatchlist={isSymbolOnWatchlist} />
        <NotifyMeBtn userId={userId} stockSymbol={stockData.meta.symbol} />
      </div>
      <div className="w-10/12 mx-auto">
        <LineChart stockValues={stockData.values} stockMetaData={stockData.meta} ></LineChart>
      </div>
    </>
  )
}
