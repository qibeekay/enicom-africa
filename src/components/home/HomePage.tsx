import React from 'react';
import { Footer, HeroPage, HomeCalculator, HomeTabs } from '..';

const HomePage = () => {
	return (
		<div className=' bg-bgGreen'>
			<HeroPage />
			<HomeTabs />
			<HomeCalculator />
			<Footer />
		</div>
	);
};

export default HomePage;
