import Header from "@/components/header";
import { User, Watchlist, ContactPreferences } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";
import { getUserContactPrefs } from "@/serverActions";
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

  const prefObject = getUserContactPrefs(user.id).then((prefs) => {
    const finalObj = {};
    prefs.forEach((pref) => {
      for (const [key, value] of Object.entries(pref)) {
        const concatKey = [pref.stockSymbol, key].join("-");
        if (["push", "email", "inApp"].includes(key)) {
          finalObj[concatKey] = value;
        }
      }
    });

    return finalObj;
  });

  return (
    <div className="p-5">
      <Header user={user} />
      <p>{user.id}</p>
      <IosInstall />
      <PreferenceTable user={user} prefObject={prefObject} />
    </div>
  );
}
