import NavBar from '@/components/navbar/navbar'
import React, { ReactNode } from 'react'


interface Props {
	children: ReactNode
}

const HomeLayout = ({ children }: Props) => {
	return (
		<main>
			<NavBar/>
			{children}
		</main>
	)
}

export default HomeLayout
