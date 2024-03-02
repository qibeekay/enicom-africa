'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const AccountMainSide = () => {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return path === pathname;
	};
	return (
		<div className='hidden md:block bg-white py-5 w-[20rem] rounded-lg h-screen text-dark'>
			<div className=''>
				<h1 className='px-8 font-bold text-lg'>Account</h1>

				{/* links */}
				<div className='mt-7'>
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
						<li
							className={`py-2 px-7  text-dark ${
								isActive('/wallet')
									? 'text-greens border-l-greens border-l-[3px] bg-[#E4FEE3]'
									: ''
							}`}>
							<Link href={'/wallet'}>Wallet</Link>
						</li>
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
				</div>
			</div>
		</div>
	);
};

export default AccountMainSide;
