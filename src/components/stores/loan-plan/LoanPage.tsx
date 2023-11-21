'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiChevronLeft } from 'react-icons/hi2';

const LoanPage = () => {
	const router = useRouter();
	const handleLoan = () => {
		router.push('/loan-form');
	};
	const handleBack = () => {
		router.back();
	};
	return (
		<div className='text-dark my-10'>
			<div className='max-w-6xl mx-auto px-4'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={handleBack}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				<div className='mt-5 '>
					<p className='text-lg font-medium pt-2'>View Loan Package</p>
					<p>
						Check the category your purchase loan falls, and view the duration
						and payback dates
					</p>

					<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
						{/* small */}
						<div className='border-2 border-[#CEFFCC] hover:border-greens rounded-2xl py-5'>
							<div className='px-5 pb-5'>
								<p className=' text-2xl font-semibold text-greens'>
									Small Loan{' '}
									<span className='text-base text-dark font-normal'>
										(3 Months)
									</span>
								</p>

								<p className='py-5'>
									woigjosiknvanraskngoai rg;ui lajblajlakng;jn
								</p>

								<p>+0%</p>
								<p className=' text-2xl font-semibold text-greens'>N100,000</p>

								<button
									className='w-full py-4 border-[#CEFFCC] border-2 hover:bg-greens text-lg font-bold text-dark/50 hover:text-white rounded-lg mt-7 mb-2'
									onClick={handleLoan}>
									Get Loan
								</button>
							</div>

							<div className='flex items-center gap-4'>
								<hr className='w-full bg-black h-0.5' />
								<p>Package</p>
								<hr className='w-full bg-black h-0.5' />
							</div>

							<ul className='list-disc px-10 mt-5 grid gap-2'>
								<li>15% return at the end of 3 months</li>
								<li>A least 100,000 can be deposited</li>
								<li>0.05% daily returns. Watch your money grow.</li>
							</ul>
						</div>

						{/* medium */}
						<div className='border-2 border-[#CEFFCC] hover:border-greens rounded-2xl py-5'>
							<div className='px-5 pb-5'>
								<p className=' text-2xl font-semibold text-greens'>
									Medium Loan{' '}
									<span className='text-base text-dark font-normal'>
										(6 Months)
									</span>
								</p>

								<p className='py-5'>
									Pay 50% now and the remaining at the end of 3 months
								</p>

								<p>+5%</p>
								<p className=' text-2xl font-semibold text-greens'>N300,000</p>

								<button
									className='w-full py-4 border-[#CEFFCC] border-2 hover:bg-greens text-lg font-bold text-dark/50 hover:text-white rounded-lg mt-7 mb-2'
									onClick={handleLoan}>
									Get Loan
								</button>
							</div>

							<div className='flex items-center gap-4'>
								<hr className='w-full bg-black h-0.5' />
								<p>Package</p>
								<hr className='w-full bg-black h-0.5' />
							</div>

							<ul className='list-disc px-10 mt-5 grid gap-2'>
								<li>15% return at the end of 3 months</li>
								<li>A least 100,000 can be deposited</li>
								<li>Any other information users should know</li>
							</ul>
						</div>

						{/* Large */}
						<div className='border-2 border-[#CEFFCC] hover:border-greens rounded-2xl py-5'>
							<div className='px-5 pb-5'>
								<p className=' text-2xl font-semibold text-greens'>
									Large Loan{' '}
									<span className='text-base text-dark font-normal'>
										(12 Months)
									</span>
								</p>

								<p className='py-5'>
									Get a whooping 15% interest you opt for this plan.
								</p>

								<p>+10%</p>
								<p className=' text-2xl font-semibold text-greens'>N700,000</p>

								<button
									className='w-full py-4 border-[#CEFFCC] border-2 hover:bg-greens text-lg font-bold text-dark/50 hover:text-white rounded-lg mt-7 mb-2'
									onClick={handleLoan}>
									Get Loan
								</button>
							</div>

							<div className='flex items-center gap-4'>
								<hr className='w-full bg-black h-0.5' />
								<p>Package</p>
								<hr className='w-full bg-black h-0.5' />
							</div>

							<ul className='list-disc px-10 mt-5 grid gap-2'>
								<li>15% return at the end of 3 months</li>
								<li>A least 100,000 can be deposited</li>
								<li>Any other information users should know</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanPage;
