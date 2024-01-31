'use client';
import { getLoanPackages } from '@/api/loan/loan';
import { DasboardNav } from '@/components';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Package {
	amount: string;
	interest_amount: string;
	loan_percentage: string;
	package_desc: string;
	package_token: string;
	plan_digit: string;
	plan_duration: string;
	plan_token: string;
	provider_image: string;
	provider_name: string;
	provider_token: string;
}

const LoanFacilityPage = () => {
	const [packages, setPackages] = useState<Package[]>([]);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const router = useRouter();
	const handleLoan = () => {
		router.push('/loan-form');
	};

	// fetch plans
	const fetchPackages = async () => {
		const fetchedPackages = (await getLoanPackages(`$${token}`)) || [];
		setPackages(fetchedPackages);
	};

	useEffect(() => {
		fetchPackages();
	}, []);

	console.log(packages);

	return (
		<div className=' font-poppins'>
			<DasboardNav />

			<div className='max-w-6xl px-4 mx-auto pt-10 pb-20'>
				<p className='text-lg font-medium pt-2'>View Loan Package</p>
				<p>
					Check the category your purchase loan falls, and view the duration and
					payback dates
				</p>

				<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
					{/* small */}
					{packages.map((pkage, index) => (
						<div
							key={index}
							className='border-2 border-[#CEFFCC] hover:border-greens rounded-2xl py-5'>
							<div className='px-5 pb-5'>
								<p className=' text-2xl font-semibold text-greens'>
									{pkage.plan_duration}
									<span className='text-base text-dark font-normal'>
										({pkage.plan_digit} Months)
									</span>
								</p>

								<div className=' flex items-center gap-2'>
									<div className=' w-[3rem] h-[3rem] rounded-full overflow-hidden'>
										<img
											className='w-full h-full'
											src={pkage.provider_image}
											alt=''
										/>
									</div>
									<p className='py-5'>{pkage.provider_name}</p>
								</div>

								<p>{pkage.loan_percentage}%</p>
								<p className=' text-2xl font-semibold text-greens'>
									{pkage.amount}
								</p>

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
								<li>{pkage.package_desc}</li>
								<li>To return {pkage.interest_amount} at end of duration </li>
								{/* <li>0.05% daily returns. Watch your money grow.</li> */}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LoanFacilityPage;
