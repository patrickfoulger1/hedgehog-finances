import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { User } from "@prisma/client";
import { prisma } from "@/lib/db";
import { Novu } from "@novu/api";
import { NextAuthOptions } from "next-auth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const secret = process.env.NEXTAUTH_SECRET;
const novu = new Novu({
  secretKey: `${process.env.NOVU_SECRET_KEY}`,
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Handle Auth!
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        if (!user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password + secret,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + "",
          email: user.email,
          user: user.username,
        };
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email || !profile?.name) {
          throw new Error("No profile");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (user) {
          return true;
        }

        const newUser = await prisma.user.create({
          data: {
            email: profile.email,
            username: profile.name,
            password: null,
            image: null,
          },
        });
        const newSubscriber = await novu.subscribers.create({
          firstName: newUser.username,
          subscriberId: newUser.id,
          email: newUser.email,
        });
      }

      return true;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      const u = user as User;
      if (user) {
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },

  secret,
};
