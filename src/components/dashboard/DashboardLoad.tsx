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
				<h1>Calculate your Load</h1>

				<div className=' bg-greens/5 rounded-lg p-3 mt-5'>
					{/* calculate load */}
					<div
						className='bg-greens rounded flex items-center justify-center text-white py-1 gap-5 cursor-pointer'
						onClick={handleOpen}>
						<IoIosCalculator size={45} />
						<p>Calculate your load</p>
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
