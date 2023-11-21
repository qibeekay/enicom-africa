'use client';
import Link from 'next/link';
import React from 'react';
import { Navbar } from '..';

const HeroPage = () => {
	return (
		<div className='w-full font-poppins text-dark'>
			<div className=' h-screen bg-hero bg-center bg-cover relative'>
				<div className=' absolute w-full h-screen bg-[#011D00]/60 z-0'></div>
				<div className='relative z-10 py-[2.5rem]'>
					{/* nav bar */}
					<Navbar />
					{/* hero */}
					<div className='relative z-10 text-center flex flex-col items-center justify-center mt-10'>
						{/* image */}
						<div className=' grid items-center justify-center '>
							<div className='w-[15rem]'>
								<img className='w-full h-full' src='/l.png' alt='' />
							</div>
						</div>

						{/* heading */}
						<h1
							className='text-white font-semibold text-3xl sm:text-4xl w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] sm:leading-[3rem]
                        '>
							A conducive marketplace for Solar Energy
						</h1>

						{/*  paragraph */}
						<p className='text-white w-[80%] md:w-[60%] lg:w-[40%] text-sm mt-2'>
							Buy and sell various solar equipments with us. Do so with topmost
							financial ease, freedom and credibility
						</p>

						{/* buttons */}
						<div className='flex flex-wrap items-center justify-center gap-3 sm:gap-7 mt-10'>
							{/* buy */}
							<div className=' bg-greens text-white rounded-md py-2 px-7 md:px-[3rem]'>
								<p>Buy</p>
							</div>

							{/* sell */}
							<div className=' bg-white text-greens rounded-md py-2 px-7 md:px-[3rem]'>
								<p>Sell</p>
							</div>

							{/* marketplace */}
							<div className=' bg-greens text-white rounded-md py-2 px-[1.5rem]'>
								<p>View MarketPlace</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroPage;
