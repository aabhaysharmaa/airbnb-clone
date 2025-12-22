
import Modal from '@/components/models/modal'
import RegisterModal from '@/components/models/register-modal'
import NavBar from '@/components/navbar/navbar'
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'


interface Props {
	children: ReactNode
}

const HomeLayout = ({ children }: Props) => {
	return (
		<main>
			<Toaster/>
           <RegisterModal/>
			<NavBar />
			{children}
		</main>
	)
}

export default HomeLayout
