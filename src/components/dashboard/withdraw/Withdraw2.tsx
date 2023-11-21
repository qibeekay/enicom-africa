import React from 'react';

const Withdraw2 = () => {
	return (
		<div className='w-full my-20 font-poppins text-dark'>
			<div>
				<div className='bg-greens/5 rounded-lg py-10 px-20 w-[60%] mx-auto '>
					<div>
						<h1 className='text-center font-semibold text-lg'>Details</h1>
						<div className='grid gap-y-5'>
							{/* amount */}
							<div className='flex justify-between'>
								<h1 className=' font-medium '>Amount</h1>
								<p>10,000</p>
							</div>

							{/* payment */}
							<div className='flex justify-between'>
								<h1 className=' font-medium '>Payment Account</h1>
								<div>
									<button
										type='submit'
										className='bg-greens/10 text-dark py-2 px-10 rounded-lg w-[10rem]'>
										Edit
									</button>
								</div>
							</div>

							{/* recipient */}
							<div className='flex justify-between'>
								<h1 className=' font-medium '>Recipient</h1>
								<p className='flex flex-col text-right'>
									Oyero Habibullah Money <span>98768776</span>
								</p>
							</div>

							{/* Bank */}
							<div className='flex justify-between'>
								<h1 className=' font-medium '>Bank</h1>
								<div className='flex gap-4'>
									<div className='w-4 overflow-hidden aspect-square'>
										<img className='w-full h-full' src='' alt='' />
									</div>
									<p className=''> GT Bank</p>
								</div>
							</div>

							<div className='flex gap-4 items-center justify-center mt-10'>
								{/* edit */}
								<div>
									<button
										type='submit'
										className='bg-greens/10 text-dark py-2 px-10 rounded-lg w-[10rem]'>
										Edit
									</button>
								</div>

								{/* Confirm */}
								<div>
									<button
										type='submit'
										className='bg-greens text-white py-2 px-10 rounded-lg w-[10rem]'>
										Confirm
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Withdraw2;
