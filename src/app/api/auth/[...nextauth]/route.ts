import { authOptions } from "@/utils/authOptions";
import NextAuth, { type NextAuthOptions } from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
