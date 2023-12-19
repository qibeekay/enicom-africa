import { StorePage } from '@/components';
import { CartProvider } from '@/components/CartContext';

export default function Store() {
	return (
		<div>
			<CartProvider>
				<StorePage />
			</CartProvider>
		</div>
	);
}
