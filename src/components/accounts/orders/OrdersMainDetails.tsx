'use client';
import { Dialog } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { LiaSearchSolid } from 'react-icons/lia';
import RateModal from './RateModal';

const OrdersMainDetails = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	return (
		<div className='w-full h-screen overflow-scroll text-dark no-scrollbar'>
			<div className='flex flex-col gap-y-7'>
				{/* delivery search */}
				<div className='bg-white w-full rounded-lg py-5 px-4 xs:px-7'>
					{/* list */}
					<div className='flex gap-4 flex-wrap md:gap-x-16 items-center'>
						<p className='font-semibold text-lg'>All</p>

						<p>
							Delivered <span>(1)</span>
						</p>

						<p>
							Ongoing Deliver <span>(1)</span>
						</p>
					</div>

					{/* search */}
					<div className='w-full xl:w-[70%] mt-9 mb-4'>
						{/* order */}
						<div className='border border-dark/50 bg-white text-dark flex items-center w-full rounded-lg overflow-hidden'>
							<div className='flex items-center sm:gap-7 px-3 border-r border-dark/50'>
								<p className='text-[10px] sm:text-base'>Order</p>
								<HiChevronDown />
							</div>

							<div className='w-full px-3'>
								<input
									type='text'
									placeholder='Order ID, Product or Store Name'
									className='w-full outline-none bg-transparent placeholder:text-dark placeholder:text-[10px] sm:placeholder:text-base'
								/>
							</div>
							<div className='text-white bg-greens h-full py-2 w-[5.5rem] grid items-center justify-center'>
								<LiaSearchSolid size={32} />
							</div>
						</div>
					</div>
				</div>

				{/* product */}
				<div className='bg-white w-full rounded-lg py-5 px-4 xs:px-7'>
					{/* order id */}
					<div className='w-full flex justify-end'>
						<p>Order ID: sfdfdfhhfhfhfhfh</p>
					</div>{' '}
					<div className='mt-2'>
						<div className='flex flex-col sm:flex-row gap-4 text-dark rounded-xl'>
							{/* image */}
							<div>
								<div className='overflow-hidden w-[10rem] aspect-[2/1.5] rounded-xl'>
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
								<div className='flex justify-between'>
									{/* name */}
									<p>Timo Money Batteries</p>
								</div>

								{/* price */}
								<div className='flex flex-col md:flex-row md:items-center justify-between'>
									<h1 className='text-xl font-semibold'>N300,000</h1>
									<div>
										<Link
											href={''}
											onClick={handleOpen}
											className='underline text-dark'>
											Rate Product
										</Link>
									</div>
								</div>

								{/* delivery status */}
								<p className=' text-lg font-medium text-[#FD0F0F] mt-4'>
									On Delivery
								</p>

								{/* due date / details */}
								<div className='flex flex-col md:flex-row justify-between md:items-center'>
									<p>5 days before delivery</p>

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
				</div>
				<Dialog
					size='sm'
					open={open}
					handler={handleOpen}
					className='bg-transparent shadow-none text-dark'>
					<RateModal handleOpen={handleOpen} />
				</Dialog>
			</div>
		</div>
	);
};

export default OrdersMainDetails;
