import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb"
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        const exitingUser = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!exitingUser || !exitingUser.hashedPassword) {
          throw new Error("Invalid Credentials")
        }
        const isCorrectPassword = await bcrypt.compare(credentials.password, exitingUser.hashedPassword);
        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials")
        }
        return exitingUser;
      }
    })
  ],
  pages: {
    signIn: "/"
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "database"
  }
})

