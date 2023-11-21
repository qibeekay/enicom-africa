import Link from 'next/link';
import React from 'react';

const DashBoardItems = () => {
	return (
		<div className='mt-5 text-dark'>
			<div>
				{/* grid container*/}
				<div className='grid gap-y-5'>
					{/* items */}
					<div>
						<p className='flex items-center gap-4 text-dark'>
							10/12/23 <span>9:30 PM</span>
						</p>

						<div className='mt-2'>
							<div className='flex flex-col md:flex-row gap-4 bg-greens/5 text-dark p-4 rounded-xl'>
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
									<div className='flex flex-col-reverse sm:flex-row justify-between'>
										{/* name */}
										<p>Timo Money Batteries</p>
										{/* order id */}
										<p>Order ID: sfdfdfhhfhfhfhfh</p>
									</div>

									{/* price */}
									<h1 className='text-xl font-semibold'>N300,000</h1>

									{/* delivery status */}
									<p className=' text-lg font-medium text-[#FD0F0F] mt-4'>
										On Delivery
									</p>

									{/* due date / details */}
									<div className='flex justify-between flex-col sm:flex-row'>
										<p>5 days before delivery</p>

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

					{/* items */}
					<div>
						<p className='flex items-center gap-4 text-dark'>
							10/12/23 <span>9:30 PM</span>
						</p>

						<div className='mt-2'>
							<div className='flex flex-col md:flex-row gap-4 bg-greens/5 text-dark p-4 rounded-xl'>
								{/* image */}
								<div>
									<div className='overflow-hidden w-[10rem] aspect-[2/1.5] rounded-xl'>
										<img
											className='w-full h-full object-cover'
											src='/exterior2.jpg'
											alt=''
										/>
									</div>
								</div>

								{/* text */}
								<div className='w-full'>
									{/* name / order id*/}
									<div className='flex flex-col-reverse sm:flex-row  justify-between'>
										{/* name */}
										<p>Timo Money Batteries</p>
										{/* order id */}
										<p>Order ID: sfdfdfhhfhfhfhfh</p>
									</div>

									{/* price */}
									<h1 className='text-xl font-semibold'>N300,000</h1>

									{/* delivery status */}
									<p className=' text-lg font-medium text-[#FD0F0F] mt-4'>
										On Delivery
									</p>

									{/* due date / details */}
									<div className='flex flex-col sm:flex-row  justify-between'>
										<p>5 days before delivery</p>

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
			</div>
		</div>
	);
};

export default DashBoardItems;
