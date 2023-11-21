'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface CloseProps {
	close: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
}

const AccountSideMobile: React.FC<CloseProps> = ({ close }) => {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return path === pathname;
	};
	return (
		<div className='md:hidden fixed bg-white shadows py-5 w-[20rem] rounded-lg h-screen text-dark'>
			<div className=''>
				<div className='flex items-center justify-between pr-4'>
					<h1 className='px-8'>Account</h1>
					<div className=' cursor-pointer' onClick={close}>
						<FaTimes size={25} />
					</div>
				</div>

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

export default AccountSideMobile;
