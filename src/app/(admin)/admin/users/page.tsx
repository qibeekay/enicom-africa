'use client';
import { HomePage } from '@/components';
import WithAuths from '@/components/WithAuths';

const Users = () => {
	return (
		<div>
			<HomePage />
		</div>
	);
};

export default WithAuths(Users);
