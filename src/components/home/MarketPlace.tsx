'use client';
import React from 'react';
import { Categories, StoreBaterries } from '..';
import { useRouter } from 'next/navigation';

const MarketPlace = () => {
	const router = useRouter();

	const handleStore = () => {
		router.push('/store');
	};
	return (
		<div className='pt-[50rem] ms:pt-[33rem] mss:pt-[15rem] text-dark font-poppins'>
			<div>
				<div>
					<h1 className='text-center text-4xl font-semibold mb-4'>
						Our Marketplace
					</h1>
					<p className='text-center'>
						Our bank partners help create various plans for credit facilities to
						ease your financial burdens
					</p>

					<div className='bg-white ms:px-[4rem] shadow my-10'>
						<Categories />
					</div>

					<div className='px-4 lg:px-[4rem]'>
						<StoreBaterries />
						<StoreBaterries />
					</div>

					<div className='grid items-center justify-center'>
						<div
							className='bg-greens text-white w-[10rem] grid items-center justify-center py-2 rounded cursor-pointer'
							onClick={handleStore}>
							<p>Start Shopping</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MarketPlace;
