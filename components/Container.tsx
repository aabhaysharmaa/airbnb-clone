"use client";

import { ReactNode } from "react"


interface Props {
	children: ReactNode;


}
const Container = ({ children }: Props) => {
	return (
		<div className="max-w-630 mx-auto xl:px-20 ms:px-10 sm:px-2 px-4">
			{children}
		</div>
	)
}

export default Container
