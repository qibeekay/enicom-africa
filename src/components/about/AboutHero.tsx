import React from 'react';
import { Navbar } from '..';

const AboutHero = () => {
	return (
		<div className='w-full font-poppins text-dark'>
			<div className=' h-screen lg:h-[95vh] bg-about bg-center bg-no-repeat relative'>
				<div className=' absolute w-full h-screen lg:h-[95vh] bg-[#011D00]/60 z-0'></div>
				<div className='relative z-10 py-[2.5rem]'>
					{/* nav bar */}
					<Navbar />
					{/* hero */}
					<div className='relative z-10 text-center flex flex-col items-center justify-center mt-10'>
						{/* heading */}
						<h1
							className='text-white font-semibold text-3xl sm:text-4xl w-[80%] md:w-[60%] lg:w-[55%] xl:w-[45%] sm:leading-[3rem]
                        '>
							Who We Are
						</h1>

						{/*  paragraph */}
						<p className='text-white w-full sm:w-[80%] md:w-[60%] lg:w-[65%] text-xs md:text-sm mt-4  md:mt-7 lg:mt-10 px-4'>
							Enicom is expanding access to clean energy with custom financing
							solutions. We facilitate solar power solutions that reduce your
							carbon footprint. We empower our clients by providing them
							specialised consultations on the solar installation process,
							smooth connections with affordable finance options and credible,
							verified installation contractors.
						</p>

						<p className='text-white w-full sm:w-[80%] md:w-[60%] lg:w-[65%] text-xs md:text-sm mt-4 md:mt-7 lg:mt-10 px-4'>
							We are more than just a financing provider, we connect you with
							your next Solar solution seller and installer. Partnering with
							Enicom, whether as an installer or buyer gives you an Enicom
							advantage. You get access to flexible loan payment options, elite
							support- (from loan request to project completion and
							maintenance), product support and warranty all in one place.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutHero;
