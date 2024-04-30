'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Installation = () => {
	const router = useRouter();

	const handleRegister = () => {
		router.push('/register');
	};
	return (
		<div className='pt-[50rem] ms:pt-[33rem] mss:pt-[15rem] text-dark font-poppins'>
			<div className='w-[75%] mx-auto'>
				<div>
					{/* div */}
					<div className='flex items-center flex-col md:flex-row  justify-between'>
						{/* text */}
						<div className='w-full'>
							<h1 className='font-semibold text-3xl lg:text-4xl pr-10'>
								We handle Installation of Solar equipments
							</h1>
							<p className='pt-5 lg:pt-10'>
								Our Team helps with the installation of these equipments at your
								chosen location. You do nit need expertise in its installation,
								we will handle that for you.
							</p>

							<button
								className='bg-greens text-white w-[10rem] grid items-center justify-center py-2 rounded cursor-pointer mt-8 lg:mt-16 '
								onClick={handleRegister}>
								Get Started
							</button>
						</div>

						{/* image */}
						<div className='w-full'>
							<div className='w-full'>
								<img
									className='w-full h-full object-cover'
									src='/panel.png'
									alt=''
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Installation;
