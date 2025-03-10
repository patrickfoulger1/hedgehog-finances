"use server";
import { Novu } from "@novu/api";

const novu = new Novu({
    secretKey: `${process.env.NOVU_SECRET_KEY}`,
});

export async function setCreds(tokenId: string, subscriberId: string) {
    const result = await novu.subscribers.credentials.update(
        {
            providerId: "fcm",
            credentials: {
                deviceTokens: [`${tokenId}`],
            },
        },
        `${subscriberId}`
    );
}
