'use client';
import Link from 'next/link';
import React from 'react';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import WalletModal from './WalletModal';
import { Dialog } from '@material-tailwind/react';

const WalletMainDetails = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
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

					<div
						className='text-white bg-greens rounded-lg grid items-center justify-center w-[10rem] h-fit py-2 cursor-pointer'
						onClick={handleOpen}>
						<p>Withdraw</p>
					</div>
				</div>

				{/* transaction history */}
				<div className='border border-dark/30 rounded-lg px-5 py-3'>
					<h1>Transaction History</h1>
					<div className='flex flex-col gap-3 mt-4'>
						{/* transaction-1 */}
						<div>
							{/* payment details */}
							<div className='flex justify-between items-center'>
								<p>Payment received from sale of Solar Battery</p>
								<p className='text-[#4FFB24]'>+$1,000</p>
							</div>

							{/* date */}
							<div className='flex items-center gap-10 text-sm mt-1'>
								<p className='text-dark/60'>06/07/2022</p>
								<Link href={''} className='underline text-[#3592FF]'>
									View full details
								</Link>
							</div>
						</div>
						{/* transaction-1 */}
						<div>
							{/* payment details */}
							<div className='flex justify-between items-center'>
								<p>Payment received from sale of Solar Battery</p>
								<p className='text-[#4FFB24]'>+$1,000</p>
							</div>

							{/* date */}
							<div className='flex items-center gap-10 text-sm mt-1'>
								<p className='text-dark/60'>06/07/2022</p>
								<Link href={''} className='underline text-[#3592FF]'>
									View full details
								</Link>
							</div>
						</div>
						{/* transaction-1 */}
						<div>
							{/* payment details */}
							<div className='flex justify-between items-center'>
								<p>Debit transaction transferred to Tim’s investment pot</p>
								<p className='text-[#FF2B2B]'>-$1,000</p>
							</div>

							{/* date */}
							<div className='flex items-center gap-10 text-sm mt-1'>
								<p className='text-dark/60'>06/07/2022</p>
								<Link href={''} className='underline text-[#3592FF]'>
									View full details
								</Link>
							</div>
						</div>
					</div>
				</div>
				<Dialog
					size='sm'
					open={open}
					handler={handleOpen}
					className='bg-transparent shadow-none text-dark'>
					<WalletModal handleOpen={handleOpen} />
				</Dialog>
			</div>
		</div>
	);
};

export default WalletMainDetails;
