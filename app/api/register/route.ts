import { getUserByEmail } from "@/utils/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
	try {
		const body = await req.json();
		const {
			name,
			email,
			password
		} = body;
		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			return NextResponse.json({ message: "user already exits" },{status : 400})
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await prisma?.user.create({
			data: {
				name,
				email,
				hashedPassword
			}
		})
		return NextResponse.json(newUser)
	} catch (error) {
		console.log("Error in Register Post Route : ", error)

	}
}

