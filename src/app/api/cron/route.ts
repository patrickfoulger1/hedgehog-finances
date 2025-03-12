"use server";

import mailerFunction from "./mailerFunction";
import getWatchlist from "./getWatchlist";
import processPingData from "./prcessPingData";
import addCloseData from "./addCloseData";
import compareData from "./compareData";
import { getStocks } from "../../../utils/frontendApiConfig";

export async function GET() { // need to call this function GET.

    try {
        // Fetch relevant data from Pinglist table in DB (currently in db.json):
        const stockSymbolArray = await getWatchlist(); // stockSymbolArray is an array of stock symbols.
        // Currently need to run 'json-server --watch db.json --port 5000' in Ubuntu fr this to work.

        // Fetch stock data using stockSymbolArray:
        const stockData = await getStocks(stockSymbolArray);

        // Fetch ping data (for notifications) from DB (currently in db.json):
        const pingData = await processPingData();

        // Add symbols' close and currency data to ping data:
        const pingWithClose = addCloseData(stockData, pingData);

        // Get the email message data (an array) using compareData function:
        const messageData = compareData(pingWithClose);

        // Send an email notifications using messageData array:
        const message = await mailerFunction(messageData);

        // Return stock data as a response, not necessary but Next.js needs a Response:
        return Response.json(stockData);

    } catch (error: any) {
        // console.error("Error in GET request:", error.message);
        return Response.json(error.message);
    }
}