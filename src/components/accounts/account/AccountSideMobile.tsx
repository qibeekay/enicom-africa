'use client';
import { getUser } from '@/api/products/products';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface CloseProps {
	close: () => void;
}

const AccountSideMobile: React.FC<CloseProps> = ({ close }) => {
	const pathname = usePathname();
	const [status, setStatus] = useState('');
	const [agentStatus, setAgentStatus] = useState('');
	const [loading, setLoading] = useState<boolean>(true);

	const isActive = (path: string) => {
		return path === pathname;
	};

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			setStatus(getusers.is_verified_seller);
			setAgentStatus(getusers.is_verified_agent);
			setLoading(false);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
			setLoading(false);
		}
	};

	// console.log(agentStatus);

	// useEffect to fetch user data when the component mounts
	useEffect(() => {
		getuser();
	}, []);
	return (
		<div className='md:hidden fixed bg-white shadows py-5 w-[20rem] rounded-lg h-screen text-dark'>
			<div className=''>
				<div className='flex items-center justify-between pr-4'>
					<h1 className='px-8 font-bold text-lg'>Account</h1>
					<div className=' cursor-pointer' onClick={close}>
						<FaTimes size={25} />
					</div>
				</div>

				{/* links */}
				<div className='mt-7'>
					{status ? (
						<ul className='grid gap-3 w-full'>
							<li
								className={`py-2 px-7 text-dark ${
									isActive('/account')
										? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
										: ''
								}`}>
								<Link href={'/account'}>Overview</Link>
							</li>
							<li
								className={`py-2 px-7  text-dark ${
									isActive('/orders')
										? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
										: ''
								}`}>
								<Link href={'/orders'}>Orders</Link>
							</li>
							<li
								className={`py-2 px-7  text-dark ${
									isActive('/payment')
										? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
										: ''
								}`}>
								<Link href={'/payment'}>Payments</Link>
							</li>
							{/* <li
							className={`py-2 px-7  text-dark ${
								isActive('/wallet')
									? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
									: ''
							}`}>
							<Link href={'/wallet'}>Wallet</Link>
						</li> */}
							<li
								className={`py-2 px-7  text-dark ${
									isActive('/sales')
										? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
										: ''
								}`}>
								<Link href={'/sales'} className=''>
									Sales
								</Link>
							</li>
						</ul>
					) : (
						<ul className='grid gap-3 w-full'>
							<li
								className={`py-2 px-7 text-dark ${
									isActive('/account')
										? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
										: ''
								}`}>
								<Link href={'/account'}>Overview</Link>
							</li>
							<li
								className={`py-2 px-7  text-dark ${
									isActive('/orders')
										? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
										: ''
								}`}>
								<Link href={'/orders'}>Orders</Link>
							</li>
							<li
								className={`py-2 px-7  text-dark ${
									isActive('/payment')
										? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
										: ''
								}`}>
								<Link href={'/payment'}>Payments</Link>
							</li>
							{/* <li
							className={`py-2 px-7  text-dark ${
								isActive('/wallet')
									? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
									: ''
							}`}>
							<Link href={'/wallet'}>Wallet</Link>
						</li> */}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default AccountSideMobile;
