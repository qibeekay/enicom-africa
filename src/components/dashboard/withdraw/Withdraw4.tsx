import Link from 'next/link';
import React from 'react';
import { GoCheckCircleFill } from 'react-icons/go';

const Withdraw4 = () => {
	return (
		<div>
			<div className='text-dark font-poppins my-20'>
				<div className='grid items-center justify-center text-center'>
					<h1 className=' text-[28px] font-semibold text-greens'>
						Congratulations
					</h1>

					<div className='grid items-center justify-center text-greens my-7'>
						<GoCheckCircleFill size='100' />
					</div>

					<p className=' font-medium text-dark/[85%]'>
						You have successfully transferred N10,000 to Oyero Habibulah.
					</p>
					<p className=' font-medium text-dark/[85%]'>
						Your new account balance is N150,000
					</p>
					<div className='flex items-center gap-4 mt-5 justify-center'>
						<p className='font-medium text-greens underline '>
							You will be notified
						</p>
						<p className='font-medium text-greens underline '>
							You will be notified
						</p>
					</div>
					<div className='mt-20'>
						<Link
							href={''}
							className='bg-greens px-10 py-2 rounded-lg text-white'>
							Finish
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Withdraw4;
