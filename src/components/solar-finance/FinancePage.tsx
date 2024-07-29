import { CompanyTab, FinanceDetails, SfinanceHero } from '@/components';
import React from 'react';
import Footer from '../home/Footer';

const FinancePage = () => {
	return (
		<div>
			<SfinanceHero />
			<FinanceDetails />
			<CompanyTab />
			{/* list */}
			<div className='mb-16'>
				<h1 className='text-center font-semibold text-base sm:text-lg my-10'>
					Unlock your loan in 4 easy steps
				</h1>

				{/* flex */}
				<div className='w-[90%] mx-auto flex items-center justify-center md:justify-between flex-wrap gap-10'>
					{/* div 1 */}
					<div className=' flex flex-col items-center'>
						{/* image */}
						<div className='w-[3.5rem] aspect-square overflow-hidden'>
							<img className='w-full h-full' src='./uu4.png' alt='' />
						</div>

						{/* text */}
						<p className=' text-sm md:text-base mt-2'>Fill your contact form</p>
					</div>

					{/* div 2 */}
					<div className=' flex flex-col items-center'>
						{/* image */}
						<div className='w-[3.5rem] aspect-square overflow-hidden'>
							<img className='w-full h-full' src='./uu2.png' alt='' />
						</div>

						{/* text */}
						<p className='mt-2'>Data Assessment</p>
					</div>

					{/* div 3 */}
					<div className=' flex flex-col items-center'>
						{/* image */}
						<div className='w-[3.5rem] aspect-square overflow-hidden'>
							<img className='w-full h-full' src='./uu3.png' alt='' />
						</div>

						{/* text */}
						<p className='mt-2'>Credit Assessment</p>
					</div>

					{/* div 4 */}
					<div className=' flex flex-col items-center'>
						{/* image */}
						<div className='w-[3.5rem] aspect-square overflow-hidden'>
							<img className='w-full h-full' src='./uu1.png' alt='' />
						</div>

						{/* text */}
						<p className='mt-2'>Loan Approved</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default FinancePage;
