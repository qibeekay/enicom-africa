'use client';
import React, { useState } from 'react';
import AdminNav from '../AdminNav';
import { RiMenuFoldLine } from 'react-icons/ri';
import { PlanMain, AdminMobileNav } from '@/components';

const PlanPage = () => {
	const [isSideMenuOpen, setSideMenuOpen] = useState(false);

	const toggleSideMenu = () => {
		setSideMenuOpen(!isSideMenuOpen);
	};
	return (
		<div className='relative bg-[#eeeeee] h-auto'>
			<div className='hidden lg:grid fixed w-[15rem] h-screen'>
				<AdminNav />
			</div>
			{isSideMenuOpen && (
				<div className='lg:hidden h-screen fixed w-[15rem] z-40'>
					<AdminMobileNav close={toggleSideMenu} />
				</div>
			)}
			<div className='relative '>
				<div
					className='lg:hidden cursor-pointer absolute top-6 left-2'
					onClick={toggleSideMenu}>
					<RiMenuFoldLine size={20} />
				</div>
				<div className='lg:absolute w-full right-0 lg:w-[75%] ll:w-[80%]'>
					<PlanMain />
				</div>
			</div>
		</div>
	);
};

export default PlanPage;
