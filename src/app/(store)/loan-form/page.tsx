'use client';
import { LoanFormPage } from '@/components';
import { TabProvider } from '@/components/TabContext';

export default function LoanForm() {
	return (
		<div>
			<TabProvider>
				<LoanFormPage />
			</TabProvider>
		</div>
	);
}
