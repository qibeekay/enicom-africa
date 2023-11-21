import Link from 'next/link';
import React from 'react';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

const WalletMainDetails = () => {
	return (
		<div className='w-full text-dark'>
			<div className='flex flex-col gap-y-7'>
				{/* account details */}
				<div className='flex gap-20'>
					{/* wallet details */}
					<div className='flex items-center gap-4'>
						<div className='bg-greens rounded-lg p-4 text-white w-[13rem]'>
							<div className='flex gap-x-5 text-white/70 items-center'>
								<p>Total Amount</p>
								<AiOutlineEyeInvisible size={20} />
							</div>

							<p className='mt-2 mb-5 font-semibold text-xl'>N1,500,000</p>
						</div>
						<div className='bg-white rounded-lg p-4 text-dark w-[13rem]'>
							<div className='flex gap-x-5 text-dark/70 items-center'>
								<p>Total Amount</p>
								<AiOutlineEyeInvisible size={20} />
							</div>

							<p className='mt-2 mb-5 font-semibold text-xl'>N1,500,000</p>
						</div>
					</div>

					<div className='text-white bg-greens rounded-lg grid items-center justify-center w-[10rem] h-fit py-2 cursor-pointer'>
						<p>Withdraw</p>
					</div>
				</div>

				{/* transaction history */}
				<div className='border border-dark/30 rounded-lg px-5 py-3'>
					<h1>Transaction History</h1>
				</div>
			</div>
		</div>
	);
};

export default WalletMainDetails;
