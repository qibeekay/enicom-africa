'use client';
import React, { useEffect } from 'react';
import { AccountNav, MenuDrawer, SellerMain, SellerNav } from '..';
import { getUser } from '@/api/products/products';

const SellerPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<div>
			{/* <SellerNav /> */}
			<AccountNav openRight={() => setOpenRight(true)} />
			<SellerMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</div>
	);
};

export default SellerPage;
