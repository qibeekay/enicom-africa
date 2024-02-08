'use client';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { BsBell } from 'react-icons/bs';
import {
	OverviewTab1,
	OverviewTab2,
	OverviewTab3,
	OverviewTab4,
	OverviewTab5,
	SearchNav,
} from '@/components';

const OverviewMain = () => {
	const [activeTab, setActiveTab] = useState('1');
	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};
	return (
		<div className='bg-[#eeeeee]'>
			<div className=''>
				{/* nav */}
				<SearchNav />

				<div className=' bg-[#eeeeee] w-full pr-10 pl-4'>
					{/* overview */}
					<div>
						<div className='flex items-center justify-between py-2'>
							<h1>Quick Overview</h1>

							<div className='bg-white flex items-center gap-4 py-1 px-3 rounded-lg'>
								<div className='w-4 aspect-square'>
									<img className='w-full h-full' src='/filter.png' alt='' />
								</div>
								<h1>Filter by Date</h1>
							</div>
						</div>

						<div className='flex gap-5 items-center justify-center flex-wrap'>
							{/* total Customer */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/users.png' alt='' />
									</div>

									{/* icon 2 */}
									<div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div>
								</div>
								{/* text */}
								<p className='pt-1 pb-2'>Total Customers</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#3592FF] font-semibold'>
									1,000,000
								</h1>
							</div>

							{/* Total Disbursement */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/bag.png' alt='' />
									</div>

									{/* icon 2 */}
									<div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div>
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Disbursement</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#BB07FA] font-semibold'>
									$1,000,000
								</h1>
							</div>

							{/* Total Inflow */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/down.png' alt='' />
									</div>

									{/* icon 2 */}
									<div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div>
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Inflow</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#04C223] font-semibold'>
									$1,000,000
								</h1>
							</div>

							{/* Total Outflow */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/up.png' alt='' />
									</div>

									{/* icon 2 */}
									<div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div>
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Outflow</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#FF4040] font-semibold'>
									$1,000,000
								</h1>
							</div>
						</div>
					</div>

					{/* table */}
				</div>

				{/* tabs */}
				<div className='flex gap-4 flex-wrap items-center mt-8 mx-4'>
					<button
						onClick={() => handleTabClick('1')}
						className={` rounded-lg py-1.5 px-5 ${
							activeTab === '1' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Recent orders
					</button>
					<button
						onClick={() => handleTabClick('2')}
						className={` rounded-lg py-1.5 px-5 ${
							activeTab === '2' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Recent transaction
					</button>
					<button
						onClick={() => handleTabClick('3')}
						className={` rounded-lg py-1.5 px-5 ${
							activeTab === '3' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Uploaded Products
					</button>
					<button
						onClick={() => handleTabClick('4')}
						className={` rounded-lg py-1.5 px-5 ${
							activeTab === '4' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Recent Sellers
					</button>
					<button
						onClick={() => handleTabClick('5')}
						className={` rounded-lg py-1.5 px-5 ${
							activeTab === '5' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Recent Agents
					</button>
				</div>

				<div className=' w-full'>
					{activeTab === '1' && <OverviewTab1 />}
					{activeTab === '2' && <OverviewTab2 />}
					{activeTab === '3' && <OverviewTab3 />}
					{activeTab === '4' && <OverviewTab4 />}
					{activeTab === '5' && <OverviewTab5 />}
				</div>
			</div>
		</div>
	);
};

export default OverviewMain;
