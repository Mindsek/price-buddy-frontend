import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      console.log("session", session);
      return session;
    },
  },
});
