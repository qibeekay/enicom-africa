'use client';

import React from 'react';
import { AccountNav, MenuDrawer, SalesMain } from '@/components';

const SalesPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<SalesMain />

			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default SalesPage;
