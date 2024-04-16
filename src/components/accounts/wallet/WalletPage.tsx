'use client';
import { AccountNav, MenuDrawer, WalletMain } from '@/components';
import React from 'react';

const WalletPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<WalletMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default WalletPage;
