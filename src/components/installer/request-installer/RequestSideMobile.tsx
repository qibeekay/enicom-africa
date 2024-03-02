'use client';
import { getUser } from '@/api/products/products';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface CloseProps {
	close: () => void;
}
const RequestSideMobile: React.FC<CloseProps> = ({ close }) => {
	const pathname = usePathname();
	const [status, setStatus] = useState('');
	const [agentStatus, setAgentStatus] = useState('');

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Function to check if a path is active
	const isActive = (path: string) => {
		return path === pathname;
	};

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// Function to get user data
	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			setStatus(getusers.is_verified_seller);
			setAgentStatus(getusers.is_verified_agent);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
		}
	};

	// useEffect to fetch user data when the component mounts
	useEffect(() => {
		getuser();
	}, []);
	return (
		<div className='md:hidden fixed bg-white shadows py-5 w-[20rem] rounded-lg h-screen text-dark z-50'>
			<div>
				<div className='flex items-center justify-between pr-4'>
					{agentStatus ? (
						<h1 className='px-8 font-bold text-lg'>Place Request & Bids</h1>
					) : (
						<h1 className='px-8 font-bold text-lg'>Place Requests</h1>
					)}
					<div className=' cursor-pointer' onClick={close}>
						<FaTimes size={25} />
					</div>
				</div>

				{/* links */}
				<div className='mt-7'>
					<ul className='grid gap-3 w-full'>
						{/* Conditionally render li based on agentStatus */}
						{agentStatus ? (
							<>
								<li
									className={`py-2 px-7 text-dark ${
										isActive('/request-installer')
											? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
											: ''
									}`}>
									<Link href={'/request-installer'}>Place Request</Link>
								</li>
								<li
									className={`py-2 px-7 text-dark ${
										isActive('/all-bids')
											? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
											: ''
									}`}>
									<Link href={'/all-bids'}>All Bids</Link>
								</li>
								<li
									className={`py-2 px-7 text-dark ${
										isActive('/agent-dashboard')
											? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
											: ''
									}`}>
									<Link href={'/agent-dashboard'}>Installation Requests</Link>
								</li>
							</>
						) : (
							<>
								<li
									className={`py-2 px-7 text-dark ${
										isActive('/request-installer')
											? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
											: ''
									}`}>
									<Link href={'/request-installer'}>Place Request</Link>
								</li>
								<li
									className={`py-2 px-7 text-dark ${
										isActive('/all-bids')
											? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
											: ''
									}`}>
									<Link href={'/all-bids'}>All Bids</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default RequestSideMobile;
