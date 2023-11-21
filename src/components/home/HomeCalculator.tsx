'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const HomeCalculator = () => {
	const router = useRouter();

	const handleRegister = () => {
		router.push('/register');
	};
	return (
		<div className='font-poppins py-28'>
			<div className='w-[75%] mx-auto'>
				<div className='flex items-center flex-col md:flex-row  justify-between'>
					{/* text */}
					<div className='w-full'>
						<h1 className='font-semibold text-3xl lg:text-4xl pr-10'>
							We have the Load Calculator
						</h1>
						<p className='pt-5 lg:pt-10'>
							We help provide adequate solar equipments for your load. we save
							ypu the stress of looking for solar equipment combinations
							adequate for yor load.
						</p>

						<div
							className='bg-greens text-white w-[10rem] grid items-center justify-center py-2 rounded cursor-pointer mt-8 lg:mt-16 '
							onClick={handleRegister}>
							<p>Get Started</p>
						</div>
					</div>

					{/* image */}
					<div className='w-full'>
						<div className='w-full'>
							<img
								className='w-full h-full object-cover'
								src='/calculator.png'
								alt=''
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeCalculator;
