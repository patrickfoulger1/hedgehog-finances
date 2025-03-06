import Header from "@/components/header";
import { User } from "@prisma/client";
import { NovuInbox } from "./components/inbox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";
import { prisma } from "@/lib/db";
import ServiceWorkerPage from "./components/serviceWorkerPage";

export default async function Notifications() {
    const session = (await getServerSession(authOptions)) as Session;

    const user = (await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })) as User;

    const watchlist = await prisma.watchlist.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="p-5">
            <Header user={user} />

            <NovuInbox watchlist={watchlist} />
            <ServiceWorkerPage />
        </div>
    );
}
