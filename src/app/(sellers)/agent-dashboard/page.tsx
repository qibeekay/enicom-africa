'use client';
import { BidPage, RequestInstallerPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function RequestInstaller() {
	return (
		<div>
			<ThemeProvider>
				<CartProvider>
					<BidPage />
				</CartProvider>
			</ThemeProvider>
		</div>
	);
}
