import Link from 'next/link';
import React from 'react';
import { GoCheckCircleFill } from 'react-icons/go';

const LoanForm2 = () => {
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
						Your loan request will be reviewed and we will get back to you in a
						few working days
					</p>
					<p className=' font-medium text-dark/[85%]'>
						for you to enjoy our solar equipments on credit.
					</p>
					<div className='flex items-center gap-4 mt-5 justify-center'>
						<p className='font-medium text-greens underline '>
							You will be notified
						</p>
					</div>
					<div className='mt-20'>
						<Link
							href={''}
							className='bg-greens px-6 py-2 rounded-lg text-white'>
							Go To Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanForm2;
