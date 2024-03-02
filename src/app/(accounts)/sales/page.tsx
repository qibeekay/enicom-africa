'use client';
import { SalesPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { TabProvider } from '@/components/TabContext';

export default function Sales() {
	return (
		<div>
			<TabProvider>
				<CartProvider>
					<SalesPage />
				</CartProvider>
			</TabProvider>
		</div>
	);
}
