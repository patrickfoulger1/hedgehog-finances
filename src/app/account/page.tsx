import Header from "../../components/header";
import Main from "./main";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";
import { prisma } from "@/lib/db";
import { User } from "@prisma/client";
import getSessionUser from "@/utils/getSessionUser";

export default async function AccountPage() {
  const user = (await getSessionUser()) as User;

  return (
    <>
      <Header user={user} />
      <Main user={user} />
    </>
  );
}
