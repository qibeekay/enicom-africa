import { DasboardNav, DetailsItems } from '@/components';
import React from 'react';
import { MdLiveHelp } from 'react-icons/md';

const DetailsPage = () => {
	return (
		<div className='font-poppins relative'>
			<DasboardNav />

			{/* items details */}
			<DetailsItems />

			{/* absolute */}
			<div className='fixed right-2 md:right-10 z-50 bottom-5 md:bottom-10 cursor-pointer text-greens '>
				<MdLiveHelp size={45} />
			</div>
		</div>
	);
};

export default DetailsPage;
