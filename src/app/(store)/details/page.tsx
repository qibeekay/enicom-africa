'use client';
import { DetailsPage } from '@/components';
import { ThemeProvider } from '@material-tailwind/react';

export default function Details() {
	return (
		<div>
			<ThemeProvider>
				<DetailsPage />
			</ThemeProvider>
		</div>
	);
}
