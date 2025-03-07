"use client";
import { WatchlistStock } from "@/lib/types";
import { StockData } from "@/lib/types";
import { api } from "../api/keys/frontendApiConfig";
import { apiKey, reservedApiKey } from "../api/keys/frontendApiConfig";
import { useEffect, useState } from "react";
import { LineChart } from "@/components/lineChart";
import Link from "next/link";

export default function Charts({ stocks }: { stocks: WatchlistStock[] }) {
  const [stocksData, setStocksData] = useState<StockData[]>([]);
  const [outOfCalls, setOutOfCalls] = useState(false)
  useEffect(() => {
    if (!stocks.length) return;
    Promise.all(
      stocks.map((stock) => {
        return api
          .get(
            `/time_series?symbol=${stock.stockSymbol}&interval=30min&outputsize=50&apikey=${apiKey}`
          )
          .then(({ data }) => {
            if (data.code) {
              return api
                .get(
                  `/time_series?symbol=${stock.stockSymbol}&interval=30min&outputsize=50&apikey=${reservedApiKey}`
                )
                .then(({ data }) => {
                  if (data.code) {
                    setOutOfCalls(true)
                  }
                  return data
                })
            }
            return data;
          })
          .catch((error) => {
            console.log(error);
          });
      })
    ).then((data) => {
      setStocksData(data);
    });
  }, [stocks]);
  if (!stocks.length) {
    return (
      <div className="no-content">
        <p>No stocks added to the watchlist</p>
      </div>
    );
  }
  if (outOfCalls) {
    return (
      <div className="no-content">
        <p>You reached your limit on API calls on free plan.<br></br>Please, try again in 60 seconds</p>
      </div>
    )
  }
  return (
    <div className="charts lg:flex lg:flex-row lg:justify-center">
      {stocksData.map((stockData: StockData) => {
        return (
          <div key={stockData.meta.symbol} className="my-chart flex justify-center items-center sm:block">
            <Link href={`/stocks/${stockData.meta.symbol}`}>
              <LineChart
                stockValues={stockData.values}
                stockMetaData={stockData.meta}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
