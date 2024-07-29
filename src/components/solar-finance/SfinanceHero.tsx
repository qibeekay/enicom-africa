import React from 'react';
import Navbar from '../home/Navbar';

const SfinanceHero = () => {
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
							What you must know about Solar Financing
						</h1>
						<p className='w-full leading-6 md:w-[85%] text-center mx-auto text-white mt-3'>
							Solar energy systems can be expensive, costing thousands or even
							tens of thousands of naira. It's completely understandable to feel
							hesitant about investing in solar energy because of the high
							upfront costs involved. Fortunately, there are financing options
							available that can help homeowners benefit from solar energy
							savings, without having to pay a huge sum of money upfront. Some
							of these financing options offer little to no down payment, making
							it easier for homeowners to switch to solar energy even if they
							don’t have a lump sum of savings.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SfinanceHero;
