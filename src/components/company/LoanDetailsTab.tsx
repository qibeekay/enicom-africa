import Link from 'next/link';
import React from 'react';

const LoanDetailsTab = () => {
	return (
		<div className='w-full mt-10'>
			<div className='max-w-6xl sm:px-4 mx-auto'>
				<div>
					<h1 className='font-semibold text-lg'>Loan</h1>

					{/* flex */}
					<div className='flex flex-col md:flex-row gap-5 md:gap-10 items-center mt-4'>
						{/* flex 1 */}
						<div className='w-full'>
							<p>
								Get Financing for solar panel systems and equipment.  Solar
								loans work like any other type of loan—a lender loans you the
								money upfront, then you make payments, with an agreed Interest
								rate and for an agreed period. 
							</p>
							<p>
								At Enicom, we believe that everyone should have access to clean,
								renewable energy solutions. That is why we have partnered with
								financial institutions to offer flexible loan options to help
								you go solar without breaking the bank. With this, you can enjoy
								the benefits of solar energy while spreading the cost over time.
							</p>

							<p className='font-medium mt-2'>What you gain</p>
							<ul className='pl-4 list-disc my-2'>
								<li>
									Getting a loan to finance your solar system makes you the
									owner of the system.
								</li>
								<li>Low upfront cost depending on type of loan.</li>
								<li>Significant long-term savings.</li>
								<li>
									Monthly utility bill savings, offset by a monthly loan
									payment.
								</li>
							</ul>

							<p className='font-medium mt-2'>Downside</p>
							<ul className='pl-4 list-disc my-2'>
								<li>You pay Interest rates on the solar loan approved.</li>
								<li>
									You risk the loss of collateral—whether the home or the system
									itself—if you’re unable to make your payments.
								</li>
							</ul>

							<p className='grid mt-2'>
								Ready to take control of your energy future with our Loan
								Financing Option{' '}
								<Link
									href={'/loan-calculator'}
									className=' underline text-greens'>
									Click here to get started
								</Link>
							</p>
						</div>

						{/* flex 2 */}
						{/* <div className='w-full'>
							<div className=''>
								<img className='w-full h-full' src='/payment.png' alt='' />
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanDetailsTab;
