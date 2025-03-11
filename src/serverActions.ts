//write functions you want to happen in client components on the server here
"use server";
import { PrismaClient, User, Watchlist } from "@prisma/client";
import { hash } from "bcrypt";
import { Novu } from "@novu/api";
import { isStockInWatchlist } from "./utils/utils";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
const novu = new Novu({
    secretKey: `${process.env.NOVU_SECRET_KEY}`,
});

export const example = async () => {
    console.log("I would run on server");
};

const concatNames = (first: string, last: string) => {
    const lowerFirst = first.toLowerCase();
    const lowerLast = last.toLowerCase();
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return capitalizeFirstLetter(lowerFirst) + " " + capitalizeFirstLetter(lowerLast);
};

export const handleSignup = async (formData: FormData) => {
    try {
        const formEmail = formData.get("email") as string;
        const password = formData.get("password") as string;
        const firstName = formData.get("first-name") as string;
        const lastName = formData.get("last-name") as string;
        const username = concatNames(firstName, lastName);

        // check if user exists
        const isUser = await prisma.user.findUnique({
            where: { email: formEmail },
        });

        // if user already exists return error
        if (isUser) {
            return { error: "Email already in use" };
        }

        const hashedPassword = await hash(password + process.env.NEXTAUTH_SECRET, 12);

        const newUser = await prisma.user.create({
            data: {
                email: formEmail,
                username,
                password: hashedPassword,
            },
        });
        const newSubscriber = await novu.subscribers.create({
            firstName: newUser.username,
            subscriberId: newUser.id,
            email: newUser.email,
        });

        return { newUser };
    } catch (error) {
        console.log(error);
        return { error: "An error occurred, please try again later." };
    }
};

export const updateProfileImage = async (url: string, user: User) => {
    await prisma.user.update({
        where: { email: user.email },
        data: { image: url },
    });
};

// it returns true if stockSymbol is present in watchlist
export const checkUserWatchlist = async (userId: string, stockSymbol: string) => {
    const watchlist = (await prisma.watchlist.findMany({
        where: { userId },
    })) as Watchlist[];
    const isStock = isStockInWatchlist(watchlist, stockSymbol);
    if (isStock.length !== 0) {
        return true;
    } else {
        return false;
    }
};

// not exporting function as it's only called down below in updateWatchlist
const createContactPrefs = async (userId: string, stockSymbol: string) => {
    const push = false;
    const email = false;
    const inApp = true;
    try {
        await prisma.contactPreferences.create({
            data: {
                userId,
                stockSymbol,
                push,
                email,
                inApp
            }
        })
    } catch (error) {
        console.log(`Error creating contact preferences.`);
        throw error;
    }
}

export const updateWatchlist = async (userId: string, stockSymbol: string, buttonState: boolean) => {
    if (buttonState) {
        // remove stock from watchlist
        await prisma.watchlist.deleteMany({
            where: {
                userId,
                stockSymbol,
            },
        });
    } else {
        try {
            await prisma.watchlist.create({
                data: {
                    userId,
                    stockSymbol,
                },
            });
            await createContactPrefs(userId, stockSymbol)
        } catch (error) {
        }
    }
};

export const revalidateDashboard = async () => {
    revalidatePath("/dashboard");
};

export const unreadCount = async (subscriberId) => {
    return novu.subscribers.notifications
        .unseenCount({
            subscriberId: subscriberId,
        })
        .then((r) => {
            console.log("unread:", r.result.count);
            return r.result.count;
        });
};

export async function updateSubscriberToken(token: string, subscriberId: string) {
    await novu.subscribers.credentials.update({ providerId: "fcm", credentials: { deviceTokens: [token] } }, subscriberId);
}

export async function appendSubscriberToken(token: string, subscriberId: string) {
    await novu.subscribers.credentials.append({ providerId: "fcm", credentials: { deviceTokens: [token] } }, subscriberId);
}

export async function getUserContactPrefs(userId: string) {
    return await prisma.contactPreferences.findMany({
        where: {
            userId: userId,
        },
    });
}

export const updateContactPrefs = async (userId: string, stockSymbol: string, channel: string, state: boolean) => {
    await prisma.contactPreferences.updateMany({
        where: {
            userId: userId,
            stockSymbol: stockSymbol,
        },
        data: {
            [channel]: state,
        },
    });
};

export const triggerWorkflow = async (subscriberId: string, title: string, body: string, stock: string, workflowId: string) => {
    await novu
        .trigger({ workflowId: workflowId, payload: { title: title, body: body, stock: stock }, to: { subscriberId: subscriberId } })
        .then((results) => {
            return { result: "success" };
        })
        .catch((err) => {
            return { result: "failed", detail: err };
        });
};
