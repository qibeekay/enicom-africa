'use client';
import { useState } from 'react';
import { PurchasePage } from '@/components';
import { ThemeProvider } from '@material-tailwind/react';
import { TabProvider } from '@/components/TabContext';
import { CartProvider } from '@/components/CartContext';
import { FormDataProvider } from '@/components/stores/purchase/FormDataContext';

export default function Purchase() {
	return (
		<div>
			<TabProvider>
				<ThemeProvider>
					<CartProvider>
						<FormDataProvider>
							<PurchasePage />
						</FormDataProvider>
					</CartProvider>
				</ThemeProvider>
			</TabProvider>
		</div>
	);
}
