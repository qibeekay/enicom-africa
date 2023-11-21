'use client';
import React, { useRef, useState } from 'react';

const LoanForm1 = () => {
	const [from, setFrom] = useState(['', '']);
	const [to, setTo] = useState(['', '']);

	const fromRefs = [
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
	];
	const toRefs = [
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
	];

	const handleFromChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const value = e.target.value.slice(0, 2); // Limit input to 2 characters
		const newOtp = [...from];
		newOtp[index] = value;
		setFrom(newOtp);

		if (index < 1 && value.length === 2) {
			fromRefs[index + 1]?.current?.focus();
		}
		if (index > 0 && !value) {
			fromRefs[index - 1]?.current?.focus();
		}
	};

	const handleToChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const value = e.target.value.slice(0, 2); // Limit input to 2 characters
		const newOtp = [...to];
		newOtp[index] = value;
		setTo(newOtp);

		if (index < 1 && value.length === 2) {
			toRefs[index + 1]?.current?.focus();
		}
		if (index > 0 && !value) {
			toRefs[index - 1]?.current?.focus();
		}
	};
	return (
		<div className='px-4 md:px-[5rem] py-10'>
			<div>
				{/* form */}
				<form action=''>
					<div className=' md:w-[40rem]'>
						{/* payback Method */}
						<div className=''>
							<div>
								<p className='text-dark font-semibold text-lg'>
									Payback Method
								</p>
								<p>
									(note that your card would be debited at the expiration of the
									loan duration)
								</p>
							</div>
							<div className='flex gap-3 mt-3 flex-wrap sm:flex-nowrap'>
								<input
									type='text'
									placeholder='Card Number'
									className='w-full md:w-[15rem] bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90'
								/>
								<input
									type='text'
									pattern='^(0[1-9]|1[0-2])\/\d{2}$'
									placeholder='MM/YY'
									className=' outline-none placeholder:text-dark/90 bg-greens/10 py-1.5 px-4 w-full xs:w-[6rem] md:w-[8rem] rounded-lg'
								/>
								<input
									type='text'
									placeholder='CVV'
									className='bg-greens/10 px-4 py-1.5 w-full xs:w-[6rem] md:w-[8rem] rounded-lg placeholder:text-dark/90'
								/>
							</div>
						</div>

						{/* Amount */}
						<div className=' mt-7'>
							<p className='text-dark font-semibold text-lg'>
								Amount{' '}
								<span className='font-normal text-base'>
									(How much would you like to loan)
								</span>
							</p>
							<input
								type='text'
								placeholder='N110,000'
								className='w-[12rem] bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-3'
							/>
						</div>

						{/* Duration */}
						<div className='mt-7'>
							<p className='text-dark font-semibold text-lg'>
								Duration{' '}
								<span className='font-normal text-base'>
									(How long for payback)
								</span>
							</p>
							<div className='flex items-center gap-3 flex-wrap'>
								<div className='hover:bg-greens rounded-lg bg-greens/10 py-1.5 px-7 cursor-pointer hover:text-white'>
									<p>3 Months</p>
								</div>
								<div className='hover:bg-greens rounded-lg bg-greens/10 py-1.5 px-7 cursor-pointer hover:text-white'>
									<p>6 Months</p>
								</div>
								<div className='hover:bg-greens rounded-lg bg-greens/10 py-1.5 px-7 cursor-pointer hover:text-white'>
									<p>12 Months</p>
								</div>
							</div>
							<p className='text-greens mt-2'>
								Added 15% interest at the end of the safe lock duration. 0.07%
								daily
							</p>
						</div>

						{/* date */}
						<div className='flex flex-col w-full mt-7'>
							<div className='flex gap-3'>
								<div>
									<p className='text-dark font-semibold text-lg'>From:</p>
									<div className='flex gap-2 xs:gap-4'>
										{from.map((value, index) => (
											<input
												key={index}
												className='mt-2 bg-[#E4FEE3] text-dark outline-none py-2 px-2 rounded-lg w-[3rem] sm:w-[4rem] md:w-[3rem] xs:aspect-square text-center xs:text-xl'
												type='text'
												value={value}
												onChange={(e) => handleFromChange(e, index)}
												ref={fromRefs[index]}
												maxLength={2}
											/>
										))}
									</div>
								</div>

								{/* to */}
								<div className=''>
									<p className='text-dark font-semibold text-lg'>To:</p>
									<div className='flex gap-2 xs:gap-4'>
										{to.map((value, index) => (
											<input
												key={index}
												className='mt-2 bg-[#E4FEE3] text-dark outline-none py-2 px-2 rounded-lg w-[3rem] sm:w-[4rem] md:w-[3rem] xs:aspect-square text-center xs:text-xl'
												type='text'
												value={value}
												onChange={(e) => handleToChange(e, index)}
												ref={toRefs[index]}
												maxLength={2}
											/>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* reason */}
						<div>
							<p>
								Reason for Loan{' '}
								<span>(in 100 words, highlight reasons for loan)</span>
							</p>

							<textarea
								placeholder='Write here... '
								className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-3 h-[8rem]'></textarea>
						</div>
					</div>
					{/* button */}
					<div className='grid justify-end mt-20'>
						{/* submit */}
						<button
							type='submit'
							className='bg-greens text-white py-2 px-10 rounded-lg w-[10rem]'>
							Next
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoanForm1;
