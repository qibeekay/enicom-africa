import Link from 'next/link';
import React from 'react';
import { GoCheckCircleFill } from 'react-icons/go';
import { IoIosCopy } from 'react-icons/io';

const AddMoney2 = () => {
	return (
		<div className='text-dark font-poppins my-20'>
			<div className='grid items-center justify-center text-center'>
				<h1 className=' text-[28px] font-semibold text-greens'>
					Congratulations
				</h1>

				<div className='grid items-center justify-center text-greens my-7'>
					<GoCheckCircleFill size='100' />
				</div>

				<p className=' font-medium text-dark/[85%]'>
					You have successfully purchased 2 M20 hand guns at{' '}
					<span className='text-greens'>$100,000</span>.
				</p>
				<div className='flex items-center gap-4 mt-5 justify-center'>
					<p className='font-medium text-dark/[85%] '>
						Your delivery Number is{' '}
						<span className='text-greens'>+144 768 567 4567</span>
					</p>

					<div className='flex items-center gap-4 justify-center'>
						<IoIosCopy size='20' />
						<p>Copy</p>
					</div>
				</div>
				<div className='mt-20'>
					<Link href={''} className='bg-greens px-6 py-2 rounded-lg text-white'>
						Go To Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AddMoney2;
