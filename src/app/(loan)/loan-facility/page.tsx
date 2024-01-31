import { LoanFacilityPage } from '@/components';
import { CartProvider } from '@/components/CartContext';

export default function LoanFacility() {
	return (
		<div>
			<CartProvider>
				<LoanFacilityPage />
			</CartProvider>
		</div>
	);
}
