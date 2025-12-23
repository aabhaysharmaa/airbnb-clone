"use client";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./modal";
import Input from "../inputs/input";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../button";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/hooks/useRegisterModal";
import Heading from "../heading";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const LoginModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const handleRegister = (data: FieldValues) => {
		setIsLoading(true)
		signIn("credentials", data).then(() => {
			toast.success("Logged in")
		}).catch(() => {
			toast.error("Something went Wrong")
		}).finally(() => {
			setIsLoading(false)
		})
	}

	const toggleModal = () => {
		if (!registerModal.isOpen) {
			loginModal.onClose();
			registerModal.onOpen();
		}
	}

	const bodyContent = (
		<div className="flex flex-col  gap-4">
			<Heading title="Welcome Back to Airbnb" subtitle="continue" />
			<Input type="email" label="Email" required disabled={isLoading} errors={errors} register={register} id="email" />
			<Input type="password" label="Password" required disabled={isLoading} errors={errors} register={register} id="password" />
		</div>
	)

	const footerContent = (
		<div className="flex flex-col gap-3 mt-4">
			<hr />
			<Button outline icon={FcGoogle} label="Continue with Google" onCLick={() => { }} />
			<Button outline icon={AiFillGithub} label="Continue with Google" onCLick={() => { }} />
			<div className="flex flex-row items-center justify-center my-3 gap-1">
				<div className="text-base text-neutral-400">Don&apos;t have an account?</div>
				<div onClick={toggleModal} className="text-neutral-900 cursor-pointer hover:underline">Register</div>
			</div>
		</div>
	)

	return (
		<Modal
			onSubmit={handleSubmit(handleRegister)}
			actionLabel="Log in"
			title="Log In"
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			onClose={loginModal.onClose}
			body={bodyContent}
			footer={footerContent} />
	)
}

export default LoginModal