"use client";

import clsx from "clsx";
import { IconType } from "react-icons";

interface ButtonProps {
	label: string;
	onCLick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean
	icon?: IconType
	className?: string

}

const Button = ({
	label,
	onCLick,
	disabled,
	outline,
	small,
	className,
	icon: Icon
}: ButtonProps) => {
	return (
		<button disabled={disabled} onClick={onCLick} className={clsx("relative disabled:opacity-70 disabled:cursor-not cursor-pointer allowed rounded-lg hover:opacity-80 transition w-full", outline ? "bg-white border-black text-black" : "bg-rose-500 text-white border-rose-500",
			small ? "py-1 text-sm font-light border" : "py-3 text-md font-semibold border-2" ,className
		)}>
			{Icon && (
				<Icon className="absolute left-4 top-3 size-5" />
			)}
			{label}
		</button>
	)
}

export default Button
