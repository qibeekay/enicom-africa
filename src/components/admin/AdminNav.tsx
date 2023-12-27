import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RxDashboard } from 'react-icons/rx';

const AdminNav = () => {
	return (
		<div className=' text-dark bg-greens/5 h-screen'>
			<div>
				{/*image  */}
				<div className='grid items-center cursor-pointer'>
					<Image src={'/logo.png'} width={150} height={150} alt='logo' />
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

export default AdminNav;
