// import { getCurrentUser } from '@/actions/getCurrentUser'
// import getCurrentUser from '@/actions/getCurrentUser'
"use client" ;
import ModalProvider from '@/components/modal-providers'
import NavBar from '@/components/navbar/navbar'
import { useSession } from 'next-auth/react'


import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'


interface Props {
	children: ReactNode
}

const HomeLayout =  ({ children }: Props) => {
	const {data : currentUser} = useSession();
	return (
		<main>
			<Toaster />
			<ModalProvider />
			<NavBar  currentUser={currentUser} />

			{children}
		</main>

	)
}

export default HomeLayout
