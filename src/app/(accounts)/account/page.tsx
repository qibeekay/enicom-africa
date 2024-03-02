import { AccountPage } from '@/components';
import { CartProvider } from '@/components/CartContext';

export default function Account() {
	return (
		<div>
			<CartProvider>
				<AccountPage />
			</CartProvider>
		</div>
	);
}
