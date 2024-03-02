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
		<div className=' text-dark bg-[#e2eae2] h-screen w-[20rem] fixed z-[9999]'>
			<div>
				{/*image  */}
				<div className='flex items-center justify-between px-4 py-5'>
					<div className='grid items-center cursor-pointer'>
						<Image src={'/logo.png'} width={150} height={150} alt='logo' />
					</div>

					<div className='cursor-pointer' onClick={close}>
						<FaTimes />
					</div>
				</div>

				{/* links */}
				<div>
					<ul className=' grid gap-6'>
						<li>
							<Link
								href={'/admin/overview'}
								className={`px-10 py-2 text-dark flex items-center gap-2 rounded-r-xl ${
									isActive('/admin/overview') ? 'text-white bg-greens' : ''
								}`}>
								<RxDashboard size={25} />
								Overview
							</Link>
						</li>

						<li>
							<Link
								href={'/admin/plan'}
								className={`px-10 py-2 text-dark flex items-center gap-2 rounded-r-xl ${
									isActive('/admin/plan') ? 'text-white bg-greens' : ''
								}`}>
								<RxDashboard size={25} />
								Plans
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AdminMobileNav;
