'use client';
import React, { useState } from 'react';
import { Installation, LoanFacility, MarketPlace } from '..';
import { IoStorefrontOutline } from 'react-icons/io5';

const HomeTabs = () => {
	const [activeTab, setActiveTab] = useState('1');
	return (
		<div className='relative px-4 xs:px-0 '>
			<div className='absolute -top-[2rem] xs:-top-[5rem] lg:left-[50%] lg:-translate-x-[50%]'>
				<div className=' w-full flex items-center justify-center flex-wrap lg:flex-nowrap gap-4 xs:gap-10'>
					{/* market place */}
					<div className='w-full xs:w-[17rem]'>
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
								Buy and sell various solar equipments in our marketplace,
								ranging from batteries to panels and so on
							</p>
						</div>
					</div>

					{/* Installation */}
					<div className='w-full xs:w-[17rem]'>
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
							<p className='text-center py-2'>Installation</p>
							<p className='text-center'>
								We also help in installing these equipments where you need them
								and also safe keeping for sellers
							</p>
						</div>
					</div>

					{/* Loan Facility */}
					<div className='w-full xs:w-[17rem]'>
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
							<p className='text-center py-2'>Loan Facility</p>
							<p className='text-center'>
								We help those in collaboration with our credit partners to help
								ease the financial burden in purchasing these equipments
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
