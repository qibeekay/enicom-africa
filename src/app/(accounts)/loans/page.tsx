'use client';
import { LoansPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { TabProvider } from '@/components/TabContext';

export default function Sales() {
	return (
		<div>
			<TabProvider>
				<CartProvider>
					<LoansPage />
				</CartProvider>
			</TabProvider>
		</div>
	);
}
