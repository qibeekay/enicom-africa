import React from 'react';
import { OrdersMain } from '@/components';
import AccountNav from '../account/AccountNav';

const OrdersPage = () => {
	return (
		<div>
			<AccountNav />
			<OrdersMain />
		</div>
	);
};

export default OrdersPage;
