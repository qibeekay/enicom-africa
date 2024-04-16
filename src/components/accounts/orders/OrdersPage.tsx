'use client';
import React from 'react';
import { MenuDrawer, OrdersMain, AccountNav } from '@/components';

const OrdersPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<AccountNav openRight={() => setOpenRight(true)} />
			<OrdersMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default OrdersPage;
