import { PrismaClient } from "./generated/prisma/client";

declare global {
	var prisma: PrismaClient | undefined
}


const client = globalThis.prisma || new PrismaClient({
	accelerateUrl: process.env.PRISMA_ACCELERATE_URL || '', // must provide
	log: ['info', 'query', 'warn', 'error'], // optional
});
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client; 