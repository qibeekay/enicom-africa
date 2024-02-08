'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { IoCloudUpload } from 'react-icons/io5';

const Kyc2 = () => {
	const [otp, setOtp] = useState(['', '', '', '']);
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
									{/* Name */}
									<div className='flex flex-col w-full'>
										<label htmlFor='name' className='font-semibold'>
											Name
											<span className='text-sm font-normal'>
												(Enter Guarantor&apos;s full name)
											</span>
										</label>
										<input
											type='text'
											className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
											placeholder='John Doe'
										/>
									</div>

									{/* email */}
									<div className='flex flex-col w-full'>
										<label htmlFor='email' className='font-semibold'>
											Email address
											<span className='text-sm font-normal'>
												(Enter Email Address)
											</span>
										</label>
										<input
											type='email'
											className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
											placeholder='user@example.com'
										/>
									</div>

									{/* phone */}
									<div className='flex flex-col w-full'>
										<label htmlFor='phone' className='font-semibold'>
											Phone Number{' '}
											<span className='text-sm font-normal'>
												(Enter phone number)
											</span>
										</label>
										<input
											type='text'
											className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
											placeholder='098765321'
										/>
									</div>

									{/* bvn */}
									<div className='flex flex-col w-full'>
										<label htmlFor='bvn' className='font-semibold'>
											Guarantor&apos;s BVN
											<span className='text-sm font-normal'>
												(Enter Guarantor&apos;s 12 digit BVN)
											</span>
										</label>
										<input
											type='email'
											className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
											placeholder='123456789012'
										/>
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
								className='bg-greens text-white py-2 px-10 rounded-lg w-[16rem]'>
								{isLoading ? 'Verifying...' : 'Complete Verification'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Kyc2;
