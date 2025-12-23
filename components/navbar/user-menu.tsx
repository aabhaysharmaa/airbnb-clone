"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar";
import { useCallback, useState } from "react";
import MenuItem from "./menu-item";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";

interface Props {
	currentUser?: SafeUser
}

const UserMenu = ({ currentUser }: Props) => {
	console.log({currentUser})
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value)
	}, [])
	return (
		<div className='relative'>
			<div className="flex flex-row items-center gap-3">
				<div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" onClick={() => { }}>
					Airbnb your home
				</div>
				<div className="p-4 md:px-2 md:py-1 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition" onClick={toggleOpen}>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.user?.image as string} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40-vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">

					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem label="My trips" onClick={loginModal.onOpen} />
								<MenuItem label="My favorites" onClick={loginModal.onOpen} />
								<MenuItem label="My reservation" onClick={loginModal.onOpen} />
								<MenuItem label="My properties" onClick={loginModal.onOpen} />
								<MenuItem label="Airbnb my Home" onClick={loginModal.onOpen} />
								<MenuItem label="Logout" onClick={() => signOut()} />
							</>
						) : (
							<>
								<MenuItem label="Login" onClick={loginModal.onOpen} />
								<MenuItem label="Sign up" onClick={registerModal.onOpen} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
