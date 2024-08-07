'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Navbar } from '..';
import { useRouter } from 'next/navigation';

const HeroPage = () => {
	const [usermail, setUsermail] = useState('');
	const router = useRouter();

	const handleStore = () => {
		router.push('/store');
	};

	const handleLogin = () => {
		router.push('/login');
	};
	// Check if user is logged in based on your authentication mechanism
	useEffect(() => {
		const userMail = localStorage.getItem('usertoken');
		setUsermail(userMail || '');
	});
	const isLoggedIn = !!usermail;
	return (
		<div className='w-full font-poppins text-dark'>
			<div className=' h-screen bg-hero bg-center bg-cover relative'>
				<div className=' absolute w-full h-screen bg-[#011D00]/60 z-0'></div>
				<div className='relative z-10 py-[2.5rem]'>
					{/* nav bar */}
					<Navbar />
					{/* hero */}
					<div className='relative z-10 text-center flex flex-col items-center justify-center h-full pt-[5rem]'>
						{/* image */}
						<div className=' grid items-center justify-center '>
							<div className='w-[15rem]'>
								<img className='w-full h-full' src='/l.png' alt='' />
							</div>
						</div>

						{/* heading */}
						<h1
							className='text-white font-semibold text-3xl sm:text-4xl w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] sm:leading-[3rem]
                        pt-4 '>
							Enabling Better Living through access to Solar and Flexible
							Finance solutions.
						</h1>

						{/*  paragraph */}
						<p className='text-white w-[80%] md:w-[60%] lg:w-[40%] text-sm mt-2 mb-2'>
							Connect with verified sellers and installers near you.
						</p>
						<p className='text-white w-[80%] md:w-[60%] lg:w-[40%] text-lg mt-2'>
							Tired and frustrated by the epileptic power situation in your
							area, make a switch with us today.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroPage;
