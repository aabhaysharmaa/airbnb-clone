
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.json({ message: "No current User found" })
	try {
		const body = await req.json()
		if (!body) {
			return NextResponse.json({ message: "Body is required" })
		}
		const {
			category,
			location,
			guestCount,
			roomCount,
			bathroomCount,
			imageSrc,
			price,
			title,
			description
		} = body;
		const listing = await prisma.listing.create({
			data: {
				title,
				description,
				imageSrc,
				category,
				roomCount,
				bathroomCount,
				guestCount,
				locationValue: location.value,
				price: parseInt(price, 10),
				userId: currentUser.id
			}
		})
		return NextResponse.json(listing)
	} catch (error) {
		console.log("Error in Listings", error);
		return NextResponse.error()
	}
} 