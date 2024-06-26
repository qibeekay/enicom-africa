'use client';

import { FormProps } from '..';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from '@/api/auth/api';

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [phone, setPhone] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const handleHome = () => {
		router.push('/');
	};

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	// const modifiedToken = `$${token}`;

	const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		mail: '',
		pword: '',
		phone: '',
	});

	const handleChange = (event: any) => {
		const { name, value } = event.target;

		// If the name is 'phone', update the phone state
		if (name === 'phone') {
			setPhone(value);
		}

		// Update the formData state
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleInputChange = (event: any) => {
		const inputValue = event.target.value;
		// Remove any non-numeric characters
		const newValue = inputValue.replace(/\D/g, '');
		setPhone(newValue);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		// Check if any field is empty
		for (const field in formData) {
			if (formData[field as keyof typeof formData] === '') {
				// Skip the check if the field is 'phone', as it's handled separately
				if (field !== 'phone') {
					toast.error(`Fields cannot be empty`);
					return;
				}
			}
		}

		if (phone === '') {
			toast.error('Phone number cannot be empty');
			return;
		}

		try {
			setIsLoading(true);

			// Check if the token is defined before using it
			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			const response = await Register({ ...formData, phone }, `$${token}`);
			console.log('Registration response:', response);

			if (response.success === true) {
				// console.log('success');
				// console.log('response');
				toast.success('Registration Successful');
				router.push('/verify-mail');
			} else {
				toast.error(response.message || 'Failed to register');
				// console.log('errrorrrr');
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to register');
			// console.error('Registration error in handleSubmit:', error);
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
								Get Started
							</p>
							<p className='text-dark/60 text-xs md:text-base font-medium mt-1'>
								Apply in 2 mintes
							</p>
						</div>
					</div>

					{/* google signup */}
					{/* <div className='flex items-center border border-dark/50 py-2 px-5 rounded-lg gap-5 mt-7 cursor-pointer hover:border-greens '> */}
					{/* logo */}
					{/* <div>
							<Image src={'/google.png'} width={25} height={25} alt='google' />
						</div>
						<p className=' text-xs sm:text-base'>Sign up with google</p>
					</div> */}

					{/* <p className='text-center my-5 text-dark'>Or</p> */}

					{/* form */}
					<div className='mt-7'>
						<form className='grid gap-3' onSubmit={handleSubmit}>
							{/* first/last name */}
							<div className='flex flex-col sm:flex-row gap-y-3 gap-x-7 items-center'>
								{/* firstname */}
								<FormProps
									label='First Name'
									id='firstName'
									name='fname'
									labelId='firstNameLabel'
									type='text'
									value={formData.fname}
									onChange={handleChange}
								/>
								<FormProps
									label='Last Name'
									id='lastName'
									name='lname'
									labelId='lastNameLabel'
									type='text'
									value={formData.lname}
									onChange={handleChange}
								/>
							</div>
							<FormProps
								label='Email Address'
								name='mail'
								id='email'
								labelId='emailLabel'
								type='email'
								value={formData.mail}
								onChange={handleChange}
							/>
							<FormProps
								label='Phone number'
								name='phone'
								id='phone'
								labelId='phoneLabel'
								type='text'
								value={phone}
								onChange={handleInputChange}
							/>

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

							<div className='w-full xs:w-[70%] mx-auto mt-5'>
								<button className=' bg-greens w-full py-2 px-5 rounded-lg text-white'>
									{isLoading ? 'Signing Up...' : 'Get Started'}
								</button>
							</div>
						</form>
					</div>
					<div className='text-dark/70 text-xs w-full md:w-[85%] mx-auto grid mt-4'>
						<div>
							By Clicking “Get started”,I agree to Re-Imagine Capital{' '}
							<a href='' className='text-dark/70 hover:text-greens underline'>
								Term of use
							</a>
							,{' '}
							<a href='' className='text-dark/70 hover:text-greens underline'>
								Privacy policy
							</a>
						</div>
						.<span>And to</span>
					</div>
					<p className='text-center flex xs:gap-4 items-center justify-center text-sm mt-5'>
						Already Have an account?{' '}
						<Link href={'/login'} className='text-greens underline text-sm '>
							Log in
						</Link>
					</p>
				</div>
				<ToastContainer autoClose={1000} />
			</div>
		</div>
	);
};

export default RegisterForm;
