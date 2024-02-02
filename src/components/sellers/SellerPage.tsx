'use client';
import React, { useEffect } from 'react';
import { SellerMain, SellerNav } from '..';
import { getUser } from '@/api/products/products';

const SellerPage = () => {
	return (
		<div>
			<SellerNav />
			<SellerMain />
		</div>
	);
};

export default SellerPage;
