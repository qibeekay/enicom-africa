'use client';
import React, { useState } from 'react';
import { LoanDetailsTab, OutrightTab } from '@/components';

const CompanyTab = () => {
	const [activeTab, setActiveTab] = useState('1');
	return (
		<div className='relative px-4 xs:px-0 mt-[2rem]'>
			<div className=''>
				<div className=' w-full flex items-start justify-center flex-wrap lg:flex-nowrap gap-4 xs:gap-10'>
					{/* Outright purchase */}
					<div className='w-full xs:w-[20rem]'>
						<div
							onClick={() => setActiveTab('1')}
							className={` cursor-pointer sm:w-auto p-5 shadows flex rounded-3xl flex-col items-center justify-center border-2 bg-white ${
								activeTab === '1' ? 'border-greens text-dark' : ' border-dark'
							}`}>
							<p className='text-center font-semibold py-2'>
								Outright Purchase
							</p>
							<p className=' pt-7'>Purchase Solar system outright.</p>
							<div className='pt-4'>
								<p className='font-medium'>Benefits</p>
								<ul className='list-disc px-4'>
									<li>Full ownership of solar system </li>
									<li>Price hike protection</li>
									<li>OEM warranty</li>
									<li>Flexible Payment Plan</li>
									<li>Quick Installation</li>
								</ul>
							</div>
							<div className='pt-4'>
								<p className='font-medium'>Payments</p>
								<ul>
									<li>Full payment to Enicom</li>
								</ul>
							</div>
							<div className='pt-4'>
								<p className='font-medium'>Ownership</p>
								<ul>
									<li>Customers owns and maintains the system.</li>
								</ul>
							</div>
							<div className='w-full pt-4 grid items-center justify-center'>
								<button
									className={`${
										activeTab === '1' ? 'bg-bgGreen text-dark' : 'bg-white '
									} py-1.5 px-5 rounded-3xl flex items-center gap-4`}>
									Click to Learn More
								</button>
							</div>
						</div>
					</div>

					{/* Loan */}
					<div className='w-full xs:w-[20rem]'>
						<div
							onClick={() => setActiveTab('2')}
							className={` cursor-pointer sm:w-auto p-5 shadows flex rounded-3xl flex-col items-center justify-center border-2 bg-white ${
								activeTab === '2' ? 'border-greens text-dark' : ' border-dark'
							}`}>
							<p className='text-center font-semibold py-2'>Loan</p>
							<p className=' pt-7'>
								Finance the ownership of your solar system through a monthly
								affordable payment plan.
							</p>
							<div className='pt-4'>
								<p className='font-medium'>Benefits</p>
								<ul className='list-disc px-4'>
									<li>Finance option available to make purchase </li>
									<li>Price hike protection</li>
									<li>OEM warranty</li>
									<li>Flexible Payment Plan</li>
									<li>Quick Installation</li>
								</ul>
							</div>
							<div className='pt-4'>
								<p className='font-medium'>Payments</p>
								<ul className='list-disc px-4'>
									<li>
										Zero (0) Naira to little down with short and long payment
										terms available
									</li>
									<li>Payment to Financial Institution</li>
								</ul>
							</div>
							<div className='pt-4'>
								<p className='font-medium'>Ownership</p>
								<ul className='list-disc px-4'>
									<li>Customers owns and maintains the system.</li>
								</ul>
							</div>
							<div className='w-full pt-4 grid items-center justify-center'>
								<button
									className={`${
										activeTab === '2' ? 'bg-bgGreen text-dark' : 'bg-white '
									} py-1.5 px-5 rounded-3xl flex items-center gap-4`}>
									Click to Learn More
								</button>
							</div>
						</div>
					</div>

					{/* Lease */}
					<div className='w-full xs:w-[20rem]'>
						<div
							onClick={() => setActiveTab('3')}
							className={` cursor-pointer sm:w-auto p-5 shadows flex rounded-3xl flex-col items-center justify-center border-2 bg-white ${
								activeTab === '3' ? 'border-greens text-dark' : ' border-dark'
							}`}>
							<p className='font-semibold py-2'>Lease</p>
							<p className='pt-7'>
								Take advantage of the financing model that allows you lease to
								own.
							</p>
							<div className='pt-4'>
								<div>
									<p className='font-medium'>Benefits</p>
								</div>
								<ul className='list-disc px-4'>
									<li>5-year warranty</li>
									<li>Price hike protection</li>
									<li>100% service coverage</li>
									<li>Flexible Payment Plan</li>
									<li>Maintenance </li>
									<li>Price hike protection </li>
								</ul>
							</div>
							<div className='pt-4'>
								<p className='font-medium'>Payments</p>
								<ul className='list-disc px-4'>
									<li>
										Zero (0) Naira to little down with short and long payment
										terms available
									</li>
									<li>Payment to Financial Institution</li>
								</ul>
							</div>
							<div className='pt-4'>
								<p className='font-medium'>Ownership</p>
								<ul>
									<li>
										Enicom owns the system until full payment is completed
									</li>
								</ul>
							</div>
							<div className='w-full pt-4 grid items-center justify-center'>
								<button
									className={`${
										activeTab === '3' ? 'bg-bgGreen text-dark' : 'bg-white '
									} py-1.5 px-5 rounded-3xl flex items-center gap-4`}>
									Click to Learn More
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				{activeTab === '1' && <OutrightTab />}
				{activeTab === '2' && <LoanDetailsTab />}
				{activeTab === '3' && (
					<div className='w-full mt-10'>
						<div className='max-w-6xl sm:px-4 mx-auto'>
							<div>
								<h1 className='font-semibold text-lg'>Lease</h1>

								{/* flex */}
								<div className='flex flex-col md:flex-row gap-5 md:gap-10 items-center'>
									{/* flex 1 */}
									<div className='w-full'>
										<p>
											Enicom solar lease plan allows customers pay a fixed
											monthly amount, making payment easy. You get access to
											affordable and clean energy for a low agreed amount down
											payment, subsequently monthly payment will be based on
											agreed terms. You will gain full ownership of equipment
											once all payment is made. Enicom will own the system for
											the duration of the agreed terms. You can pay the lease
											up-front or run a monthly bill payment.
										</p>

										<p className='text-red-700'>Upcoming!</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CompanyTab;
