"use client"

import { LoginSchema } from "@/schemas";
import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import * as z from "zod";

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	required?: boolean;
	formatPrice?: boolean
	register: UseFormRegister<z.infer<typeof LoginSchema>>
	errors: FieldErrors
}

const Input = ({
	id,
	label,
	type,
	disabled,
	register,
	required,
	errors,
	formatPrice

}: InputProps) => {
	return (
		<div className="w-full relative ">
			{formatPrice && (
				<BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />
			)}
			<input type={type} id={id} disabled={disabled} {...register(id, { required })} placeholder="" className={clsx("peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70", formatPrice ? "pl-9" : "pl-4", errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black")} />
			<label className={clsx("absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4", formatPrice ? "left-9" : "left-4", errors[id] ? "text-rose-500" : "text-zinc-400")}>
				{label}
			</label>
		</div>
	)
}

export default Input
