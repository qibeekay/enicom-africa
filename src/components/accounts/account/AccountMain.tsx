'use client';
import React, { useState } from 'react';
import { AccountMainDetails, AccountMainSide } from '@/components';
import { MdLiveHelp } from 'react-icons/md';
import { HiEllipsisVertical } from 'react-icons/hi2';
import AccountSideMobile from './AccountSideMobile';

const AccountMain = () => {
	const [isSideMenuOpen, setSideMenuOpen] = useState(false);

	const toggleSideMenu = () => {
		setSideMenuOpen(!isSideMenuOpen);
	};
	return (
		<div className='px-4 lg:px-[4rem] py-10 bg-[#E4FEE3] relative'>
			<div className='flex w-full md:gap-8 relative'>
				{/* Button to toggle side menu on mobile */}
				<div className='md:hidden cursor-pointer text-greens'>
					<HiEllipsisVertical size={40} onClick={toggleSideMenu} />
				</div>
				{/* Side menu for mobile */}
				{isSideMenuOpen && <AccountSideMobile close={toggleSideMenu} />}
				<AccountMainSide />
				<AccountMainDetails />

				{/* absolute */}
				<div className='fixed right-10 z-50 bottom-10 cursor-pointer text-greens '>
					<MdLiveHelp size={45} />
				</div>
			</div>
		</div>
	);
};

export default AccountMain;
