'use client';
import { SellerPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { TabProvider } from '@/components/TabContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function Seller() {
	return (
		<div>
			<ThemeProvider>
				<TabProvider>
					<CartProvider>
						<SellerPage />
					</CartProvider>
				</TabProvider>
			</ThemeProvider>
		</div>
	);
}
