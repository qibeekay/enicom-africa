import Image from 'next/image';
import React from 'react';
import { FormProps } from '..';
import Link from 'next/link';

const LoginForm = () => {
	return (
		<div className='w-full min-h-screen bg-bgGreen py-10'>
			<div className='bg-white w-[95%] xs:w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] py-7 px-4 sm:p-7 rounded-3xl mx-auto text-dark'>
				{/* form-container */}
				<div>
					{/* header */}
					<div className='flex justify-between'>
						{/* logo */}
						{/* logo */}
						<div className=' h-5 w-20 xs:h-6 xs:w-25 sm:w-28'>
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

					{/* google signup */}
					<div className='flex items-center border border-dark/50 py-2 px-5 rounded-lg gap-5 mt-8 cursor-pointer hover:border-greens '>
						{/* logo */}
						<div>
							<Image src={'/google.png'} width={25} height={25} alt='google' />
						</div>
						<p className=' text-xs sm:text-sm'>Sign in with google</p>
					</div>

					<p className='text-center my-5 text-dark'>Or</p>

					{/* form */}
					<div>
						<form className='grid gap-7 relative'>
							{/* email */}
							<FormProps
								label='Email Address'
								id='email'
								labelId='emailLabel'
								type='email'
							/>
							{/* password */}
							<FormProps
								label='Password'
								id='password'
								labelId='passwordLabel'
								type='password'
								icon1={`locks.png`}
								icon2={`eye.png`}
							/>
							<div className='absolute bottom-[4rem]'>
								<Link href={''} className='text-dark/50 text-sm'>
									Forgot Password?
								</Link>
							</div>

							<div className='w-full xs:w-[70%] mx-auto mt-7'>
								<button className=' bg-greens w-full py-2 px-5 rounded-lg text-white'>
									Log In
								</button>
							</div>
						</form>

						<p className='text-center flex xs:gap-4 items-center justify-center text-sm mt-20'>
							Do Not Have an account?
							<Link href={'/login'} className='text-greens underline text-sm '>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
