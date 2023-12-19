'use client';
import { CartPage } from '@/components';
import { CartProvider } from '@/components/CartContext';
import { ThemeProvider } from '@material-tailwind/react';
import React from 'react';

const page = () => {
	return (
		<div>
			<ThemeProvider>
				<CartProvider>
					<CartPage />
				</CartProvider>
			</ThemeProvider>
		</div>
	);
};

export default page;
