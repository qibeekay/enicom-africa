'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';

interface CloseProps {
	close: () => void;
}
const AdminMobileNav: React.FC<CloseProps> = ({ close }) => {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return path === pathname;
	};
	return (
		<div className=' text-dark bg-[#e2eae2] h-screen'>
			<div>
				{/*image  */}
				<div className='grid items-center cursor-pointer relative'>
					<Image src={'/logo.png'} width={150} height={150} alt='logo' />
					<div
						className=' cursor-pointer absolute right-0 top-2'
						onClick={close}>
						<FaTimes size={20} />
					</div>
				</div>

				{/* links */}
				<div>
					<ul>
						<li>
							<Link
								href={''}
								className='flex items-center gap-2 bg-greens text-white'>
								<RxDashboard />
								Overview
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AdminMobileNav;
