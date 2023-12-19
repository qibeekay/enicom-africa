import Link from 'next/link';
import React from 'react';

const SalesTab2 = () => {
	return (
		<div>
			SalesTab2
			<div className='bg-white w-full rounded-lg py-5 px-4 xs:px-7'>
				{/* order id */}
				<div className='w-full flex justify-between'>
					<p className='text-lg font-semibold'>Pending Payment</p>
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
									<Link href={''} className='underline text-dark'>
										Rate Product
									</Link>
								</div>
							</div>

							{/* delivery status */}
							<p className=' text-lg font-medium text-greens mt-4'>Sold</p>

							{/* due date / details */}
							<div className='flex flex-col md:flex-row justify-between md:items-center'>
								<p className='text-sm font-medium text-dark/60'>
									06/07/2022 <span> 03:10 PM</span>
								</p>

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
		</div>
	);
};

export default SalesTab2;
