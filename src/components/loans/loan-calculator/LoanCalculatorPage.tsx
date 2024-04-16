'use client';
import { DasboardNav, LoanCalculatorMain, MenuDrawer } from '@/components';
import React from 'react';

const LoanCalculatorPage = () => {
	const [openRight, setOpenRight] = React.useState(false);

	return (
		<React.Fragment>
			<DasboardNav openRight={() => setOpenRight(true)} />

			<LoanCalculatorMain />
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</React.Fragment>
	);
};

export default LoanCalculatorPage;
