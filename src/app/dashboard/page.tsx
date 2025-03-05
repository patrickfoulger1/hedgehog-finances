import Header from "@/components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";
import { prisma } from "@/lib/db";
import { User } from "@prisma/client";
import Charts from "./charts";
import { Button } from "@/components/ui/button";
export default async function DashboardPage() {
    const session = (await getServerSession(authOptions)) as Session;
    const user = (await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })) as User;

    const stocks = await prisma.watchlist.findMany({
        where: {
            userId: user.id, //will error on anyone who signed up with google
        },
    });

    return (
        <>
            <Header user={user} />
            <h1>Welcome back!</h1>
            <Charts stocks={stocks}></Charts>
        </>
    );
}
