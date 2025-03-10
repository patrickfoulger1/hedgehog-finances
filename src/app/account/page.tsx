import Header from "../../components/header";
import Main from "./main";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";
import { prisma } from "@/lib/db";
import { User } from "@prisma/client";

export default async function AccountPage() {
  const session = (await getServerSession(authOptions)) as Session;
  const user = (await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  })) as User;

  return (
    <>
      <Header user={user} />
      <Main user={user} />
    </>
  );
}
