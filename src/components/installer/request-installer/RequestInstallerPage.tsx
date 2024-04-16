'use client';
import { AccountNav, MenuDrawer, RequestInstallerMain } from '@/components';
import React from 'react';

const RequestInstallerPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<RequestInstallerMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default RequestInstallerPage;
