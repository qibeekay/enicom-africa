'use client';
import { AgentsPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { TabProvider } from '@/components/TabContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function Agents() {
	return (
		<div>
			<ThemeProvider>
				<CartProvider>
					<AgentsPage />
				</CartProvider>
			</ThemeProvider>
		</div>
	);
}
