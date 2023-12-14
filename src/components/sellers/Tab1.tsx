'use client';
import React, { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { HiChevronDown } from 'react-icons/hi2';

const Tab1 = () => {
	const [file, setFile] = useState<File | null>(null);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		// Assuming you are only handling one file
		const selectedFile = acceptedFiles[0];
		setFile(selectedFile);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: ['image/*'] as any, // Specify the accepted file types
		maxFiles: 1, // Limit the number of files to 1
	});
	return (
		<div className='font-poppins text-dark'>
			<div>
				<div>
					<h1>Personal Information</h1>

					<form action='' className='mt-5'>
						<div className='flex flex-col gap-6'>
							{/* fullname */}
							<div>
								<label htmlFor='amount'>Full Name</label>
								<input
									type='text'
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									placeholder='Type here'
								/>
							</div>

							{/* Email Address */}
							<div>
								<label htmlFor='amount'>Email Address</label>
								<input
									type='text'
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									placeholder='Type here'
								/>
							</div>

							{/* Home Address */}
							<div>
								<label htmlFor='amount'>Home Address</label>
								<input
									type='text'
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									placeholder='Type here'
								/>
							</div>

							{/* order */}
							<div>
								<label htmlFor=''>Phone Number (with country code)</label>

								<div className='border border-dark/50 bg-white text-dark flex items-center w-full rounded-lg overflow-hidden py-2 mt-2'>
									<div className='flex items-center gap-4 md:gap-7 px-6 border-r border-dark/50'>
										<div>
											<div className=' aspect-square w-7 rounded-full overflow-hidden'>
												<img
													className='w-full h-full object-cover'
													src='/hero.png'
													alt=''
												/>
											</div>
										</div>
										<HiChevronDown />
									</div>

									<div className='w-full px-6'>
										<input
											type='text'
											placeholder='+1'
											className='w-full outline-none bg-transparent placeholder:text-dark placeholder:text-[12px] md:placeholder:text-base'
										/>
									</div>
								</div>
							</div>

							{/* image upload */}
							<div className='max-w-xl'>
								<label
									{...getRootProps()}
									className='flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
									<span className='flex items-center space-x-2'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='w-6 h-6 text-gray-600'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth='2'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
											/>
										</svg>
										{file ? (
											<div className='flex items-center'>
												<img
													src={URL.createObjectURL(file)}
													alt={file.name}
													className='w-8 h-8 object-cover rounded-full'
												/>
												<span className='font-medium text-gray-600'>
													{file.name} is selected.{' '}
													<span
														className='text-blue-600 underline cursor-pointer'
														onClick={() => setFile(null)}>
														Remove
													</span>
												</span>
											</div>
										) : (
											<span className='font-medium text-gray-600'>
												Drop files to Attach, or{' '}
												<span className='text-blue-600 underline'>browse</span>
											</span>
										)}
									</span>
									<input
										{...getInputProps()}
										type='file'
										name='file_upload'
										className='hidden'
									/>
								</label>

								{file && (
									<div className=' w-[5rem] aspect-square overflow-hidden bg-orange-500'>
										<img
											src={URL.createObjectURL(file)}
											alt={file.name}
											className='w-full h-full'
										/>
									</div>
								)}
							</div>

							{/* button */}
							<div className='mt-5'>
								<button className='bg-greens px-14 py-2 rounded-lg text-white w-fit'>
									Next
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Tab1;
