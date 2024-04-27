'use client';
import { Dialog } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';
import LoanCalculatorModal from '../LoanCalculatorModal';

const AboutDetails = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	return (
		<div className='w-full font-poppins text-dark bg-bgGreen'>
			<div className=' max-w-6xl px-4 mx-auto py-10'>
				<div className='w-full'>
					<h1 className='text-center text-2xl font-semibold mb-10'>
						We provide a complete range of solar PV solutions
					</h1>

					{/* grids */}
					<div className='w-full flex flex-wrap gap-7 items-center justify-center lg:justify-between'>
						{/* grid-items */}
						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div className=' w-12 aspect-square overflow-hidden'>
								<img
									className='w-full h-full'
									src='/carbon_operations-field.png'
									alt=''
								/>
							</div>
							{/* text */}
							<p className='font-medium'>Operation & Maintenance</p>
						</div>

						{/* grid-items */}
						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div className=' w-12 aspect-square overflow-hidden'>
								<img
									className='w-full h-full'
									src='/wpf_maintenance.png'
									alt=''
								/>
							</div>
							{/* text */}
							<p className='font-medium'>Turnkey Installation</p>
						</div>

						{/* grid-items */}
						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div className=' w-12 aspect-square overflow-hidden'>
								<img
									className='w-full h-full'
									src='/streamline_customer-support-1.png'
									alt=''
								/>
							</div>
							{/* text */}
							<p className='font-medium'>Solar Consulting Services</p>
						</div>

						{/* grid-items */}
						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div className=' w-12 aspect-square overflow-hidden'>
								<img
									className='w-full h-full'
									src='/solar_card-linear.png'
									alt=''
								/>
							</div>
							{/* text */}
							<p className='font-medium'>Financing</p>
						</div>
					</div>

					{/* commitment */}
					<div className='flex flex-col md:flex-row gap-10 items-center mb-10 mt-20'>
						{/* flex-1 */}
						<div className='w-full'>
							{/* text */}
							<div>
								<h1 className='text-xl font-semibold'>Our Commitments:</h1>
								{/* line */}
								<div className='bg-greens w-[7rem] h-1.5 mt-2'></div>
							</div>

							{/* list */}
							<ul className=' list-disc mt-5 grid gap-1 pl-4 text-sm lg:text-base'>
								<li>
									To ensure seamless process in accessing Solar finance options.
								</li>
								<li>
									To treat our customers, vendors, partners respectfully, fairly
									and responsively.
								</li>
								<li>
									Help customers in the entire implementation process and
									ensuring process is hassle free and seamless to the customer.
								</li>
								<li>
									Provide customer service support as required by the customer.
								</li>
								<li>
									Carry out each project as though we own the system, using high
									quality products, thorough installation techniques and
									continuous monitoring to increase the project's lifetime
									worth.
								</li>
								<li>
									Provide Clean and affordable energy to home and business
									owners.
								</li>
								<li>
									To expand access to clean energy with financing solutions that
									enables homeowners and businesses to go solar, driving
									business growth, and environmental sustainability.
								</li>
							</ul>
						</div>

						{/* flex-2 */}
						<div className='w-full flex flex-col gap-7 items-center'>
							{/* load calculator */}
							<div className='bg-greens p-4 rounded-lg text-white shadow-2xl'>
								<h1 className='font-medium'>Load Calculator</h1>
								<p className='text-sm my-2'>
									Input information of what you want to power in your home.
									Based on this calculation, you will get a list of items you
									need to purchase. You will be redirected to our marketplace
									where you can purchase your items.
								</p>

								{/* links */}
								<button
									className='flex gap-4 items-center'
									onClick={handleOpen}>
									{/* text */}
									Calculate your load
									{/* img */}
									<div className='w-10 aspect-square overflow-hidden'>
										<img
											className='w-full h-full'
											src='/groupwhite.png'
											alt=''
										/>
									</div>
								</button>
							</div>

							{/* loan calculator */}
							<div className='bg-white p-4 rounded-lg text-dark shadow-2xl'>
								<h1 className='font-medium'>Loan Calculator</h1>
								<p className='text-sm my-2'>
									Like to take a loan? Calculate how much you will need to pay
									when you use our financing option to buy your solar items.
								</p>

								{/* links */}
								<Link
									href={'/loan-calculator'}
									className='flex gap-4 items-center'>
									{/* text */}
									Calculate your loan
									{/* img */}
									<div className='w-10 aspect-square overflow-hidden'>
										<img
											className='w-full h-full'
											src='/groupgreen.png'
											alt=''
										/>
									</div>
								</Link>
							</div>
						</div>
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

export default AboutDetails;
