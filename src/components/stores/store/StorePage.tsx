'use client';
import { DasboardNav, StoreBaterries } from '@/components';
import LoanCalculatorModal from '@/components/LoanCalculatorModal';
import { Dialog } from '@material-tailwind/react';
import React from 'react';
import { IoIosCalculator } from 'react-icons/io';
import { MdLiveHelp } from 'react-icons/md';

const StorePage = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	return (
		<div className='font-poppins relative'>
			<DasboardNav />

			{/* calculate load */}
			<div className='max-w-6xl mx-auto px-4 my-5'>
				<div className='flex flex-col sm:flex-row sm:items-center'>
					<h1 className='text-left text-2xl font-medium'>Store</h1>

					<div className='w-full grid items-center justify-center'>
						<div
							className='bg-greens rounded flex items-center justify-center text-white w-full px-10 md:w-[30rem] lg:w-[40rem] py-1 gap-5 cursor-pointer'
							onClick={handleOpen}>
							<IoIosCalculator size={45} />
							<p>Calculate your load</p>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-6xl mx-auto px-4'>
				<h1 className=' text-xl font-medium'>Batteries</h1>

				<StoreBaterries />
			</div>
			<div className='max-w-6xl mx-auto px-4'>
				<h1 className=' text-xl font-medium'>Panels</h1>

				<StoreBaterries />
			</div>
			<div className='max-w-6xl mx-auto px-4'>
				<h1 className=' text-xl font-medium'>Batteries</h1>

				<StoreBaterries />
			</div>

			{/* absolute */}
			<div className='fixed right-10 z-50 bottom-10 cursor-pointer text-greens '>
				<MdLiveHelp size={45} />
			</div>

			<Dialog
				size='lg'
				open={open}
				handler={handleOpen}
				className='bg-transparent shadow-none text-dark'>
				<LoanCalculatorModal handleOpen={handleOpen} />
			</Dialog>
		</div>
	);
};

export default StorePage;
