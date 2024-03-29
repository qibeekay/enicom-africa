'use client';
import { OrdersPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function Orders() {
	return (
		<div>
			<ThemeProvider>
				<CartProvider>
					<OrdersPage />
				</CartProvider>
			</ThemeProvider>
		</div>
	);
}
