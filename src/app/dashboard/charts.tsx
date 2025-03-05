'use client'
import { WatchlistStock } from "@/lib/types"
import { StockData } from "@/lib/types"
import { api } from "../api/keys/frontendApiConfig"
import { apiKey } from "../api/keys/frontendApiConfig"
import { useEffect, useState } from "react"
import { LineChart } from "@/components/lineChart"
export default function Charts({ stocks }: { stocks: WatchlistStock[] }) {
    const [stocksData, setStocksData] = useState<any[]>([])
    useEffect(() => {
        if (!stocks.length) return
        Promise.all(stocks.map((stock) => {
            return api.get(`/time_series?symbol=${stock.stockSymbol}&interval=30min&outputsize=50&apikey=${apiKey}`)
                .then(({ data }) => {
                    return data
                })
        }))
            .then((data) => {
                setStocksData(data)
            })
    }, [])
    if (!stocks.length) {
        return (
            <div className="no-content">
                <p>No stocks added to the watchlist</p>
            </div>
        )
    }
    return (
        <div className="charts">
            {stocksData.map((stockData: StockData) => {
                return <div key={stockData.meta.symbol} className="my-chart"><LineChart stockValues={stockData.values} stockMetaData={stockData.meta} /></div>
            })}
        </div>
    )
}