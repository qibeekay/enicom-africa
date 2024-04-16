'use client';
import { CartDetails, DasboardNav, MenuDrawer } from '@/components';
import React from 'react';

const CartPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<DasboardNav openRight={() => setOpenRight(true)} />
			<CartDetails />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default CartPage;
