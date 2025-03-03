'use client'
import { LineChart } from "@/components/lineChart"
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/header";
export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [stocks, setStocks] = useState([])
    useEffect(() => {
        setIsLoading(true)

        setIsLoading(false)
    }, [])
    if (isLoading) {
        return <Loader />
    }
    else {
        if (!stocks.length) {
            return (
                <>
                    <Header />
                    <h1>Welcome back!</h1>
                    <div className="controls">
                        <button>Add stock to watchlist</button>
                    </div>
                    <div className="no-content"><p>No stocks added to the watchlist</p></div>
                </>
            )
        }
        else {
            return (
                <Header />
            )
        }
    }
}