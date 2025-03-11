export default function compareData(watchlistWithClose) {
    // Initialise an empty array that will cotnain all email message data:
    const messageData = [];
    watchlistWithClose.forEach((entry) => {
        // Start each message:
        // let message = `Here is an update on your stock watchlist:\n\n`;
        let message = `${entry.stockSymbol} is now at: ${entry.close} ${entry.currency}`;
        entry.message = message;
    });

    let userIds = watchlistWithClose.map((entry) => {
        return entry.userId;
    });

    userIds = new Set(userIds);

    userIds.forEach((id) => {
        const userMessages = watchlistWithClose.filter((user) => {
            return user.userId === id;
        });
        const reducedMessages = userMessages.reduce((a, b) => {
            return a + (b.message + ". ");
        }, "");

        messageData.push({ userId: id, messages: reducedMessages });
    });

    //[({ userid1: "message1 \n message2" }, { userid2: "message1 \n message2" })];

    // const userMessage = watchlistWithClose.filter((key)=> {key.userId === })
    // message += `\nBest regards,\n\nHedgehog finances`; // end the message

    // messageData.push({ email: entry.email, message: message }); // push the message into messageData array

    return messageData;
}
