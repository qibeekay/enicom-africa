'use client';
import { AccountNav, BidMain, MenuDrawer } from '@/components';
import React from 'react';

const BidPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<BidMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default BidPage;
