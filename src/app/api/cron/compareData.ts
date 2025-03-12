export default function compareData(pingWithClose) {
    // Initialise an empty array that will cotnain all email message data:
    const messageData = [];

    pingWithClose.forEach(user => {
        // Start each message:
        let message = `Hello ${user.username},\n\nHere is an update on your stock watchlist:\n\n`;

        user.stockSymbols.forEach(symbol => {
            if (symbol.above && symbol.value < symbol.close) {
                message += `- ${symbol.symbol} is currently above ${symbol.value}. Now at ${symbol.close} ${symbol.currency || 'N/A'}.\n`;
            } else if (!symbol.above && symbol.value > symbol.close) {
                message += `- ${symbol.symbol} is currently below ${symbol.value}. Now at ${symbol.close} ${symbol.currency || 'N/A'}.\n`;
            }
        });

        message += `\nBest regards,\n\nHedgehog finances`; // end the message

        messageData.push({ email: user.email, message: message }); // push the message into messageData array
    });

    return messageData;
}
