/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
	var cloudinary: unknown
}

interface Props {
	onChange: (value: string) => void;
	value: string
}

const ImageUpload = ({ onChange, value }: Props) => {
	const handleUpload = (result: any) => {
		console.log("Result :", result.image)
		onChange(result.image.secure_url)
	}

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="kyjfyc9y"
			options={{
				maxFiles: 1
			}}
		>
			{({ open }) => {
				return (
					<div className="relative cursor-pointer hover:opacity-70 transition  border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600" onClick={() => open?.()}>
						<TbPhotoPlus size={50} />
						<div className="font-semibold text-lg">
							click to upload
						</div>
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image alt="upload" fill style={{ objectFit: 'cover' }} src={value} />
							</div>
						)}
					</div>
				)
			}}
		</CldUploadWidget>
	)
}

export default ImageUpload

