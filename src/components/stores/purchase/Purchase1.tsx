'use client';
import {
	Dialog,
	Input,
	Option,
	Select,
	Typography,
} from '@material-tailwind/react';
import React from 'react';
import { BsCart } from 'react-icons/bs';
import { HiMiniStar } from 'react-icons/hi2';
import PurchaseModal from './PurchaseModal';

const Purchase1 = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	return (
		<div className='font-poppins my-10'>
			<div className='max-w-6xl px-4 mx-auto'>
				{/* flex */}
				<div className='flex flex-col md:flex-row gap-4 lg:gap-32'>
					{/* item */}
					<div className='w-full'>
						{/* items info */}
						<div className='bg-[#F2FFF1] px-4 sm:px-10 pt-8 pb-4 rounded-lg'>
							<h1 className='uppercase '>Order Summary</h1>

							{/* orders */}
							<div>
								{/* order-1 */}
								<div className='flex justify-between mt-4'>
									{/* image */}
									<div className='w-[7rem] sm:w-[10rem] aspect-[2/1.2] rounded-xl overflow-hidden'>
										<img
											className='w-full h-full object-cover'
											src='/exterior2.jpg'
											alt=''
										/>
									</div>

									{/* text */}
									<div>
										<p className=' uppercase'>Battery</p>

										<p className='text-greens font-medium my-2'>N150,000</p>

										<p className='flex gap-4 sm:gap-10 items-center'>
											Quantity: <span>1</span>
										</p>
									</div>
								</div>
								{/* order-1 */}
								<div className='flex justify-between mt-4'>
									{/* image */}
									<div className='w-[7rem] sm:w-[10rem] aspect-[2/1.2] rounded-xl overflow-hidden'>
										<img
											className='w-full h-full object-cover'
											src='/exterior2.jpg'
											alt=''
										/>
									</div>

									{/* text */}
									<div>
										<p className=' uppercase'>Battery</p>

										<p className='text-greens font-medium my-2'>N150,000</p>

										<p className='flex gap-4 sm:gap-10 items-center'>
											Quantity: <span>1</span>
										</p>
									</div>
								</div>
							</div>

							{/* engineer */}
							<div className='flex items-center justify-between my-7'>
								{/* details */}
								<div className='flex items-center gap-4'>
									{/* image */}
									<div className=' w-[2rem] aspect-square overflow-hidden rounded-full'>
										<img
											className='w-full h-full object-cover object-center'
											src='/img.png'
											alt=''
										/>
									</div>

									<div>
										<p>Senator agbadfd</p>
										<p className='text-sm'>Installer</p>
									</div>
								</div>

								{/* rating / price */}
								<div>
									<p className='text-greens font-medium text-right'>N50,000</p>
									<div className='flex gap-1 text-[#D49901] py-1'>
										<HiMiniStar />
										<HiMiniStar />
										<HiMiniStar />
										<HiMiniStar />
										<HiMiniStar />
									</div>
								</div>
							</div>

							{/* total */}
							<div className='flex justify-between items-center font-medium'>
								<p>Total:</p>
								<p className='text-greens'>N310,000</p>
							</div>

							{/* pay now */}
							<button
								className='w-full bg-greens text-white py-3 rounded-lg mt-8'
								onClick={handleOpen}>
								Pay Now
							</button>
						</div>
					</div>

					{/* buttons */}
					<div className=' md:w-[80%] bg-[#F2FFF1] rounded-lg p-10'>
						<p className=' text-lg font-medium'>Confirm Address</p>

						<form action='' className='mt-10'>
							<div className='grid gap-y-2'>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>State</Typography>
									<Select>
										<Option>Material Tailwind HTML</Option>
										<Option>Material Tailwind React</Option>
										<Option>Material Tailwind Vue</Option>
										<Option>Material Tailwind Angular</Option>
										<Option>Material Tailwind Svelte</Option>
									</Select>
								</div>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>
										Local Government
									</Typography>
									<Select>
										<Option>Material Tailwind HTML</Option>
										<Option>Material Tailwind React</Option>
										<Option>Material Tailwind Vue</Option>
										<Option>Material Tailwind Angular</Option>
										<Option>Material Tailwind Svelte</Option>
									</Select>
								</div>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>Address</Typography>
									<Input
										size='lg'
										className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
										labelProps={{
											className: 'before:content-none after:content-none',
										}}
										crossOrigin={undefined}
									/>
								</div>
							</div>
						</form>

						<div
							className='flex items-center gap-5 text-dark mt-20 mb-2 justify-between'
							onClick={handleOpen}>
							<p>Delivery fee:</p>
							<p className='font-semibold text-lg text-greens'>N10,000</p>
						</div>
					</div>
				</div>

				<Dialog
					size='lg'
					open={open}
					handler={handleOpen}
					className='bg-transparent shadow-none text-dark'>
					<PurchaseModal handleOpen={handleOpen} />
				</Dialog>
			</div>
		</div>
	);
};

export default Purchase1;
