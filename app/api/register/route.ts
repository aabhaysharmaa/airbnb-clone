import { getUserByEmail } from "@/utils/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";



/**
 * Handles user registration requests and returns appropriate JSON responses.
 *
 * Creates a new user when the provided email is not already registered; if the email
 * exists, responds with a JSON message indicating the user already exists.
 *
 * @returns A JSON HTTP response containing the newly created user object on success,
 * or a JSON object `{ message: "user already exits" }` when the email is already registered.
 */
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
			return NextResponse.json({ message: "user already exits" })
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
