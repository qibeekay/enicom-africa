import React from 'react';

const AddBank = () => {
	return (
		<div className='w-full'>
			{/* form */}
			<div className='w-full'>
				<form action='' className='grid gap-y-10 mt-10 w-full'>
					{/* amount */}
					<div className='flex flex-col sm:w-[22rem] w-full'>
						<label htmlFor='amount' className='font-medium'>
							Amount
						</label>
						<input
							type='text'
							className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
							placeholder='N100 - N 1,000,000'
						/>
					</div>

					{/* card number */}
					<div className='flex flex-col sm:w-[22rem] w-full'>
						<label htmlFor='cardNumber' className='font-medium'>
							Card Number
						</label>
						<input
							type='text'
							className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
							placeholder='0000 0000 0000 0000'
						/>
					</div>

					{/* expiry / cvv */}
					<div className='flex flex-col xs:flex-row items-center gap-4 sm:gap-10 sm:w-[22rem] w-full'>
						{/* expiry date */}
						<div className='flex flex-col w-full sm:w-[9.7rem]'>
							<label htmlFor='expiry' className='font-medium'>
								Expiry Date
							</label>
							<input
								type='text'
								className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
								placeholder='MM/YY'
							/>
						</div>

						{/* cvv */}
						<div className='flex flex-col w-full sm:w-[9.7rem]'>
							<label htmlFor='cvv' className='font-medium'>
								CVV
							</label>
							<input
								type='text'
								className='mt-2 bg-greens/10 text-dark outline-none py-2 px-5 rounded-lg w-full'
								placeholder='123'
							/>
						</div>
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

export default AddBank;
