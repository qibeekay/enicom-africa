'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Tab1, Tab2, Tab3 } from '..';
import { TbUserCheck } from 'react-icons/tb';
import { MdDownloading } from 'react-icons/md';
import { PiBookThin } from 'react-icons/pi';
import { useTabContext } from '../TabContext';
import { getUser } from '@/api/products/products';

const SellerTab = () => {
	const { activeTab, setTab } = useTabContext();
	const [progress, setProgress] = useState(35);
	const pathname = usePathname();
	const [status, setStatus] = useState('');
	const [agentStatus, setAgentStatus] = useState('');
	const [loading, setLoading] = useState<boolean>(true);

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const handleTabClick = (tab: string) => {
		setTab(tab);
		// Calculate the progress based on the clicked tab
		// let newProgress = 0;
		// switch (tab) {
		// 	case '1':
		// 		newProgress = 35;
		// 		break;
		// 	case '2':
		// 		newProgress = 70;
		// 		break;
		// 	case '3':
		// 		newProgress = 100;
		// 		break;
		// 	default:
		// 		newProgress = 0;
		// }
		// setProgress(newProgress);
	};

	const router = useRouter();
	const handleBack = () => {
		router.back();
	};

	// Determine the progress bar color based on the progress
	// const progressBarColor = progress < 100 ? 'bg-greens' : 'bg-greens';

	useEffect(() => {
		// Retrieve the data from local storage
		const userData = localStorage.getItem('userResponse');
		console.log('data', userData);

		if (userData) {
			// Parse the data to convert it into a JavaScript object
			const userObject = JSON.parse(userData);

			// Access and set the seller status
			setStatus(userObject.is_verified_seller);
			setAgentStatus(`${userObject.is_verified_agent}`);
		}
	}, []);

	// const getuser = async () => {
	// 	try {
	// 		const getusers = await getUser(`$${token}`, `${usertoken}`);
	// 		setStatus(getusers.is_verified_seller);
	// 		setAgentStatus(getusers.is_verified_agent);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		// console.error('Error fetching cart items:', error);
	// 		console.log('error');
	// 		setLoading(false);
	// 	}
	// };

	// console.log(agentStatus);

	// // useEffect to fetch user data when the component mounts
	// useEffect(() => {
	// 	getuser();
	// }, []);

	return (
		<div>
			<div className='relative font-poppins pb-10'>
				<div className=''>
					{/* <div className='w-full bg-greens/10 h-1.5'>
						<div
							className={`h-1.5 ${progressBarColor} transition-width duration-700`}
							style={{ width: `${progress}%` }}></div>
					</div> */}
					<button className=' text-greens ml-5' onClick={handleBack}>
						Go back
					</button>

					<div className='flex flex-col md:flex-row mt-5 mx-auto w-full px-4 md:px-0 md:w-[85%] gap-y-4 md:gap-[6rem]'>
						<div className='flex flex-wrap items-center justify-between md:items-start md:justify-start md:flex-col gap-5 w-full md:w-[20rem] font-medium text-dark/60 '>
							{status ? (
								<div>
									{/* upload product */}
									<button
										onClick={() => handleTabClick('2')}
										className={`w-full sm:w-auto py-2 px-2 flex items-center justify-center ${
											activeTab === '2'
												? ' bg-bgGreen text-dark rounded-lg'
												: 'bg-bgGreen text-dark rounded-lg'
										}`}>
										<div className='flex items-center gap-4'>
											<MdDownloading
												size='20'
												className={
													activeTab === '2' ? 'text-greens' : 'text-greens'
												}
											/>
											Upload Product
										</div>
									</button>
								</div>
							) : (
								<div>
									{/* update info */}
									<button
										onClick={() => handleTabClick('1')}
										className={`w-full sm:w-auto py-2 px-2 flex items-center justify-center ${
											activeTab === '1'
												? 'bg-bgGreen text-dark rounded-lg'
												: 'bg-bgGreen text-dark rounded-lg'
										}`}>
										<div className='flex items-center gap-4'>
											<PiBookThin
												className={
													activeTab === '1' ? 'text-greens' : 'text-greens'
												}
												size='25'
											/>
											Personal Info
										</div>
									</button>
								</div>
							)}
						</div>

						<div className=' w-full'>{status ? <Tab3 /> : <Tab1 />}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerTab;
