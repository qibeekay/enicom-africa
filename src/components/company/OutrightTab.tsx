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
						<div className='w-full'>
							<p>
								You can buy your Solar Panel system and equipment outrightly
								using cash, bank transfers and electronic payment platforms.
							</p>

							<p className=' mt-2'>
								This option is great for you if you can afford to make a one-off
								payment. It allows you to take full ownership of your solar
								energy system upfront, enjoying immediate benefits. It offers a
								long-term savings without the constraints of monthly repayments.
							</p>
							<p className='mt-2'>
								The process is fast and straightforward, no applications needed
								and no need for approval.
							</p>

							<div className='mt-2'>
								<p className='font-medium'>What you will gain</p>
								<ul className='list-disc px-4'>
									<li>
										If it’s within your budget, purchasing your solar energy
										system outright is best.
									</li>
									<li>
										You don’t have to pay interest as you would with other
										options for financing solar systems.
									</li>
								</ul>
							</div>

							<p className='grid mt-2'>
								Ready to take control of your energy future with our outright
								purchase?{' '}
								<Link href={'/store'} className=' underline text-greens'>
									Click here get started
								</Link>
							</p>
						</div>

						{/* flex 2 */}
						{/* <div className='w-full'>
							<div className=''>
								<img className='w-full h-full' src='/Store 1.png' alt='' />
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OutrightTab;
