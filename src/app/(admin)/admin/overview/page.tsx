'use client';
import { OverviewPage } from '@/components';
import WithAuths from '@/components/WithAuths';

const Overview = () => {
	return (
		<div>
			<OverviewPage />
		</div>
	);
};

export default WithAuths(Overview);
