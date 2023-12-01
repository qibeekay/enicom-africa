'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Tab1, Tab2, Tab3 } from '..';
import { TbUserCheck } from 'react-icons/tb';
import { MdDownloading } from 'react-icons/md';
import { PiBookThin } from 'react-icons/pi';

const SellerTab = () => {
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
			<div className='relative font-poppins'>
				<div className=''>
					<div className='w-full bg-greens/10 h-1.5'>
						<div
							className={`h-1.5 ${progressBarColor} transition-width duration-700`}
							style={{ width: `${progress}%` }}></div>
					</div>

					<div className='flex mt-5 mx-auto w-[85%] gap-[8rem]'>
						<div className='flex flex-col gap-5 w-[18rem] font-medium text-dark/60 '>
							<div>
								{activeTab === '1' && <p>1/3</p>}
								{activeTab === '2' && <p>2/3</p>}
								{activeTab === '3' && <p>3/3</p>}
							</div>
							{/* bank transfer */}
							<button
								onClick={() => handleTabClick('1')}
								className={`w-full sm:w-auto py-2 flex items-center justify-center ${
									activeTab === '1' ? 'bg-bgGreen text-dark rounded-lg' : ''
								}`}>
								<div className='flex items-center gap-4'>
									<PiBookThin
										className={activeTab === '1' ? 'text-greens' : ''}
										size='25'
									/>
									Personal Info
								</div>
							</button>

							{/* debit card */}
							<button
								onClick={() => handleTabClick('2')}
								className={`w-full sm:w-auto py-2 flex items-center justify-center ${
									activeTab === '2' ? 'bg-bgGreen text-dark rounded-lg' : ''
								}`}>
								<div className='flex items-center gap-4'>
									<TbUserCheck
										className={activeTab === '2' ? 'text-greens' : ''}
										size='25'
									/>
									Verifications
								</div>
							</button>

							{/* debit card */}
							<button
								onClick={() => handleTabClick('3')}
								className={`w-full sm:w-auto py-2 flex items-center justify-center ${
									activeTab === '3' ? ' bg-bgGreen text-dark rounded-lg' : ''
								}`}>
								<div className='flex items-center gap-4'>
									<MdDownloading
										size='20'
										className={activeTab === '3' ? 'text-greens' : ''}
									/>
									Upload Product
								</div>
							</button>
						</div>

						<div className=' w-full'>
							{activeTab === '1' && <Tab1 />}
							{activeTab === '2' && <Tab2 />}
							{activeTab === '3' && <Tab3 />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerTab;
