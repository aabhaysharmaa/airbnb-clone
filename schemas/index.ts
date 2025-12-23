import * as z from "zod";

export const RegisterTypes = z.object({
	name: z.string().min(5, "name must have atleast 5 character"),
	email: z.string().min(5, "email cannot be empty"),
	password: z.string().min(5, "password field is required"),
})


export const LoginSchema = z.object({
	email: z.string().min(5, "email cannot be empty"),
	password: z.string().min(5, "password field is required"),
})