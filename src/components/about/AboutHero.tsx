import React from 'react';
import { Navbar } from '..';

const AboutHero = () => {
	return (
		<div className='w-full font-poppins text-dark'>
			<div className='w-full h-full bg-about bg-cover bg-top bg-no-repeat relative'>
				<div className=' absolute w-full h-full bg-[#011D00]/60 z-0'></div>
				<div className='relative z-10 py-[2.5rem]'>
					{/* nav bar */}
					<Navbar />
					{/* hero */}
					<div className='relative z-10 text-center flex flex-col items-center justify-center mt-10'>
						{/* heading */}
						<h1
							className='text-white font-semibold text-2xl sm:text-3xl w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] sm:leading-[3rem]
                        '>
							Energy Infra Company Limited (ENICOM) is expanding access to clean
							energy through customized financing solutions.
						</h1>
						<h1
							className='text-white font-semibold text-2xl sm:text-3xl w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] sm:leading-[3rem] mt-7
                        '>
							We connect you with tested and verified solar sellers and
							installers via our solar marketplace.
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutHero;
