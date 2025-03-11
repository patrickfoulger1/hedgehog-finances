import { triggerWorkflow } from "@/serverActions";

// Iterate through the users in messageData array and sends inididual email messages:
export default async function mailerFunction(messageData) {
    for (const user of messageData) {
        // Iterate through each user in messageData
        console.log(user.messages);
        triggerWorkflow(user.userId, "Stock Update", user.messages, "", "subscription");
    }
}
