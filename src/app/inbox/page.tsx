import { NovuInbox } from "./components/inbox";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import { prisma } from "@/lib/db";

export default async function Notifications() {
    const session = (await getServerSession(authOptions)) as Session;
    const watchlist = await prisma.user
        .findUnique({
            where: {
                email: session.user.email,
            },
        })
        .then((user) => {
            return prisma.watchlist.findMany({
                where: {
                    userId: user?.id,
                },
            });
        });

    return (
        <div className="p-5">
            <h1>Inbox for: {session.user.email}</h1>
            <NovuInbox watchlist={watchlist} />
        </div>
    );
}
