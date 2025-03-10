import Header from "@/components/header";
import { User, Watchlist, ContactPreferences } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";
import { prisma } from "@/lib/db";
import IosInstall from "./components/iOSInstall";
import PreferenceTable from "./components/preferenceTable";

export default async function Notifications() {
    const session = (await getServerSession(authOptions)) as Session;

    const user = (await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })) as User;

    const watchlist = (await prisma.watchlist.findMany({
        where: {
            userId: user?.id,
        },
    })) as Watchlist[];

    const contactPreferences = (await prisma.contactPreferences.findMany({
        where: {
            userId: user?.id,
        },
    })) as ContactPreferences[];

    return (
        <div className="p-5">
            <Header user={user} />
            <p>{user.id}</p>
            <IosInstall />
            <PreferenceTable contactprefs={contactPreferences} />
        </div>
    );
}
