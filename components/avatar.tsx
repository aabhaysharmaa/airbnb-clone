"use client";

import Image from 'next/image'


const Avatar = ({ src }: { src: string | null | undefined }) => {
	return (
		<Image alt='avatar' className='rounded-full' height="30" width="30" src={src || "/images/placeholder.png"} />
	)
}

export default Avatar
