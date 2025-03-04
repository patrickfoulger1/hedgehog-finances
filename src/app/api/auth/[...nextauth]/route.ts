import { authOptions } from "@/utils/authOptions";
import NextAuth, { type NextAuthOptions } from "next-auth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const secret = process.env.NEXTAUTH_SECRET;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
