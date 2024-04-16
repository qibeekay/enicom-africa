'use client';
import React from 'react';
import { AccountNav, MenuDrawer, PaymentMain } from '@/components';

const PaymentPage = () => {
	const [openRight, setOpenRight] = React.useState(false);
	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<PaymentMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default PaymentPage;
