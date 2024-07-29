'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const LoanFacility = () => {
	const router = useRouter();

	const handleRegister = () => {
		router.push('/register');
	};
	return (
		<div className='pt-[75rem] sm:pt-[67rem] md:pt-[47rem] ll:pt-[27rem] text-dark font-poppins'>
			<div>
				<div>
					<h1 className='text-center text-4xl font-semibold mb-4'>
						Our Credit Partners
					</h1>
					<p className='text-sm xs:text-base text-center'>
						Our bank partners help create various plans for credit facilities to
						ease your financial burdens
					</p>

					<div className='flex items-center justify-center gap-x-16 gap-y-4 flex-wrap mt-10'>
						<div className='w-16 aspect-square rounded overflow-hidden'>
							<img className='w-full h-full object-cover' src='' alt='' />
						</div>
						<div className='w-16 aspect-square rounded overflow-hidden'>
							<img className='w-full h-full object-cover' src='' alt='' />
						</div>
						<div className='w-16 aspect-square rounded overflow-hidden'>
							<img className='w-full h-full object-cover' src='' alt='' />
						</div>
						<div className='w-16 aspect-square rounded overflow-hidden'>
							<img className='w-full h-full object-cover' src='' alt='' />
						</div>
						<div className='w-16 aspect-square rounded overflow-hidden'>
							<img className='w-full h-full object-cover' src='' alt='' />
						</div>
						<div className='w-16 aspect-square rounded overflow-hidden'>
							<img className='w-full h-full object-cover' src='' alt='' />
						</div>
						<div className='w-16 aspect-square rounded overflow-hidden'>
							<img className='w-full h-full object-cover' src='' alt='' />
						</div>
					</div>

					<div className=' grid items-center justify-center'>
						<div className='w-[80%] mx-auto'>
							<img
								className='w-full h-full object-cover'
								src='/payment.png'
								alt=''
							/>
						</div>
					</div>

					<div className='grid items-center justify-center'>
						<div
							className='bg-greens text-white w-[10rem] grid items-center justify-center py-2 rounded cursor-pointer'
							onClick={handleRegister}>
							<p>Get Started</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanFacility;
