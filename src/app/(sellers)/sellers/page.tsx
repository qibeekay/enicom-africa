'use client';
import { SellerPage } from '@/components';
import { ThemeProvider } from '@material-tailwind/react';

export default function Seller() {
	return (
		<div>
			<ThemeProvider>
				<SellerPage />
			</ThemeProvider>
		</div>
	);
}
