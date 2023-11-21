'use client';
import { CartPage } from '@/components';
import { ThemeProvider } from '@material-tailwind/react';
import React from 'react';

const page = () => {
	return (
		<div>
			<ThemeProvider>
				<CartPage />
			</ThemeProvider>
		</div>
	);
};

export default page;
