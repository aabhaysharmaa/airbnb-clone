import { SafeUser } from "@/types"
import Container from "../Container"
import Logo from "./logo"
import Search from "./search"
import UserMenu from "./user-menu"

interface Props {
	currentUser?: SafeUser
}


const NavBar = ({ currentUser }: Props) => {
	return (
		<nav className="fixed w-full  z-10 shadow-sm">
			<div className="border-b">
				<Container>
					<div className="flex max-sm:py-5 max-md:py-5  flex-row items-center justify-between gap-3 md:gap-0 ">
						<Logo />
						<Search /> 
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
		</nav>
	)
}

export default NavBar

