'use client';
import { Dialog } from '@material-tailwind/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosCalculator } from 'react-icons/io';
import LoanCalculatorModal from '../LoanCalculatorModal';

const DashboardLoad = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	return (
		<div>
			<div>
				{/* header */}
				<h1>Most Recent Items</h1>

				<div className=' bg-greens/5 rounded-lg p-3'>
					{/* calculate load */}
					<div
						className='bg-greens rounded flex items-center justify-center text-white py-1 gap-5 cursor-pointer'
						onClick={handleOpen}>
						<IoIosCalculator size={45} />
						<p>Calculate your load</p>
					</div>

					{/* items-grid */}
					<div className='grid gap-y-4 mt-5'>
						{/* items */}
						<div className='flex flex-col xs:flex-row gap-4 text-dark rounded-xl'>
							{/* image */}
							<div>
								<div className='overflow-hidden w-[8rem] aspect-[2/1.7] rounded-xl'>
									<img
										className='w-full h-full object-cover'
										src='/img.png'
										alt=''
									/>
								</div>
							</div>

							{/* text */}
							<div className='w-full'>
								{/* name / order id*/}
								<div className='text-[14px] sm:text-base'>
									{/* name */}
									<p>Timo Money Batteries</p>
								</div>

								{/* price */}
								<h1 className='text-xl font-semibold'>N300,000</h1>

								{/* due date / details */}
								<div className='mt-5'>
									{/* View Details */}
									<div>
										<Link href={''} className='underline text-dark'>
											View Details
										</Link>
									</div>
								</div>
							</div>
						</div>

						{/* items */}
						<div className='flex flex-col xs:flex-row gap-4 text-dark rounded-xl'>
							{/* image */}
							<div>
								<div className='overflow-hidden w-[8rem] aspect-[2/1.7] rounded-xl'>
									<img
										className='w-full h-full object-cover'
										src='/img.png'
										alt=''
									/>
								</div>
							</div>

							{/* text */}
							<div className='w-full'>
								{/* name / order id*/}
								<div className='text-[14px] sm:text-base'>
									{/* name */}
									<p>Timo Money Batteries</p>
								</div>

								{/* price */}
								<h1 className='text-xl font-semibold'>N300,000</h1>

								{/* due date / details */}
								<div className='mt-5'>
									{/* View Details */}
									<div>
										<Link href={''} className='underline text-dark'>
											View Details
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* view more */}
					<div className=' mt-5'>
						<Link
							className='bg-greens rounded flex items-center justify-center text-white py-3'
							href={'/store'}>
							View more in Store
						</Link>
					</div>
				</div>

				<Dialog
					size='lg'
					open={open}
					handler={handleOpen}
					className='bg-transparent shadow-none text-dark'>
					<LoanCalculatorModal handleOpen={handleOpen} />
				</Dialog>
			</div>
		</div>
	);
};

export default DashboardLoad;
