
import ModalProvider from '@/components/modal-providers'
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
			<Toaster />
			<ModalProvider />
			<NavBar />
			{children}
		</main>
	)
}

export default HomeLayout
