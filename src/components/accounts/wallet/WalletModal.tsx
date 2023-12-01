'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { HiChevronLeft, HiOutlineStar, HiStar } from 'react-icons/hi2';
interface CartDetailsProps {
	handleOpen: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
}
const WalletModal: React.FC<CartDetailsProps> = ({ handleOpen }) => {
	const [rating, setRating] = useState<number>(0);

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};

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
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-1 md:px-8 h-auto overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={handleOpen}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				{/* header */}
				<p className='text-center font-medium text-xl'>Withdraw</p>

				<div>
					<form action='' className='flex flex-col gap-7'>
						{/* amount */}
						<div>
							<label htmlFor='amount'>Amount</label>
							<input
								type='text'
								className='w-full outline-none border border-dark rounded-lg py-2 px-4'
							/>
						</div>

						<div className='flex items-center gap-10'>
							{/* account */}
							<div>
								<label htmlFor='amount'>Account</label>
								<input
									type='text'
									className='w-full outline-none border border-dark rounded-lg py-2 px-4'
								/>
							</div>

							{/* banks */}
							<div>
								<label htmlFor='amount'>Bank</label>
								<input
									type='text'
									className='w-full outline-none border border-dark rounded-lg py-2 px-4'
								/>
							</div>
						</div>

						{/* pin */}
						<div>
							<label className=''>4 Digits Pin</label>
							{/* Verification Code */}
							<div className='flex flex-col items-center justify-center w-full'>
								<div className='flex gap-4 xs:gap-10 justify-between w-full'>
									{otp.map((value, index) => (
										<input
											key={index}
											className='mt-2 bg-[#E4FEE3] text-dark outline-none py-2 px-2 rounded-lg w-[3rem] sm:w-[4rem] md:w-[4rem] xs:aspect-square text-center xs:text-xl'
											type='text'
											value={value}
											onChange={(e) => handleInputChange(e, index)}
											ref={inputRefs[index]}
											maxLength={1}
										/>
									))}
								</div>

								<div className='mt-20 grid items-center w-full justify-end'>
									<button className='bg-greens px-14 py-2 rounded-lg text-white'>
										Next
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default WalletModal;
