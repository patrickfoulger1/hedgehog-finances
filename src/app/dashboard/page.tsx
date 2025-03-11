import Header from "@/components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";
import { prisma } from "@/lib/db";

import Charts from "./charts";
import { User, Watchlist } from ".prisma/client";

export default async function DashboardPage() {
    const session = (await getServerSession(authOptions)) as Session;
    const user = (await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })) as User;

    const watchlist = await prisma.watchlist.findMany({
        where: {
            userId: session.user.id,
        },
    });

    return (
        <>
            <Header user={user} />
            <h1>Welcome back!</h1>
            <Charts stocks={watchlist}></Charts>
        </>
    );
}
