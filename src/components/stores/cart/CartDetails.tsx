'use client';
import { Dialog, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsCart } from 'react-icons/bs';
import CartModal from './CartModal';
import { MdLiveHelp } from 'react-icons/md';
import Link from 'next/link';

const CartDetails = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);

	return (
		<div className='font-poppins my-10 relative'>
			<div className='max-w-6xl px-4 mx-auto'>
				{/* flex */}
				<div className='flex flex-col lg:flex-row gap-6'>
					{/* item */}
					<div className='w-full flex flex-col gap-y-6'>
						{/* items info */}
						<div className='bg-white shadows rounded-lg p-4 w-full'>
							<div className='flex flex-col md:flex-row gap-5'>
								{/* image */}
								<div className='sm:w-[20rem] md:w-[50%]'>
									{/* img */}
									<div className=' w-full rounded-lg h-[9rem] overflow-hidden'>
										<img
											className='w-full h-full object-cover'
											src='/exterior2.jpg'
											alt=''
										/>
									</div>
								</div>

								<div className='w-full'>
									<div>
										<p className=' text-dark'>Timo Money Batteries</p>
										<p className='text-dark text-xl font-semibold '>N300,000</p>
									</div>
									<div className='my-2 text-dark text-sm md:text-base'>
										<p className='flex gap-4 text-sm md:text-base'>
											Capacity:{' '}
											<span>
												Lorem ipsum dolor sit amet consectetur, adipisicing
												elit. Voluptatum ullam nobis fugit consectetur debitis
												similique.
											</span>
										</p>
									</div>
								</div>
							</div>

							<div className='flex flex-col sm:flex-row items-center justify-between w-full mt-4'>
								{/* remove */}
								<div>
									<button className='bg-[#E4FEE3] py-2 px-[5.2rem] rounded-lg'>
										Remove
									</button>
								</div>
								{/* increment */}
								<div className='flex gap-5 items-center my-4'>
									{/* - */}
									<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl'>
										<p>-</p>
									</div>

									{/* 1 */}
									<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white'>
										<p>1</p>
									</div>

									{/* + */}
									<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl'>
										<p>+</p>
									</div>
								</div>
							</div>
						</div>

						{/* items info */}
						<div className='bg-white shadows rounded-lg p-4 w-full'>
							<div className='flex flex-col md:flex-row gap-5'>
								{/* image */}
								<div className='sm:w-[20rem] md:w-[50%]'>
									{/* img */}
									<div className=' w-full rounded-lg h-[9rem] overflow-hidden'>
										<img
											className='w-full h-full object-cover'
											src='/exterior2.jpg'
											alt=''
										/>
									</div>
								</div>

								<div className='w-full'>
									<div>
										<p className=' text-dark'>Timo Money Batteries</p>
										<p className='text-dark text-xl font-semibold '>N300,000</p>
									</div>
									<div className='my-2 text-dark text-sm md:text-base'>
										<p className='flex gap-4 text-sm md:text-base'>
											Capacity:{' '}
											<span>
												Lorem ipsum dolor sit amet consectetur, adipisicing
												elit. Voluptatum ullam nobis fugit consectetur debitis
												similique.
											</span>
										</p>
									</div>
								</div>
							</div>

							<div className='flex flex-col sm:flex-row items-center justify-between w-full mt-4'>
								{/* remove */}
								<div>
									<button className='bg-[#E4FEE3] py-2 px-[5.2rem] rounded-lg'>
										Remove
									</button>
								</div>
								{/* increment */}
								<div className='flex gap-5 items-center my-4'>
									{/* - */}
									<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl'>
										<p>-</p>
									</div>

									{/* 1 */}
									<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white'>
										<p>1</p>
									</div>

									{/* + */}
									<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl'>
										<p>+</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* buttons */}
					<div className=' sm:w-[20rem] md:w-[45%] bg-white shadows rounded-lg h-fit p-4'>
						<p className=' text-xl font-medium '>Cart Summary</p>

						{/* sub total */}
						<div className='flex items-center justify-between mt-3'>
							<p className='font-medium'>Sub Total</p>
							<p className=' text-xl font-semibold'>N310,000</p>
						</div>

						{/* Delivery fees included */}
						<p className=' mt-5'>Delivery fees included</p>

						{/* purchase */}
						<button
							className='w-full bg-greens text-white py-2 rounded-lg mt-11 mb-6'
							onClick={handleOpen}>
							Purchase
						</button>
					</div>
				</div>
			</div>
			<Dialog
				size='xl'
				open={open}
				handler={handleOpen}
				className='bg-transparent shadow-none text-dark'>
				<CartModal handleOpen={handleOpen} />
			</Dialog>

			{/* absolute */}
			<div className='fixed right-2 md:right-10 z-50 bottom-5 md:bottom-10 cursor-pointer text-greens '>
				<MdLiveHelp size={45} />
			</div>
		</div>
	);
};

export default CartDetails;
