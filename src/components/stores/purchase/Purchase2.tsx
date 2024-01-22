'use client';
import React, { useState } from 'react';
import WalletsPurchase from './WalletsPurchase';
import CardPayment from './CardPayment';

const Purchase1 = () => {
	const [activeTab, setActiveTab] = useState('1');

	return (
		<div className='font-poppins my-20'>
			<div className='px-4 md:px-[5rem]'>
				<h1 className=' text-lg font-medium'>Add Money</h1>

				{/* payment type */}
				<div className='flex flex-col sm:flex-row items-center mt-5'>
					{/* bank transfer */}
					<button
						onClick={() => setActiveTab('1')}
						className={`w-full sm:w-auto py-2 px-10 ${
							activeTab === '1'
								? 'bg-greens text-white rounded-lg'
								: 'bg-greens/10 text-dark rounded-lg'
						}`}>
						Wallet
					</button>

					{/* debit card */}
					<button
						onClick={() => setActiveTab('2')}
						className={`w-full sm:w-auto py-2 px-10 ${
							activeTab === '2'
								? 'bg-greens text-white rounded-lg'
								: 'bg-greens/10 text-dark rounded-lg'
						}`}>
						Debit Card
					</button>
				</div>
				<div>
					{activeTab === '1' && <WalletsPurchase />}
					{activeTab === '2' && <CardPayment />}
				</div>
			</div>
		</div>
	);
};

export default Purchase1;
