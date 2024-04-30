'use client';
import React, { useState } from 'react';
import { LoanDetailsTab, OutrightTab } from '@/components';
import { FiChevronsRight } from 'react-icons/fi';

const CompanyTab = () => {
	const [activeTab, setActiveTab] = useState('1');
	return (
		<div className='relative px-4 xs:px-0 mt-[2rem]'>
			<div className=''>
				<div className=' w-full flex items-center justify-center flex-wrap lg:flex-nowrap gap-4 xs:gap-10'>
					{/* Outright purchase */}
					<div className='w-full xs:w-[15rem]'>
						<div
							onClick={() => setActiveTab('1')}
							className={` cursor-pointer sm:w-auto p-5 shadows flex rounded-3xl flex-col items-center justify-center ${
								activeTab === '1'
									? 'bg-greens text-white'
									: 'bg-white text-dark'
							}`}>
							<p className='text-center py-2'>Outright Purchase</p>
							<p className='text-center pt-7'>
								Make outright payment for your solar equipment
							</p>
							<div className='w-full pt-4 grid items-center justify-center'>
								<button
									className={`${
										activeTab === '1' ? 'bg-white text-dark' : 'bg-bgGreen '
									} py-1.5 px-5 rounded-3xl flex items-center gap-4`}>
									Explore
									<FiChevronsRight />
								</button>
							</div>
						</div>
					</div>

					{/* Loan */}
					<div className='w-full xs:w-[15rem]'>
						<div
							onClick={() => setActiveTab('2')}
							className={`w-full cursor-pointer sm:w-auto p-5 shadows flex rounded-3xl flex-col items-center justify-center ${
								activeTab === '2'
									? 'bg-greens text-white'
									: 'bg-white text-dark'
							}`}>
							<p className='text-center py-2'>Loan</p>
							<p className='text-center pt-7'>
								Take a loan to purchase your solar equipment
							</p>
							<div className='w-full pt-4 grid items-center justify-center'>
								<button
									className={`${
										activeTab === '2' ? 'bg-white text-dark' : 'bg-bgGreen '
									} py-1.5 px-5 rounded-3xl flex items-center gap-4`}>
									Explore
									<FiChevronsRight />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				{activeTab === '1' && <OutrightTab />}
				{activeTab === '2' && <LoanDetailsTab />}
			</div>
		</div>
	);
};

export default CompanyTab;
