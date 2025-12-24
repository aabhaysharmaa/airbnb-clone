"use client"; 
import clsx from "clsx";
import { IconType } from "react-icons";

interface Props {
	onClick: (value: string) => void
	label: string
	icon: IconType
	Selected?: boolean
}

const CategoryInput = ({ onClick, label, icon: Icon, Selected }: Props) => {
	return (
		<div className={clsx("rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer", Selected ? "border-black" : "border-neutral-200")} onClick={() => onClick(label)}>
			<Icon size={30} />
			<div className="font-semibold">
				{label}
			</div>
		</div>
	)
}

export default CategoryInput
