import Link from 'next/link';
import React from 'react';

const OutrightTab = () => {
	return (
		<div className='w-full mt-10'>
			<div className='max-w-6xl sm:px-4 mx-auto'>
				<div>
					<h1 className='font-semibold text-lg'>Outright Purchase</h1>

					{/* flex */}
					<div className='flex flex-col md:flex-row gap-5 md:gap-10 items-center'>
						{/* flex 1 */}
						<div className='w-full text-sm'>
							<p>
								Solar Panel system and equipment can be bought outright using
								cash, bank transfers and electronic payment platforms, all at
								once. This option is great for people who can afford to make a
								one off payment, and it gives a longer term savings option
								because it does not involve loan.
							</p>

							<p className=' mt-2'>
								With our outright purchase option, you can take full ownership
								of your solar energy system upfront, enjoying immediate benefits
								and long-term savings without the constraints of monthly
								repayments.
							</p>
							<p className='mt-2'>
								The process is fast and straightforward, no need to do an
								application need, no approval needed, no repayment configuration
								is required.
							</p>

							<p className='mt-2'>
								<span className='font-medium'>Advantage:</span>If it’s within
								your budget, purchasing your solar energy system outright is
								best. You don’t have to pay interest as you would with other
								options for financing solar systems.
							</p>
							<p className='mt-2'>
								<span className='font-medium'>Disadvantage:</span>
								There’s a significant upfront cost.
							</p>

							<p className='grid mt-2'>
								Ready to take control of your energy future with our outright
								purchase?{' '}
								<Link href={''} className=' underline text-greens'>
									Click here
								</Link>
							</p>
						</div>

						{/* flex 2 */}
						<div className='w-full'>
							<div className=''>
								<img className='w-full h-full' src='/Store 1.png' alt='' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OutrightTab;
