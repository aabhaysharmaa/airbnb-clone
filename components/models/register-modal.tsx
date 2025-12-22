"use client";

import axios from "axios";
import Modal from "./modal"
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Heading from "../heading";
import Input from "../inputs/input";
import toast from "react-hot-toast";
import Button from "../button";


const RegisterModal = () => {
	const { handleSubmit, register, formState: {
		errors
	} } = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: ""
		}
	});
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (data: FieldValues) => {
		try {
			setIsLoading(true)
			axios.post("/api/register", data)
				.then(() => {
					toast.success("Register Successful")
					registerModal.onClose();
				}).catch(() => {
					toast.error("Something went wrong!")
				})
		} catch (error) {
			console.log("Error in onSubmit", error);
		} finally {
			setIsLoading(false)
		}
	}

	const footerContent = (
		<div className="flex flex-col gap-3 mt-4">
			<hr />
			<Button className="" outline label="Continue with Google" icon={FcGoogle} onCLick={() => { }} />
			<Button className="" outline label="Continue with Github" icon={AiFillGithub} onCLick={() => { }} />
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row items-center justify-center gap-2">
					<div className="">Already have an account?</div>
					<div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">Log In</div>
				</div>
			</div>
		</div>
	)


	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to airbnb" subtitle="Create an account!" />
			<Input register={register} id="email" label="Email" type="text" disabled={isLoading} errors={errors} required />
			<Input register={register} id="name" label="Name" type="email" disabled={isLoading} errors={errors} required />
			<Input register={register} id="password" label="Password" type="password" disabled={isLoading} errors={errors} required />
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModal
