'use client';

import React from 'react';
import { AccountMain, AccountNav, MenuDrawer } from '@/components';

const AccountPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<AccountMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default AccountPage;
