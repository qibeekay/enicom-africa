'use client';
import React, { useState } from 'react';
import { Installation, LoanFacility, MarketPlace } from '..';
import { IoStorefrontOutline } from 'react-icons/io5';

const HomeTabs = () => {
	const [activeTab, setActiveTab] = useState('1');
	return (
		<div className='relative px-4 xs:px-0 max-w-6xl mx-auto'>
			<div className='w-full absolute -top-[2rem] xs:-top-[5rem] lg:left-[50%] lg:-translate-x-[50%]'>
				<div className=' w-full grid grid-cols-1 md:grid-cols-2 ll:grid-cols-3 items-start justify-center gap-4  xs:gap-10 px-4 ms:px-20 md:px-4'>
					{/* market place */}
					<div className='w-full h-full'>
						<div
							onClick={() => setActiveTab('1')}
							className={` cursor-pointer sm:w-auto py-10 px-4 shadows flex rounded-3xl flex-col items-center justify-center ${
								activeTab === '1'
									? 'bg-greens text-white'
									: 'bg-white text-dark'
							}`}>
							{/* icon */}
							<div
								className={` w-10 aspect-square rounded-full grid items-center justify-center ${
									activeTab === '1'
										? 'bg-white text-greens'
										: 'bg-greens text-white'
								}`}>
								<IoStorefrontOutline size={25} />
							</div>
							<p className='text-center py-2'>Marketplace</p>
							<p className='text-center'>
								Discover a diverse range of solar products and services tailored
								to your needs. Whether you are looking to buy high-quality solar
								panels or seeking professional installation services, our
								marketplace has you covered. We ensure that you find the perfect
								solution for your home or business.
							</p>
						</div>
					</div>

					{/* Installation */}
					<div className='w-full h-full'>
						<div
							onClick={() => setActiveTab('2')}
							className={`w-full cursor-pointer sm:w-auto py-10 px-4 shadows flex rounded-3xl flex-col items-center justify-center ${
								activeTab === '2'
									? 'bg-greens text-white'
									: 'bg-white text-dark'
							}`}>
							{/* icon */}
							<div
								className={` w-10 aspect-square rounded-full grid items-center justify-center ${
									activeTab === '2'
										? 'bg-white text-greens'
										: 'bg-greens text-white'
								}`}>
								<IoStorefrontOutline size={25} />
							</div>
							<p className='text-center py-2'>Become a Partner</p>
							<p className='text-center'>
								Leverage our platform to expand your reach, enhance your
								business, and drive the adoption of clean energy. Join our
								network of financial partners, Sellers and Agents to advance
								Solar energy solutions.
							</p>
						</div>
					</div>

					{/* Loan Facility */}
					<div className='w-full h-full'>
						<div
							onClick={() => setActiveTab('3')}
							className={`w-full cursor-pointer sm:w-auto py-10 px-4 shadows flex rounded-3xl flex-col items-center justify-center ${
								activeTab === '3'
									? 'bg-greens text-white'
									: 'bg-white text-dark'
							}`}>
							{/* icon */}
							<div
								className={` w-10 aspect-square rounded-full grid items-center justify-center ${
									activeTab === '3'
										? 'bg-white text-greens'
										: 'bg-greens text-white'
								}`}>
								<IoStorefrontOutline size={25} />
							</div>
							<p className='text-center py-2'>Solar Finacing options</p>
							<p className='text-center'>
								Through our partnerships with leading finance institutions, we
								offer financing solutions to make your transition to solar
								energy seamless and affordable. Our Options are flexible, making
								it easier for you to invest in high-quality solar products.
								Whether you're a homeowner, business, or institution, our
								financing options empower you to embrace sustainable energy,
								while effectively managing your budget.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				{activeTab === '1' && <MarketPlace />}
				{activeTab === '2' && <Installation />}
				{activeTab === '3' && <LoanFacility />}
			</div>
		</div>
	);
};

export default HomeTabs;
