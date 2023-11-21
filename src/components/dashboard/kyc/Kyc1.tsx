'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { IoCloudUpload } from 'react-icons/io5';

const Kyc1 = () => {
	const [otp, setOtp] = useState(['', '', '', '']);
	const [selectedFile, setSelectedFile] = useState<null | File>(null);
	const [selectedFile1, setSelectedFile1] = useState<null | File>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
		const img = e.target.files?.[0];
		if (img) {
			setSelectedFile1(img);
		}
	};

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
		<div className='w-full my-20 font-poppins'>
			<div className='px-4 md:px-[3rem] lg:px-[5rem]'>
				<div className='w-[90%] sm:w-[75%] md:w-auto mx-auto'>
					<form className=''>
						<div className='flex flex-col gap-y-10 md:flex-row justify-between md:gap-x-[10%] lg:gap-x-[20%] relative'>
							{/* input 1 */}
							<div className='w-full'>
								<div className='grid gap-y-10 w-full'>
									{/* BVN */}
									<div className='flex flex-col w-full'>
										<label htmlFor='bvn' className='font-semibold'>
											BVN{' '}
											<span className='text-sm font-normal'>
												(verify with your BVN)
											</span>
										</label>
										<input
											type='text'
											className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
											placeholder='08070678787'
										/>
									</div>

									{/* NIN */}
									<div className='flex flex-col w-full'>
										<label htmlFor='nin' className='font-semibold'>
											NIN{' '}
											<span className='text-sm font-normal'>
												(verify your NIN)
											</span>
										</label>
										<input
											type='text'
											className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
											placeholder='080706787878'
										/>
									</div>

									{/* Phone Number */}
									<div className='flex flex-col w-full'>
										<label htmlFor='phone' className='font-semibold'>
											Phone Number{' '}
											<span className='text-sm font-normal'>
												(enter phone number)
											</span>
										</label>
										<div className='flex flex-col xs:flex-row gap-4 items-baseline justify-center'>
											<input
												type='text'
												className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
												placeholder='0807067878'
											/>
											<div className='w-full grid'>
												<button className='bg-greens text-white py-2 px-6 rounded-lg w-full flex gap-4 items-center justify-center font-medium'>
													Send Code
												</button>
											</div>
										</div>
									</div>

									{/* Verification Code */}
									<div className='flex flex-col w-full'>
										<label htmlFor='verificationCode' className='font-semibold'>
											Verification Code
											<span className='text-sm font-normal'>
												(4 digit code sent to your phone number)
											</span>
										</label>
										<div className='flex gap-4'>
											{otp.map((value, index) => (
												<input
													key={index}
													className='mt-2 bg-greens/10 text-dark outline-none py-2 px-2 rounded-lg w-[3rem] text-center'
													type='text'
													value={value}
													onChange={(e) => handleInputChange(e, index)}
													ref={inputRefs[index]}
													maxLength={1}
												/>
											))}
										</div>
									</div>
									<div>
										<p>
											Not Received Code yet?{' '}
											<Link
												href={'Resend Code'}
												className='font-medium text-greens underline'>
												Resend Code
											</Link>
										</p>
									</div>
								</div>
							</div>

							{/* input 2 */}
							<div className='w-full'>
								<h1 className='font-semibold'>ID Verification</h1>

								<div className='flex flex-col items-end xs:flex-row gap-4 w-full'>
									<div className='w-full'>
										{/* Upload ID */}
										<div className='relative w-full'>
											<label
												title='Click to upload'
												htmlFor='idUpload'
												className='cursor-pointer flex items-center gap-4 hover:before:border-gray-300 group bg-greens/10 before:absolute before:inset-0 w-full rounded-lg px-5 py-2'>
												<div className='relative grid items-center justify-center w-full'>
													<span className='text-base text-center flex items-center justify-center gap-4 w-full text-dark'>
														<IoCloudUpload size='20' className='text-dark/50' />
														Upload ID
													</span>
												</div>
											</label>
											<input
												hidden
												onChange={handleFileChange}
												type='file'
												name='idUpload'
												id='idUpload'
												className='w-full'
											/>
										</div>
										{selectedFile && (
											<div>
												<p>{selectedFile.name}</p>
											</div>
										)}
									</div>

									{/* Take Selfie */}
									<div className='flex flex-col w-full'>
										<div className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full text-center'>
											Take Selfie
										</div>
									</div>
								</div>

								{/* Upload Image */}
								<div className='w-full mt-7'>
									<h1 className='font-semibold'>
										Evidence of Utility Bills{' '}
										<span className='text-sm font-normal'>
											(NEPA bills, School fees, etc)
										</span>
									</h1>
									<div className='relative w-full mt-2'>
										<label
											title='Click to upload'
											htmlFor='imageUpload'
											className='cursor-pointer flex items-center gap-4 hover:before:border-gray-300 group bg-greens/10 before:absolute before:inset-0 w-full rounded-lg px-5 py-2'>
											<div className='relative flex items-center justify-center w-full'>
												<span className='text-base text-center flex items-center justify-center gap-4 w-full text-dark'>
													<IoCloudUpload size='20' className='text-dark/50' />
													Upload Image
												</span>
											</div>
										</label>
										<input
											hidden
											onChange={handleFileChange1}
											type='file'
											name='imageUpload'
											id='imageUpload'
											className='w-full'
										/>
									</div>
									{selectedFile1 && (
										<div>
											<p>{selectedFile1.name}</p>
										</div>
									)}
								</div>

								{/* address */}
								<div className='mt-10'>
									<h1 className='font-semibold'>Address</h1>

									<textarea
										name=''
										className='mt-2 bg-greens/10 text-dark outline-none py-2 h-[6rem] px-5 rounded-lg w-full'
										id=''
										placeholder=''></textarea>
								</div>
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
		</div>
	);
};

export default Kyc1;
