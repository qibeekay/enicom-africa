'use client';

import React from 'react';
import { AccountNav, LoansMain, MenuDrawer } from '@/components';

const LoansPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<LoansMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default LoansPage;
