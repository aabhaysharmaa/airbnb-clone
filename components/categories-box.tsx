/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "querystring";
import { IconType } from "react-icons";
interface Props {
	icon: IconType
	label: string
	selected?: boolean
}

const CategoriesBox = ({ icon: Icon, label, selected }: Props) => {
const router = useRouter();
	const params = useSearchParams();
	const handleClick = useCallback(() => {
		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}
		console.log(currentQuery);
		console.log(params)
		const updatedQuery: any = {
			...currentQuery,
			category: label,
		};
		console.log(updatedQuery)

		if (params?.get("category") === label) {
			delete updatedQuery.category;
		}

		const queryString = qs.stringify(updatedQuery);
		console.log(queryString)
		const url = queryString ? `/?${queryString}` : "/";

		router.push(url);
	}, [params, label, router]);

	return (
		<div onClick={handleClick}  className={clsx("flex  text-neutral-500 transition  flex-col items-center justify-center cursor-pointer gap-2  border-b-2 hover:text-neutral-800", selected ? "border-b-neutral-800 text-neutral-800" : ' text-neutral-500 border-transparent')}>
			<Icon size={26} />
			<div className="text-sm font-normal">
				{label}
			</div>
		</div>
	)
}

export default CategoriesBox
