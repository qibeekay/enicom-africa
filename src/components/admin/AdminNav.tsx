'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RxDashboard } from 'react-icons/rx';

const AdminNav = () => {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return path === pathname;
	};

	return (
		<div className=' text-dark bg-greens/5 h-screen'>
			<div>
				{/*image  */}
				<div className='grid items-center cursor-pointer px-10 py-8'>
					<Image src={'/logo.png'} width={150} height={150} alt='logo' />
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

export default AdminNav;
