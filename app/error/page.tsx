"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Error = () => {
	const params = useSearchParams();
	const errorMessage = params.get("error");
	return (
		<div className='flex justify-center items-center w-full h-full bg-rose-500'>
			<div className=" font-semibold text-center  text-white">
				<h1 className="text-4xl my-3">{errorMessage} Error</h1>
				<p className="hover:underline cursor-pointer text-xl">
					<Link href="/">Back to login</Link>
				</p>
			</div>
		</div>
	)
}

export default Error
