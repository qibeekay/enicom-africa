'use client';
import { DasboardNav, DetailsItems, MenuDrawer } from '@/components';
import React from 'react';

const DetailsPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<DasboardNav openRight={() => setOpenRight(true)} />

			{/* items details */}
			<DetailsItems />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default DetailsPage;
