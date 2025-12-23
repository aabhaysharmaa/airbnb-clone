// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/utils/user";


// Export the NextAuth handler directly
const handler = NextAuth({
  providers: [
    GithubProvider({ clientId: process.env.AUTH_GITHUB_ID!, clientSecret: process.env.AUTH_GITHUB_SECRET! }),
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    CredentialsProvider({
      credentials: { email: { type: "text" }, password: { type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Invalid credentials");
        const user = await getUserByEmail(credentials.email);
        if (!user || !user.hashedPassword) throw new Error("Invalid credentials");
        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isValid) throw new Error("Invalid credentials");
        return user;
      },
    }),
  ],
  pages: { signIn: "/" },
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
});

// ✅ App Router expects named exports GET, POST, etc.
export { handler as GET, handler as POST };
