import Header from "@/components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import { prisma } from "@/lib/db";
import { User } from "@prisma/client";
export default async function DashboardPage() {
  const session = (await getServerSession(authOptions)) as Session;
  const user = (await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })) as User;

  return (
    <>
      <Header user={user} />
      <h1>Welcome back!</h1>
      <div className="controls">
        <button>Add stock to watchlist</button>
      </div>
      <div className="no-content">
        <p>No stocks added to the watchlist</p>
        {/* watch list client component */}
      </div>
    </>
  );
}
