import { auth } from "@/auth";
import prisma from "@/libs/prismadb";


const getCurrentUser = async () => {
	const session = await auth();
	const existingUser = await prisma.user.findFirst({ where: { email: session?.user?.email } })
	if (!existingUser) return null
	return existingUser
}
export default getCurrentUser