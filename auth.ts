import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./utils/user";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt"
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				const validateFields = LoginSchema.safeParse(credentials);
				if (!validateFields.success) {
					throw new Error("Invalid Credentials")
				}
				const { email, password } = validateFields.data
				const existingUser = await getUserByEmail(email as string)
				if (!existingUser) throw new Error("No user exists")
				const isCorrectPassword = await bcrypt.compare(password, existingUser.hashedPassword as string);
				if (!isCorrectPassword) throw new Error("Invalid Credentials")
				return existingUser;
			}

		}),
		Github({
			clientId: process.env.AUTH_GITHUB_ID as string,
			clientSecret: process.env.AUTH_GITHUB_SECRET as string
		}),
		Google({
			clientId : process.env.GOOGLE_CLIENT_ID,
			clientSecret : process.env.GOOGLE_CLIENT_SECRET
		})
	],
}
)