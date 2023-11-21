'use client';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface InputProps {
	label: string;
	id: string;
	labelId: string;
	icon1?: string;
	icon2?: string;
	type: string;
}

const FormProps: React.FC<InputProps> = ({
	label,
	id,
	labelId,
	icon1,
	icon2,
	type,
}) => {
	useEffect(() => {
		const inputElement = document.getElementById(id);
		const labelElement = document.getElementById(labelId);

		const handleClick = () => {
			labelElement?.classList.add('text-greens');
		};

		const handleClickOutside = (event: any) => {
			if (inputElement && !inputElement.contains(event.target)) {
				labelElement?.classList.remove('text-greens');
			}
		};

		inputElement?.addEventListener('click', handleClick);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			// Remove the event listeners when the component unmounts
			inputElement?.removeEventListener('click', handleClick);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<div className='grid gap-1 w-full'>
			<label
				htmlFor={id}
				id={labelId}
				className='flex items-center gap-2 text-xs sm:text-base'>
				{label}
				{icon1 && (
					<Image src={`/${icon1}`} width={20} height={20} alt='password' />
				)}
			</label>
			<div className='w-full relative'>
				<input
					className='border text-xs sm:text-base border-dark/50 py-2 px-5 rounded-lg outline-greens w-full text-greens placeholder:text-dark/50'
					type={type}
					id={id}
					name={id}
					placeholder={`Type here`}
				/>
				{icon2 && (
					<div className='absolute right-2 top-[50%] -translate-y-[50%]'>
						<Image src={`/${icon2}`} width={20} height={20} alt='password' />
					</div>
				)}
			</div>
		</div>
	);
};

export default FormProps;
