'use client';
import { PlanPage } from '@/components';
import WithAuths from '@/components/WithAuths';

const Plan = () => {
	return (
		<div>
			<PlanPage />
		</div>
	);
};

export default WithAuths(Plan);
