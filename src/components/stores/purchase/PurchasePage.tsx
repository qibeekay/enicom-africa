'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Purchase1 from './Purchase1';
import Purchase2 from './Purchase2';
import { useTabContext } from '@/components/TabContext';
import Purchase3 from './Purchase3';
import { useRouter } from 'next/navigation';

const PurchasePage = () => {
	const { activeTab, setTab } = useTabContext();
	const [progress, setProgress] = useState(35);

	const handleTabClick = (tab: string) => {
		setTab(tab);
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
					<hr className='w-[2rem]' />
					<button
						onClick={() => handleTabClick('2')}
						className={`w-[2rem] h-[2rem] rounded-full border-dark/50 border ${
							activeTab === '2'
								? 'font-semibold bg-greens border-greens text-white'
								: 'border-dark/50 border text-dark/50'
						}`}>
						2
					</button>
					<hr className='w-[2rem]' />
					<button
						onClick={() => handleTabClick('3')}
						className={`w-[2rem] h-[2rem] rounded-full border-dark/50 border ${
							activeTab === '3'
								? 'font-semibold bg-greens border-greens text-white'
								: 'border-dark/50 border text-dark/50'
						}`}>
						3
					</button>
				</div>
				<div className='w-full bg-greens/10 h-1.5'>
					<div
						className={`h-1.5 ${progressBarColor} transition-width duration-700`}
						style={{ width: `${progress}%` }}></div>
				</div>
				<div>
					{activeTab === '1' && <Purchase1 />}
					{activeTab === '2' && <Purchase2 />}
					{activeTab === '3' && <Purchase3 />}
				</div>
			</div>
		</div>
	);
};
export default PurchasePage;
