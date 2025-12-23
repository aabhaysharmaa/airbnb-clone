"use client";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./modal";
import Input from "../inputs/input";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../button";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "@/hooks/useRegisterModal";
import Heading from "../heading";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const handleRegister = (data: z.infer<typeof LoginSchema>) => {
		try {
			setIsLoading(true)
			signIn("credentials", { ...data, redirect: false }).then((callback) => {
				if (callback?.ok) {
					toast.success("Logged In")
					router.refresh();
					loginModal.onClose();
				}
				if (callback?.error) {
					toast.error("Something went Wrong!")
				}
			})
		} catch {
			toast.error("Something Went Wrong")
		} finally {
			setIsLoading(false)
		}
	}

	const social = (provider: "google" | "github") => {
		signIn(provider)
	}
	const toggleModal = () => {
		if (!registerModal.isOpen) {
			loginModal.onClose();
			registerModal.onOpen();
		}
	}

	const bodyContent = (
		<div className="flex flex-col  gap-4">
			<Heading title="Welcome Back to Airbnb" subtitle="Login to your account!" />
			<Input type="email" label="Email" required disabled={isLoading} errors={errors} register={register} id="email" />
			<Input type="password" label="Password" required disabled={isLoading} errors={errors} register={register} id="password" />
		</div>
	)

	const footerContent = (
		<div className="flex flex-col gap-3 mt-4">
			<hr />
			<Button outline icon={FcGoogle} label="Continue with Google" onCLick={() => social("google")} />
			<Button outline icon={AiFillGithub} label="Continue with Google" onCLick={() => social("github")} />
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