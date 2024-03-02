'use client';
import { WalletPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function Wallet() {
	return (
		<div>
			<ThemeProvider>
				<CartProvider>
					<WalletPage />
				</CartProvider>
			</ThemeProvider>
		</div>
	);
}
