import React from 'react';

const Withdraw1 = () => {
	return (
		<div className='w-full my-20'>
			{/* form */}
			<div className='w-full px-4 md:px-[5rem]'>
				<form action='' className='grid gap-y-10 mt-10 w-full'>
					{/* acct number */}
					<div className='flex flex-col sm:w-[22rem] w-full'>
						<label htmlFor='amount' className='font-medium'>
							Recipients Account Number
						</label>
						<input
							type='text'
							className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
							placeholder='N100 - N 1,000,000'
						/>
						<div className='flex gap-2 mt-2'>
							{/* image */}
							<div className='w-[2rem] aspect-square rounded-full overflow-hidden'>
								<img className='w-full h-full object-cover' src='' alt='' />
							</div>

							{/* text */}
							<p className='font-medium text-greens'>Oyero Habibulah Money</p>
						</div>
					</div>

					{/* amount */}
					<div className='flex flex-col sm:w-[22rem] w-full'>
						<label htmlFor='amount' className='font-medium'>
							Amount
						</label>
						<input
							type='text'
							className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
							placeholder='N100 - N1,000,000'
						/>
					</div>

					{/* What’s it for? */}
					<div className='flex flex-col sm:w-[22rem] w-full'>
						<label htmlFor='what' className='font-medium'>
							What’s it for?
						</label>
						<input
							type='text'
							className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
							placeholder='What’s it for?'
						/>
					</div>

					<div className='w-full sm:w-[22rem] mt-5'>
						{/* submit */}
						<button
							type='submit'
							className='bg-greens text-white py-2 px-10 rounded-lg w-full'>
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Withdraw1;
