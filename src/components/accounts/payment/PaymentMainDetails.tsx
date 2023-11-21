import Link from 'next/link';
import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { GoArrowDownRight } from 'react-icons/go';

const PaymentMainDetails = () => {
	return (
		<div className='w-full text-dark font-poppins'>
			<div className='flex flex-col gap-y-7'>
				{/* account details */}
				<div className='bg-white w-full rounded-lg py-5 px-7 shadows'>
					{/* name / edit */}
					<div className='w-full flex items-center justify-between'>
						<h1 className='font-semibold '>Cards</h1>
					</div>

					{/* cards */}
					<div className='flex flex-col md:flex-row justify-between text-sm mt-4 gap-4'>
						<div className='border border-dark/50 rounded-lg p-5 w-full'>
							<div className='flex justify-between font-medium text-dark/60'>
								<p className='text-[12px] sm:text-base'>56785678 5678 5678</p>
								<Link
									href={''}
									className='text-greens underline text-[12px] sm:text-base'>
									Update
								</Link>
							</div>
							<div className='flex justify-between mt-5'>
								<p className='text-dark/60 font-medium text-[12px] sm:text-base'>
									03/25
								</p>
								<p className='text-dark/60 font-medium text-[12px] sm:text-base'>
									***
								</p>
								<Link
									href={''}
									className='text-red-500 underline text-[12px] sm:text-base'>
									Delete
								</Link>
							</div>
						</div>

						{/* add card */}
						<div className='border border-dark/50 rounded-lg p-5 w-full flex items-center justify-center'>
							<div className='flex items-center gap-4 font-medium text-md'>
								<FiPlusCircle size={35} />
								<p>Add New Card</p>
							</div>
						</div>
					</div>
				</div>

				{/* loan facility */}
				<div className='bg-white w-full rounded-lg py-5 px-7 shadows'>
					{/* name / edit */}
					<div className='w-full flex flex-col xs:flex-row xs:items-center justify-between'>
						<h1 className='font-semibold '>Loan Facility</h1>
						<Link href={''} className='underline text-[12px] sm:text-base'>
							View History
						</Link>
					</div>

					{/* cards */}
					<div className='flex justify-between text-sm mt-4 gap-4'>
						<div className='flex gap-2 items-center'>
							{/* icon */}
							<div className='flex items-center justify-center'>
								<div className='bg-[#FD0F0F] rounded-full w-[2.1rem] aspect-square grid items-center justify-center text-white'>
									<GoArrowDownRight size={30} />
								</div>
							</div>

							{/* text */}
							<p className='grid mt-3 text-xl font-semibold text-greens'>
								N500,000{' '}
								<span className='text-sm text-dark font-normal'>
									Amount in Debt
								</span>
							</p>
						</div>
					</div>

					{/* date */}
					<div className='w-full flex flex-col sm:flex-row sm:items-center justify-between mt-5'>
						<div className='flex items-center gap-2 text-[12px] sm:text-base'>
							<p className=''>Date Borrowed:</p>
							<p className='text-greens'>05/12/2023</p>
						</div>

						<div className='text-[12px] sm:text-base'>
							<p className='text-[#FD0F0F]'>28 days remaining</p>
						</div>
					</div>
				</div>

				{/* Accounts */}
				<div className='bg-white w-full rounded-lg py-5 px-7 shadows'>
					{/* name / edit */}
					<div className='w-full flex items-center justify-between'>
						<h1 className='font-semibold '>Account</h1>
					</div>

					{/* cards */}
					<div className='flex flex-col md:flex-row justify-between text-sm mt-4 gap-4'>
						<div className='border border-dark/50 rounded-lg p-5 w-full'>
							<div className='flex justify-between font-medium text-dark/60'>
								<p className='text-[12px] sm:text-base'>56785678567</p>
								<Link
									href={''}
									className='text-greens underline text-[12px] sm:text-base'>
									Update
								</Link>
							</div>
							<div className='flex justify-between mt-5'>
								<p className='text-dark/60 font-medium text-[12px] sm:text-base'>
									Zenith Bank PLC
								</p>
								<Link
									href={''}
									className='text-red-500 underline text-[12px] sm:text-base'>
									Delete
								</Link>
							</div>
						</div>

						{/* add card */}
						<div className='border border-dark/50 rounded-lg p-5 w-full flex items-center justify-center'>
							<div className='flex items-center gap-4 font-medium text-md'>
								<FiPlusCircle size={35} />
								<p>Add New Card</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentMainDetails;
