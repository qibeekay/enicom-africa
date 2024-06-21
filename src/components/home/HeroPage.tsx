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
					<div className='relative z-10 text-center flex flex-col items-center justify-center h-full mt-[15rem]'>
						{/* image */}
						<div className=' grid items-center justify-center '>
							<div className='w-[15rem]'>
								<img className='w-full h-full' src='/l.png' alt='' />
							</div>
						</div>

						{/* heading */}
						<h1
							className='text-white font-semibold text-3xl sm:text-4xl w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] sm:leading-[3rem]
                        py-4 '>
							Lighting up the nation, Empowering Lives.
						</h1>

						{/*  paragraph */}
						<p className='text-white w-[80%] md:w-[60%] lg:w-[40%] text-sm mt-2'>
							Enjoy an easy life with the energy of the future.
						</p>

						{/* buttons */}
						{/* <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-7 mt-10'> */}
						{/* buy */}
						{/* <button
								className=' bg-greens text-white rounded-md py-2 px-7 md:px-[3rem]'
								onClick={isLoggedIn ? handleStore : handleLogin}>
								Buy
							</button> */}

						{/* sell */}
						{/* <button
								className=' bg-white text-greens rounded-md py-2 px-7 md:px-[3rem]'
								onClick={isLoggedIn ? handleStore : handleLogin}>
								Sell
							</button> */}

						{/* marketplace */}
						{/* <button
								className=' bg-greens text-white rounded-md py-2 px-[1.5rem]'
								onClick={isLoggedIn ? handleStore : handleLogin}>
								View MarketPlace
							</button> */}
						{/* </div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroPage;
