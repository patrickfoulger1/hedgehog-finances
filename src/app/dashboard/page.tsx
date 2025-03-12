import Header from "@/components/header";
import { prisma } from "@/lib/db";

import Charts from "./charts";
import { User, Watchlist } from ".prisma/client";
import getSessionUser from "@/utils/getSessionUser";

export default async function DashboardPage() {
  const user = (await getSessionUser()) as User;

  const watchlist = (await prisma.watchlist.findMany({
    where: {
      userId: user.id,
    },
  })) as Watchlist[];

  return (
    <>
      <Header user={user} />
      <h1>Welcome back!</h1>
      <Charts stocks={watchlist}></Charts>
    </>
  );
}
