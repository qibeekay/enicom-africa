import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RxDashboard } from 'react-icons/rx';

const AdminNav = () => {
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
								className='flex items-center gap-2 bg-greens text-white px-10 py-2 rounded-r-xl'>
								<RxDashboard size={25} />
								Overview
							</Link>
						</li>

						<li>
							<Link
								href={'/admin/plan'}
								className='flex items-center gap-2 text-dark px-10 py-2 rounded-r-xl'>
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
