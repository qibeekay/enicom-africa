import React from 'react';

const CardPayment = () => {
	return (
		<div className='font-poppins text-dark'>
			<div className='mt-10 w-full sm:w-[70%] md:w-[60%] lg:w-[50%] mx-auto'>
				<h1 className=' font-medium text-lg text-dark/80'>CARD DETAILS</h1>
				<form action='' className='flex flex-col gap-10 mt-5'>
					{/* card number */}
					<div className=' border border-dark/60 rounded-lg px-6 py-2 '>
						<p className='text-sm text-dark/50'>CARD NUMBER</p>
						<input
							type='text'
							placeholder='0000 0000 0000 0000'
							className='w-full outline-none mt-2 placeholder:text-dark/80'
						/>
					</div>

					<div className='flex flex-col xs:flex-row items-center gap-4 w-full '>
						<div className=' border rounded-lg w-full border-dark/60 px-6 py-2'>
							<p className='text-sm text-dark/50'>CARD EXPIRY</p>
							<input
								type='text'
								pattern='^(0[1-9]|1[0-2])\/\d{2}$'
								placeholder='MM/YY'
								className='w-full outline-none mt-2 placeholder:text-dark/80'
							/>
						</div>

						{/* cvv */}
						<div className=' border rounded-lg w-full border-dark/60 px-6 py-2'>
							<p className='text-sm text-dark/50'>CVV</p>
							<input
								type='text'
								placeholder='123'
								className='w-full outline-none mt-2 placeholder:text-dark/80'
							/>
						</div>
					</div>

					{/* button */}
					<button className='bg-greens text-white w-full rounded-lg py-4'>
						Pay $100,000
					</button>
				</form>
			</div>
		</div>
	);
};

export default CardPayment;
