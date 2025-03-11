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

    return (
        <div className="p-5">
            <Header user={user} />
            <p>{user.id}</p>
            <IosInstall />
            <PreferenceTable user={user} />
        </div>
    );
}
