"use server";

import getWatchlist from "./getWatchlist";
import processPingData from "./prcessPingData";
import addCloseData from "./addCloseData";
import compareData from "./compareData";
import { getStocks } from "../../../utils/frontendApiConfig";
import { triggerWorkflow } from "@/serverActions";
import { symbol } from "zod";
import { watch } from "fs";
import mailerFunction from "./mailerFunction";

export async function GET() {
    // need to call this function GET.

    try {
        // Fetch watchlist table from DB
        const watchlist = await getWatchlist(); // stockSymbolArray is an array of stock symbols.
        // Generate a unique array of stocks to minimise API calls.
        const uniqueStocks: string[] = [];
        watchlist.map((stock) => {
            if (!uniqueStocks.includes(stock.stockSymbol)) {
                uniqueStocks.push(stock.stockSymbol);
            }
        });

        // Fetch stock data using stockSymbolArray:
        const stockData = await getStocks(uniqueStocks);

        // Add symbols' close and currency data to watchlist data:
        const watchlistWithClose = addCloseData(stockData, watchlist);

        // Get the email message data (an array) using compareData function:
        const messageData = compareData(watchlistWithClose);

        mailerFunction(messageData);

        // // Return stock data as a response, not necessary but Next.js needs a Response:
        return Response.json(JSON.stringify({ result: "successful" }));
    } catch (error: any) {
        console.error("Error in GET request:", error.message);
        return Response.json(error.message);
    }
}
