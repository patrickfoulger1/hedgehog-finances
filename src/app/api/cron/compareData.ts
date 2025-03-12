import { prisma } from "@/lib/db";

const getDate = (createdAt) => {
    return new Date(createdAt).toUTCString().slice(0, 22);
};

export default async function compareData(watchlistWithClose) {
    // Initialise an empty array that will cotnain all email message data:
    const contactPref = await prisma.contactPreferences.findMany();

    const messageData = [];
    watchlistWithClose.forEach((entry) => {
        // Start each message:
        // let message = `Here is an update on your stock watchlist:\n\n`;
        let message = `${getDate(Date.now())}: ${entry.stockSymbol} is now at: ${entry.close} ${entry.currency}`;
        entry.message = message;

        contactPref.forEach((pref) => {
            if (entry.userId === pref.userId && entry.stockSymbol === pref.stockSymbol) {
                entry.email = pref.email;
                entry.inApp = pref.inApp;
                entry.push = pref.push;
            }
        });
    });
    // console.log(watchlistWithClose);
    // let userIds = watchlistWithClose.map((entry) => {
    //     return entry.userId;
    // });

    // userIds = new Set(userIds);

    // userIds.forEach((id) => {
    //     const userMessages = watchlistWithClose.filter((user) => {
    //         return user.userId === id;
    //     });
    //     const reducedMessages = userMessages.reduce((a, b) => {
    //         return a + (b.message + ". ");
    //     }, "");

    //     messageData.push({ userId: id, messages: reducedMessages });
    // });

    // //[({ userid1: "message1 \n message2" }, { userid2: "message1 \n message2" })];

    // // const userMessage = watchlistWithClose.filter((key)=> {key.userId === })
    // // message += `\nBest regards,\n\nHedgehog finances`; // end the message

    // // messageData.push({ email: entry.email, message: message }); // push the message into messageData array

    return watchlistWithClose;
}
