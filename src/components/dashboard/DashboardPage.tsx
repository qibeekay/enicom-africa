'use client';
import React from 'react';
import { DasboardNav, DashboardMain, MenuDrawer } from '@/components';

const DashboardPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<DasboardNav openRight={() => setOpenRight(true)} />
			<DashboardMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default DashboardPage;
