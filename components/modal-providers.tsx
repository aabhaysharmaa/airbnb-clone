"use client";

import LoginModal from './models/login-modal'
import RegisterModal from './models/register-modal'
import  RentModal from './models/rent-modal';


const ModalProvider = () => {
  return (
	<>
	<LoginModal/>
	<RentModal/>
	<RegisterModal/>
	</>
  )
}

export default ModalProvider