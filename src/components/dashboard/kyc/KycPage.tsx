'use client';
import React, { useState } from 'react';
import Kyc1 from './Kyc1';
import Kyc2 from './Kyc2';
import Kyc3 from './Kyc3';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const KycPage = () => {
	const [activeTab, setActiveTab] = useState('1');
	const [progress, setProgress] = useState(35);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
		// Calculate the progress based on the clicked tab
		let newProgress = 0;
		switch (tab) {
			case '1':
				newProgress = 35;
				break;
			case '2':
				newProgress = 70;
				break;
			case '3':
				newProgress = 100;
				break;
			default:
				newProgress = 0;
		}
		setProgress(newProgress);
	};

	const router = useRouter();
	const handleBack = () => {
		router.back();
	};

	// Determine the progress bar color based on the progress
	const progressBarColor = progress < 100 ? 'bg-greens' : 'bg-greens';

	return (
		<div>
			<div className='relative'>
				<div className='flex items-center justify-center py-7 relative'>
					<button
						className='absolute top-[50%] -translate-y-1/2 left-6 '
						onClick={handleBack}>
						Back
					</button>
					<button
						onClick={() => handleTabClick('1')}
						className={`w-[2rem] h-[2rem] rounded-full border-dark/50 border  ${
							activeTab === '1'
								? ' font-semibold bg-greens border-greens text-white'
								: 'border-dark/50 border text-dark/50'
						}`}>
						1
					</button>
					{/* <hr className='w-[2rem]' /> */}
					{/* <button
						onClick={() => handleTabClick('2')}
						className={`w-[2rem] h-[2rem] rounded-full border-dark/50 border ${
							activeTab === '2'
								? 'font-semibold bg-greens border-greens text-white'
								: 'border-dark/50 border text-dark/50'
						}`}>
						2
					</button> */}
					{/* <hr className='w-[2rem]' /> */}
					{/* <button
						onClick={() => handleTabClick('3')}
						className={`w-[2rem] h-[2rem] rounded-full border-dark/50 border ${
							activeTab === '3'
								? 'font-semibold bg-greens border-greens text-white'
								: 'border-dark/50 border text-dark/50'
						}`}>
						3
					</button> */}
				</div>
				{/* <div className='w-full bg-greens/10 h-1.5'>
					<div
						className={`h-1.5 ${progressBarColor} transition-width duration-700`}
						style={{ width: `${progress}%` }}></div>
				</div> */}
				<div>
					{activeTab === '1' && <Kyc1 />}
					{activeTab === '2' && <Kyc2 />}
					{activeTab === '3' && <Kyc3 />}
				</div>
			</div>
		</div>
	);
};
export default KycPage;
