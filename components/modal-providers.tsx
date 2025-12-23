"use client";

import LoginModal from './models/login-modal'
import RegisterModal from './models/register-modal'


const ModalProvider = () => {
  return (
	<>
	<LoginModal/>
	<RegisterModal/>
	</>
  )
}

export default ModalProvider