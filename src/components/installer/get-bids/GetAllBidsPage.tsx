'use client';
import { AccountNav, GetAllBidsMain, MenuDrawer } from '@/components';
import React from 'react';

const GetAllBidsPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<GetAllBidsMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default GetAllBidsPage;
