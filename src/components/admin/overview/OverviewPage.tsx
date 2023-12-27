import React from 'react';
import AdminNav from '../AdminNav';
import OverviewMain from './OverviewMain';
import { RiMenuFoldLine } from 'react-icons/ri';

const OverviewPage = () => {
	return (
		<div className='relative min-h-screen bg-[#eeeeee]'>
			<div className='hidden lg:grid fixed w-[15rem]'>
				<AdminNav />
			</div>
			<div>
				<div className='lg:hidden'>
					<RiMenuFoldLine />
				</div>
				<div className='lg:absolute w-full right-0 lg:w-[75%] ll:w-[80%]'>
					<OverviewMain />
				</div>
			</div>
		</div>
	);
};

export default OverviewPage;
