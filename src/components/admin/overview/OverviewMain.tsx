'use client';
import React, { useEffect, useState } from 'react';
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
import { getUsersCount } from '@/api/auth/api';

interface Count {
	getAllAgent: number;
	getAllProductCount: number;
	getAllSellers: number;
	getAllUsersCount: number;
	getLoanPartners: number;
}

const OverviewMain = () => {
	const [count, setCount] = useState<Count | null>(null);
	const [activeTab, setActiveTab] = useState('1');
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	// get user count
	const getcount = async () => {
		try {
			const getcounts = await getUsersCount(`$${token}`);
			setCount(getcounts);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
		}
	};

	useEffect(() => {
		getcount();
	}, []);
	return (
		<div className=''>
			<div className=''>
				{/* nav */}
				<SearchNav />

				<div className=' w-full pr-10 pl-4'>
					{/* overview */}
					<div>
						<div className='flex items-center justify-between py-2'>
							<h1>Quick Overview</h1>

							{/* <div className='bg-white flex items-center gap-4 py-1 px-3 rounded-lg'>
								<div className='w-4 aspect-square'>
									<img className='w-full h-full' src='/filter.png' alt='' />
								</div>
								<h1>Filter by Date</h1>
							</div> */}
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
									{/* <div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div> */}
								</div>
								{/* text */}
								<p className='pt-1 pb-2'>Total Customers</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#3592FF] font-semibold'>
									{count?.getAllUsersCount}
								</h1>
							</div>

							{/* Total Sellers */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/bag.png' alt='' />
									</div>

									{/* icon 2 */}
									{/* <div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div> */}
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Sellers</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#BB07FA] font-semibold'>
									{count?.getAllSellers}
								</h1>
							</div>

							{/* Total Agents */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/down.png' alt='' />
									</div>

									{/* icon 2 */}
									{/* <div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div> */}
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Agents</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#04C223] font-semibold'>
									{count?.getAllAgent}
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
									{/* <div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div> */}
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Loan Partners</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#FF4040] font-semibold'>
									{count?.getLoanPartners}
								</h1>
							</div>
						</div>
					</div>
				</div>

				{/* tabs */}
				<div className='flex gap-4 flex-wrap items-center mt-8 mx-4'>
					{/* recent orders */}
					{/* <button
						onClick={() => handleTabClick('1')}
						className={` rounded-lg py-1.5 px-5 ${
							activeTab === '1' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Recent orders
					</button> */}

					{/* recent transactions */}
					{/* <button
						onClick={() => handleTabClick('2')}
						className={` rounded-lg py-1.5 px-5 ${
							activeTab === '2' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Recent transaction
					</button> */}

					{/* view uploaded product requests */}
					<button
						onClick={() => handleTabClick('1')}
						className={` rounded-lg py-1.5 shadows px-5 ${
							activeTab === '1' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Uploaded Products
					</button>

					{/* view sellers requests */}
					<button
						onClick={() => handleTabClick('2')}
						className={` rounded-lg py-1.5 shadows px-5 ${
							activeTab === '2' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Recent Sellers
					</button>

					{/* view agents requests */}
					<button
						onClick={() => handleTabClick('3')}
						className={` rounded-lg py-1.5 shadows px-5 ${
							activeTab === '3' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Recent Agents
					</button>

					{/* view loan packages */}
					<button
						onClick={() => handleTabClick('4')}
						className={` rounded-lg py-1.5 shadows px-5 ${
							activeTab === '4' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Loan Packages
					</button>

					{/* view loan packages */}
					<button
						onClick={() => handleTabClick('5')}
						className={` rounded-lg py-1.5 shadows px-5 ${
							activeTab === '5' ? 'bg-greens text-white' : 'bg-white text-dark'
						}`}>
						Loan Requests
					</button>
				</div>

				{/* tabs to be shows */}
				<div className=' w-full'>
					{/* {activeTab === '1' && <OverviewTab1 />} */}
					{activeTab === '1' && <OverviewTab3 />}
					{activeTab === '2' && <OverviewTab4 />}
					{activeTab === '3' && <OverviewTab5 />}
					{activeTab === '4' && <OverviewTab2 />}
					{activeTab === '5' && <OverviewTab1 />}
				</div>
			</div>
		</div>
	);
};

export default OverviewMain;
