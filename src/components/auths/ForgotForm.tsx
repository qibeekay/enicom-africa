'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 'next/navigation' is outdated
import React, { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { FormProps } from '..';
import { Forgot, Update } from '@/api/auth/api';

const ForgotForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showInitialForm, setShowInitialForm] = useState<boolean>(true);
	const [showNewForms, setShowNewForms] = useState<boolean>(false);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const router = useRouter();

	const [formData, setFormData] = useState({
		mail: '',
	});
	const [pData, setPData] = useState({
		email: '',
		fpword: '',
		npword: '',
	});

	const handleHome = () => {
		router.push('/');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};
	const handlePChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setPData((prevPData) => ({ ...prevPData, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		for (const field in formData) {
			if (formData[field as keyof typeof formData] === '') {
				toast.error(`Fields cannot be empty`);
				return;
			}
		}

		try {
			setIsLoading(true);

			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			const response = await Forgot(formData, `$${token}`);
			console.log(response.success);

			if (response.success === false) {
				toast.error(response.message || 'Failed to send email');
			} else {
				toast.success(
					response.message || 'Mail sent. Check your email for instructions.'
				);
				// Hide the initial form and show the new forms
				setShowInitialForm(false);
				setShowNewForms(true);
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to login');
		} finally {
			setIsLoading(false);
		}
	};

	const handlePasswordChange = async (event: FormEvent) => {
		event.preventDefault();

		for (const field in pData) {
			if (pData[field as keyof typeof pData] === '') {
				toast.error(`Fields cannot be empty`);
				return;
			}
		}

		try {
			setIsLoading(true);

			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			const response = await Update(pData, `$${token}`);
			console.log(response.success);

			if (response.success === false) {
				toast.error(response.message || 'Failed to login');
			} else {
				toast.success(response.message || 'Mail sent');
				// Hide the initial form and show the new forms
				setShowInitialForm(false);
				setShowNewForms(true);
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to login');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full min-h-screen bg-bgGreen py-20'>
			<div className='bg-white w-[95%] sm:w-[80%] md:w-[60%] lg:w-[50%] py-7 px-4 sm:p-7 rounded-3xl mx-auto text-dark'>
				{/* form-container */}
				<div>
					{/* header */}
					<div className='flex justify-between'>
						{/* logo */}
						<div
							className=' h-5 w-20 xs:h-6 xs:w-25 sm:w-28 cursor-pointer'
							onClick={handleHome}>
							<Image
								src={'/logo.png'}
								width={100}
								height={100}
								className='h-full w-full'
								alt='logo'
							/>
						</div>

						{/* text */}
						<div className='text-right'>
							<p className='text-greens text-sm sm:text-base font-semibold'>
								Forgot Password
							</p>
							<p className='text-dark/60 text-xs sm:text-base font-medium mt-1'>
								Access your account
							</p>
						</div>
					</div>

					{/* form */}
					<div>
						{/* Initial form */}
						{showInitialForm && (
							<form className='grid gap-7 relative' onSubmit={handleSubmit}>
								{/* email */}
								<FormProps
									label='Email Address'
									name='mail'
									id='email'
									labelId='emailLabel'
									type='email'
									value={formData.mail}
									onChange={handleChange}
								/>

								<div className='w-full xs:w-[70%] mx-auto mt-7'>
									<button
										className=' bg-greens w-full py-2 px-5 rounded-lg text-white'
										disabled={isLoading}>
										{isLoading ? 'Loading...' : 'Continue'}
									</button>
								</div>
							</form>
						)}

						{/* New forms */}
						{showNewForms && (
							<div>
								{/* Form 1 */}
								<form action='' onSubmit={handlePasswordChange}>
									<FormProps
										label='Email'
										name='email'
										id='email'
										labelId='email'
										type='text'
										value={pData.email}
										onChange={handlePChange}
									/>
									<FormProps
										label='Reset Code'
										name='fpword'
										id='fpword'
										labelId='fpword'
										type='text'
										value={pData.fpword}
										onChange={handlePChange}
									/>
									<FormProps
										label='New Password'
										name='npword'
										id='npword'
										labelId='npword'
										type='text'
										value={pData.npword}
										onChange={handlePChange}
									/>
									<div className='w-full xs:w-[70%] mx-auto mt-7'>
										<button
											className=' bg-greens w-full py-2 px-5 rounded-lg text-white'
											disabled={isLoading}>
											{isLoading ? 'Loading...' : 'Submit'}
										</button>
									</div>
								</form>
							</div>
						)}
					</div>
				</div>
				<ToastContainer autoClose={1000} />
			</div>
		</div>
	);
};

export default ForgotForm;
