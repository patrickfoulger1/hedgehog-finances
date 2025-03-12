import Header from "@/components/header";
import { User } from "@prisma/client";
import { getUserContactPrefs } from "@/serverActions";
import IosInstall from "./components/iOSInstall";
import PreferenceTable from "./components/preferenceTable";
import getSessionUser from "@/utils/getSessionUser";

export default async function Notifications() {
  const user = (await getSessionUser()) as User;

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
      <IosInstall />
      <PreferenceTable user={user} prefObject={prefObject} />
    </div>
  );
}
