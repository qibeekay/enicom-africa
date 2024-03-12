'use client';
import { LoanCalculatorPage } from '@/components';
import { CartProvider } from '@/components/CartContext';

export default function LoanFacility() {
	return (
		<div>
			<CartProvider>
				<LoanCalculatorPage />
			</CartProvider>
		</div>
	);
}
