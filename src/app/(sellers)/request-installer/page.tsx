'use client';
import { RequestInstallerPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function RequestInstaller() {
	return (
		<div>
			<ThemeProvider>
				<CartProvider>
					<RequestInstallerPage />
				</CartProvider>
			</ThemeProvider>
		</div>
	);
}
