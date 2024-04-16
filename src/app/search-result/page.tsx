import { SearchPage } from '@/components';
import { CartProvider } from '@/components/CartContext';

export default function SearchResults() {
	return (
		<div>
			<CartProvider>
				<SearchPage />
			</CartProvider>
		</div>
	);
}
