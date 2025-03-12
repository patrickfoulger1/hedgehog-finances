import { prisma } from "@/lib/db";

import { getServerSession, Session } from "next-auth";
import { authOptions } from "./authOptions";
import { User } from "@/lib/types";

export default async function getSessionUser() {
  const session = (await getServerSession(authOptions)) as Session;
  const user = (await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  })) as User;

  return user;
}
