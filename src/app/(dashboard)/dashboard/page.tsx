import { DashboardPage } from '@/components';
import { CartProvider } from '@/components/CartContext';

export default function Dashboard() {
	return (
		<div>
			<CartProvider>
				<DashboardPage />
			</CartProvider>
		</div>
	);
}
