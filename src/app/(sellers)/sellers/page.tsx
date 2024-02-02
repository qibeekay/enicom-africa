'use client';
import { SellerPage } from '@/components';
import { TabProvider } from '@/components/TabContext';
import { ThemeProvider } from '@material-tailwind/react';

export default function Seller() {
	return (
		<div>
			<ThemeProvider>
				<TabProvider>
					<SellerPage />
				</TabProvider>
			</ThemeProvider>
		</div>
	);
}
