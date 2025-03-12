import { triggerWorkflow } from "@/serverActions";

// Iterate through the users in messageData array and sends inididual email messages:
export default async function mailerFunction(messageData) {
    for (const user of messageData) {
        // Iterate through each user in messageData
        const prefs = { push: `${user.push}`, email: `${user.email}`, inApp: `${user.inApp}` };
        triggerWorkflow(user.userId, `Stock Update - ${user.stockSymbol}`, user.message, user.stockSymbol, "subscription", prefs);
    }
}
