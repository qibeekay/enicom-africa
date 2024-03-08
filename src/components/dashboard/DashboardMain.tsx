'use client';
import React, { useEffect, useState } from 'react';
import { DashboardBalance, DashboardLoad } from '..';

const DashboardMain = () => {
	const [fname, setFname] = useState('');

	useEffect(() => {
		const storedFname =
			typeof window !== 'undefined' ? localStorage.getItem('fname') || '' : '';

		setFname(storedFname);
	}, []);

	return (
		<div className='w-full font-poppins relative z-0'>
			<div className='max-w-6xl mx-auto px-4 py-10'>
				{/* header text */}
				<div className='text-xl font-medium text-dark'>
					<h1>Welcome back, {fname}</h1>
				</div>

				<div className='mt-4'>
					<div className='flex flex-col lg:flex-row gap-10'>
						{/* side1 */}
						<div className='w-full'>
							<DashboardBalance />
						</div>
						{/* side 2 */}
						<div className='w-full sm:w-[25rem] lg:w-[55%]'>
							<DashboardLoad />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardMain;
