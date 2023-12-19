'use client';
import { DetailsPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function Details() {
	return (
		<div>
			<ThemeProvider>
				<CartProvider>
					<DetailsPage />
				</CartProvider>
			</ThemeProvider>
		</div>
	);
}
