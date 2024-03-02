import { PaymentPage } from '@/components';
import { CartProvider } from '@/components/CartContext';

export default function Payment() {
	return (
		<div>
			<CartProvider>
				<PaymentPage />
			</CartProvider>
		</div>
	);
}
