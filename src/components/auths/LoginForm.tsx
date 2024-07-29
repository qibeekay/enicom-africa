'use client';
import { FormProps } from '..';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from '@/api/auth/api';

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	// const modifiedToken = `$${token}`;

	const [formData, setFormData] = useState({
		mail: '',
		pword: '',
	});

	const router = useRouter();

	const handleHome = () => {
		router.push('/');
	};

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		// Check if any field is empty
		for (const field in formData) {
			if (formData[field as keyof typeof formData] === '') {
				toast.error(`Fields cannot be empty`);
				return;
			}
		}

		try {
			setIsLoading(true);

			// Check if the token is defined before using it
			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			const response = await Login(formData, `$${token}`);
			console.log(response.success);

			if (response.success === false) {
				toast.error(response.message || 'Failed to login');
			} else {
				toast.success('Login Successful');
				// Navigate to /dashboard
				router.push('/dashboard');
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to login');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full min-h-screen bg-bgGreen py-10 flex flex-col items-center justify-center'>
			<div className='bg-white w-[95%] sm:w-[80%] md:w-[60%] lg:w-[50%] py-7 px-4 sm:p-7 rounded-3xl mx-auto text-dark'>
				{/* form-container */}
				<div>
					{/* header */}
					<div className='flex justify-between'>
						{/* logo */}
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
								Log In
							</p>
							<p className='text-dark/60 text-xs sm:text-base font-medium mt-1'>
								Access your account
							</p>
						</div>
					</div>

					{/* form */}
					<div className='mt-7'>
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
							{/* password */}
							<FormProps
								type='password'
								name='pword'
								label='Password'
								id='password'
								labelId='passwordLabel'
								icon1={`locks.png`}
								icon2={showPassword ? 'locks.png' : 'eye.png'}
								value={formData.pword}
								onChange={handleChange}
								showPassword={showPassword}
								togglePassword={togglePassword}
							/>
							<div className='absolute bottom-[4rem]'>
								<Link
									href={'/forgot-password'}
									className='text-dark/50 text-sm'>
									Forgot Password?
								</Link>
							</div>

							<div className='w-full xs:w-[70%] mx-auto mt-7'>
								<button className=' bg-greens w-full py-2 px-5 rounded-lg text-white'>
									{isLoading ? 'Loading...' : 'Login'}
								</button>
							</div>
						</form>

						<p className='text-center flex xs:gap-4 items-center justify-center text-sm mt-20'>
							Do Not Have an account?
							<Link
								href={'/register'}
								className='text-greens underline text-sm '>
								Sign up
							</Link>
						</p>
					</div>
				</div>
				<ToastContainer autoClose={1000} />
			</div>
		</div>
	);
};

export default LoginForm;
