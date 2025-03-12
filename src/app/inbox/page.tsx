import Header from "@/components/header";
import { User, Watchlist } from "@prisma/client";
import { NovuInbox } from "./components/inbox";

import { prisma } from "@/lib/db";
import getSessionUser from "@/utils/getSessionUser";

export default async function Notifications() {
  const user = (await getSessionUser()) as User;

  const watchlist = (await prisma.watchlist.findMany({
    where: {
      userId: user?.id,
    },
  })) as Watchlist[];

  return (
    <div className="p-5">
      <Header user={user} />
      <p>{user.id}</p>
      <NovuInbox user={user} watchlist={watchlist} />
    </div>
  );
}
