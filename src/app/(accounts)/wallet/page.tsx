'use client';
import { WalletPage } from '@/components';
import { ThemeProvider } from '@material-tailwind/react';

export default function Wallet() {
	return (
		<div>
			<ThemeProvider>
				<WalletPage />
			</ThemeProvider>
		</div>
	);
}
