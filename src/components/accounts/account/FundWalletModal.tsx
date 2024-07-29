import React, { useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';

interface OverviewModalProps {
	handleOpen: (loanToken: string) => void;
	onSubmit: (amount: number) => void;
}
const FundWalletModal: React.FC<OverviewModalProps> = (
	handleOpen,
	onSubmit
) => {
	const [amount, setAmount] = useState<string>('');

	const handleSubmit = () => {
		const amountNumber = parseFloat(amount);
		if (!isNaN(amountNumber) && amountNumber > 0) {
			onSubmit(amountNumber);
			handleOpen;
		} else {
			alert('Please enter a valid amount.');
		}
	};
	return (
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-1 md:px-8 h-screen overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={() => handleOpen}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				<h2>Fund Wallet</h2>
				<input
					type='number'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					placeholder='Enter amount'
				/>
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	);
};

export default FundWalletModal;
