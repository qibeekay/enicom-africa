'use client';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface InputProps {
	label: string;
	id: string;
	labelId: string;
	icon1?: string;
	icon2?: string;
	type: string;
	name: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	showPassword?: boolean;
	togglePassword?: () => void;
}

const FormProps: React.FC<InputProps> = ({
	label,
	id,
	labelId,
	icon1,
	icon2,
	type,
	value,
	onChange,
	name,
	showPassword = false,
	togglePassword,
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

	const inputType = showPassword ? 'text' : type;
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
					type={inputType}
					id={id}
					name={name}
					placeholder={`Type here`}
					value={value}
					onChange={onChange}
				/>
				{icon2 && togglePassword && (
					<div
						onClick={togglePassword}
						className='absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer'>
						<Image src={`/${icon2}`} width={20} height={20} alt='password' />
					</div>
				)}
			</div>
		</div>
	);
};

export default FormProps;
