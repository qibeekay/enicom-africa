'use client';
import { OrdersPage } from '@/components';
import { ThemeProvider } from '@material-tailwind/react';

export default function Orders() {
	return (
		<div>
			<ThemeProvider>
				<OrdersPage />
			</ThemeProvider>
		</div>
	);
}
