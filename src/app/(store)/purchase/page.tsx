'use client';
import { useState } from 'react';
import { PurchasePage } from '@/components';
import { ThemeProvider } from '@material-tailwind/react';
import { TabProvider } from '@/components/TabContext';

export default function Purchase() {
	return (
		<div>
			<TabProvider>
				<ThemeProvider>
					<PurchasePage />
				</ThemeProvider>
			</TabProvider>
		</div>
	);
}
