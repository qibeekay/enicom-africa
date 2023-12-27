'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GiBackwardTime } from 'react-icons/gi';
import { FiPlus } from 'react-icons/fi';
import { HiChevronDown } from 'react-icons/hi2';
import { LiaSearchSolid } from 'react-icons/lia';
import { AiOutlineEyeInvisible, AiOutlineSwap } from 'react-icons/ai';
import { DashBoardItems } from '..';

const DashboardBalance = () => {
	const [kyc, setKyc] = useState('');

	// Check if user is logged in based on your authentication mechanism
	useEffect(() => {
		const kycStatus = localStorage.getItem('kycStatus');
		console.log(kycStatus);
		setKyc(kycStatus || '');
	});
	console.log(kyc);
	const iskycStatus = !!kyc;

	return (
		<div className='w-full font-poppins'>
			<div>
				{/* header */}
				<div className='flex md:items-center flex-wrap justify-between mb-3'>
					{/* Balance / transaction history  */}
					<div className='flex items-center gap-4 md:gap-10'>
						<h1 className='text-dark font-medium text-lg'>Balances</h1>
						<div>
							<Link className='flex items-center gap-1 text-dark' href={''}>
								<GiBackwardTime size={25} />
								<span className=' underline'>Transaction History</span>
							</Link>
						</div>
					</div>

					{/* View Details */}
					<div>
						<Link href={''} className='underline text-dark'>
							View Details
						</Link>
					</div>
				</div>

				{/* wallet */}
				<div>
					{iskycStatus ? (
						<div className='flex flex-col md:flex-row xl:flex-row items-center gap-4 md:gap-20 lg:gap-10 xl:gap-20'>
							{/* wallet balance */}
							<div className='bg-greens text-white w-full sm:w-[20rem] md:w-full p-4 rounded-lg'>
								<div>
									{/* top */}
									<div className='flex justify-between items-center'>
										<p className='text-sm font-light text-white/70'>Wallet</p>
										<AiOutlineEyeInvisible />
									</div>

									{/* amount */}
									<div>
										<h1 className='font-semibold text-2xl'>N1,500,000</h1>
									</div>

									{/* bottom */}
									<div className='flex justify-between items-center text-white/70'>
										{/* withdraw */}
										<div className='flex items-center'>
											<div>
												<AiOutlineSwap />
											</div>
											<Link
												href={'/withdraw'}
												className='underline text-sm font-light '>
												Withdraw
											</Link>
										</div>

										{/* Add Money */}
										<div className='flex items-center'>
											<FiPlus />
											<Link href={'/add-money'} className='underline text-sm '>
												Add Money
											</Link>
										</div>
									</div>
								</div>
							</div>

							{/* borrowed balance */}
							<div className='bg-greens/5 text-dark w-full sm:w-[20rem] md:w-full p-4 rounded-lg'>
								<div>
									{/* top */}
									<div className='flex justify-between items-center'>
										<p className='flex items-center text-sm gap-5'>
											<span>Total Borrowed </span>
											<AiOutlineEyeInvisible />
										</p>
										<p className='flex items-center text-sm'>
											<FiPlus /> Pay back loan
										</p>
									</div>

									{/* amount */}
									<div>
										<h1 className='font-semibold text-2xl py-1'>N1,000,000</h1>
									</div>

									{/* bottom */}
									<div className='flex justify-between items-center'>
										{/* date */}
										<div className='flex items-center text-sm text-dark'>
											<p>28/12/2022</p>
										</div>

										{/* due date */}
										<div className='flex items-center text-sm '>
											<p className='text-[#FD0F0F]'>28 days remaining</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div>Verify</div>
					)}
				</div>

				{/* Orders on delivery */}
				<div className='flex gap-x-7 items-center py-5 flex-wrap font-medium md:text-lg text-dark/60'>
					<p className='text-greens cursor-pointer'>Orders on delivery</p>
					<p className='cursor-pointer hover:text-greens'>Pending sales</p>
					<p className='cursor-pointer hover:text-greens'>New Items</p>
				</div>

				{/* search */}
				<div className='flex flex-col md:flex-row md:items-center gap-4'>
					{/* order */}
					<div className='border border-dark/50 bg-white text-dark flex items-center w-full rounded-lg overflow-hidden'>
						<div className='flex items-center gap-4 md:gap-7 px-3 border-r border-dark/50'>
							<p>Order</p>
							<HiChevronDown />
						</div>

						<div className='w-full px-3'>
							<input
								type='text'
								placeholder='Order ID, Product or Store Name'
								className='w-full outline-none bg-transparent placeholder:text-dark placeholder:text-[12px] md:placeholder:text-base'
							/>
						</div>
						<div className='text-white bg-greens h-full py-2 w-[5.5rem] grid items-center justify-center'>
							<LiaSearchSolid size={32} />
						</div>
					</div>

					{/* last day */}
					<div className='bg-greens/5 w-[30%] grid items-center justify-center py-3 rounded-lg'>
						<p>Last 1 Day</p>
					</div>
				</div>

				{/* items */}
				<div>
					<DashBoardItems />
				</div>
			</div>
		</div>
	);
};

export default DashboardBalance;
