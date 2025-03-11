export default async function processPingData() {
    const pingData = []; // Initialize an empty array.
    const response = await fetch("http://localhost:5000/Pinglist"); // Fetch the data from the Watchlist in DB.
    const parsedPinglist = await response.json(); // Parse the Watchlist data.

    parsedPinglist.forEach((user) => {
        // Structure the mail data for each user.
        const userData = {
            username: user.user.name, // Extract username.
            email: user.user.email, // Extract email address.
            stockSymbols: user.stockSymbols.map((stock) => ({ // Map stockSymbols to the required structure.
                symbol: stock.symbol,
                value: stock.value,
                above: stock.above
            }))
        };

        pingData.push(userData); // Push the structured data into the mailData array.
    });

    return pingData; // Return the processed mail data.
}
