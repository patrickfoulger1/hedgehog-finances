import { PrismaClient, Watchlist } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getWatchlist() {
    const watchlist = await prisma.watchlist.findMany();

    // const stockSymbolArray: string[] = []; // Initialize an empty stock symbol array.
    // const response = await fetch("http://localhost:5000/Pinglist"); // Fetch the data from the Watchlist in DB.
    // const parsedPinglist = await response.json(); // Parse the Watchlist data.

    // parsedPinglist.forEach((user) => {
    //     user.stockSymbols.forEach((stock) => {
    //         // Iterate through stockSymbols array of each user.
    //         if (!stockSymbolArray.includes(stock.symbol)) {
    //             // Check if the symbol is already in the array.
    //             stockSymbolArray.push(stock.symbol); // Push the symbol to the array.
    //         }
    //     });
    // });

    return watchlist;
}
