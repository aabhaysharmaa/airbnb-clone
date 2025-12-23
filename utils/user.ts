import prisma from "@/libs/prismadb";




export const getUserByEmail = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		return user ;
	} catch (error) {
		throw new Error((error as Error).message)
	}
}
