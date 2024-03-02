'use client';
import { GetAllBidsPage, RequestInstallerPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function AllBids() {
	return (
		<div>
			<ThemeProvider>
				<CartProvider>
					<GetAllBidsPage />
				</CartProvider>
			</ThemeProvider>
		</div>
	);
}
