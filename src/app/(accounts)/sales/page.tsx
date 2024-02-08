'use client';
import { SalesPage } from '@/components';
import { TabProvider } from '@/components/TabContext';

export default function Sales() {
	return (
		<div>
			<TabProvider>
				<SalesPage />
			</TabProvider>
		</div>
	);
}
