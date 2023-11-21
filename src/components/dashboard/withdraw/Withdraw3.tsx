'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

const Withdraw3 = () => {
	const [otp, setOtp] = useState(['', '', '', '']);

	const inputRefs = [
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
	];

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const value = e.target.value;
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (index < 3 && value) {
			inputRefs[index + 1]?.current?.focus();
		}
		if (index > 0 && !value) {
			inputRefs[index - 1]?.current?.focus();
		}
	};
	return (
		<div className='w-full my-32'>
			<div>
				<form action='' className='relative'>
					<h1 className='font-semibold absolute left-[20%] -top-10'>
						Enter Your 4 - Digits OTP
					</h1>
					{/* Verification Code */}
					<div className='flex flex-col items-center justify-center w-full'>
						<div className='flex gap-4 xs:gap-10'>
							{otp.map((value, index) => (
								<input
									key={index}
									className='mt-2 bg-[#E4FEE3] text-dark outline-none py-2 px-2 rounded-lg w-[3rem] sm:w-[4rem] md:w-[6rem] xs:aspect-square text-center xs:text-xl'
									type='text'
									value={value}
									onChange={(e) => handleInputChange(e, index)}
									ref={inputRefs[index]}
									maxLength={1}
								/>
							))}
						</div>

						<div className='mt-20 grid items-center justify-center'>
							<Link
								href={''}
								className='bg-greens px-14 py-2 rounded-lg text-white'>
								Next
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Withdraw3;
