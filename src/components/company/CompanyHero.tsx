'use client';
import React from 'react';
import { Navbar } from '@/components';
import { FiChevronsRight } from 'react-icons/fi';
import {
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

const CompanyHero = () => {
	const router = useRouter();

	const handleStore = () => {
		router.push('/store');
	};

	const handleSolarFin = () => {
		router.push('/solar-finance');
	};
	return (
		<div className='w-full font-poppins text-dark mt-16'>
			<div className='relative'>
				{/* <div className=' absolute w-full h-screen bg-[#011D00]/60 z-0'></div> */}
				{/* <div className='relative z-10 py-[2.5rem]'>
					<Navbar />
				</div> */}

				{/* hero */}
				<div className='max-w-6xl mx-auto px-4'>
					<h1 className='font-semibold text-4xl text-center mb-7'>
						Discover our offerings
					</h1>

					<p className='text-center text-xl mb-10'>
						Whether for your home or business, discover how we make solar energy
						accessible and affordable through our innovative marketplace and
						sustainable finance options.
					</p>

					{/* flex details */}
					<div className='flex flex-col md:flex-row items-start gap-10'>
						{/* flex 1 */}
						<div className='w-full bg-white shadows rounded-3xl'>
							{/* image */}
							<div className=' '>
								<img className='w-full h-full' src='./c1.png' alt='' />
							</div>
							{/* text */}
							<div className='px-4'>
								<p className='font-semibold my-3'>Individual</p>
								<p className='grid gap-3 text-sm sm:text-base'>
									Want to make a switch to better energy solution and join the
									5% of people enjoying reliable, and sustainable power, you can
									make a switch to become a solar system owner. Get your
									customised solar solutions based on your energy need.
									<span>
										Whether you're looking to lower your energy bill, get more
										reliable and affordable power solution, avoid excessive cost
										from running on generator, and prevent health and
										environmental harms caused by the pollutions emitted form
										generators, we are here to help you every step of the way.
									</span>
									<span>
										Our solution is tailored to meets the power needs of your
										home and residential building to suit your lifestyle and
										budget.
									</span>
									<span>Ready to start?</span>
									<span>Discover how Enicom can help you achieve this.</span>
								</p>
							</div>

							{/* button */}
							<div className='w-full grid justify-end pr-7 py-7'>
								<Menu>
									<MenuHandler>
										<button className='bg-bgGreen py-1.5 px-5 rounded-3xl flex items-center gap-4'>
											Explore
											<FiChevronsRight />
										</button>
									</MenuHandler>
									<MenuList className=' bg-transparent shadow-none border-none flex flex-col sm:flex-row items-center gap-4 w-full text-dark'>
										<div className='bg-white w-[15rem] flex flex-col items-center gap-2 shadows rounded-3xl p-7'>
											{/* images */}
											<div className=' w-[2.5rem] aspect-square overflow-hidden'>
												<img
													className='w-full h-full'
													src='./Icc1.png'
													alt=''
												/>
											</div>
											<div className='text-center'>
												<p className='text-lg font-semibold'>Marketplace</p>
												<p>
													Buy and sell various solar equipments in our
													marketplace.
												</p>
											</div>
											<button
												className='bg-bgGreen py-1.5 px-5 rounded-3xl flex items-center gap-3'
												onClick={handleStore}>
												Continue
												<FiChevronsRight />
											</button>
										</div>
										<div className='bg-white w-[15rem] flex flex-col items-center gap-2 shadows rounded-3xl p-7'>
											{/* images */}
											<div className=' w-[2.5rem] aspect-square overflow-hidden'>
												<img
													className='w-full h-full'
													src='./Icc2.png'
													alt=''
												/>
											</div>
											<div className='text-center'>
												<p className='text-lg font-semibold'>
													Solar Finance Option
												</p>
												<p>
													our solar finance options as we create an economic
													ways for owning equipments
												</p>
											</div>
											<button
												className='bg-bgGreen py-1.5 px-5 rounded-3xl flex items-center gap-3'
												onClick={handleSolarFin}>
												Continue
												<FiChevronsRight />
											</button>
										</div>
									</MenuList>
								</Menu>
							</div>
						</div>

						{/* flex 2 */}
						<div className='w-full bg-white shadows rounded-3xl'>
							{/* image */}
							<div className=' '>
								<img className='w-full h-full' src='./c2.png' alt='' />
							</div>
							{/* text */}
							<div className='px-4'>
								<p className='font-semibold my-3'>Business</p>
								<p className='grid gap-3 text-sm sm:text-base'>
									Boost your business bottom-line by powering your operations
									with solar solutions that offer sustainable energy, reliable
									and better financial benefits.
								</p>
								<p className='grid gap-3 text-sm sm:text-base'>
									As a small business owner looking to expand, or large
									corporations, our team of experts will work closely with you
									to design and implement energy systems that align with your
									business objectives and maximize your return on investment.
								</p>
								<p className='grid gap-3 text-sm sm:text-base'>
									Ready to start?
								</p>
								<p className='grid gap-3 text-sm sm:text-base'>
									Discover how Enicom can help you achieve this.
								</p>
							</div>

							{/* button */}
							<div className='w-full grid justify-end pr-7 pt-[2.8rem] pb-7'>
								<button className='bg-bgGreen py-1.5 px-5 rounded-3xl flex items-center gap-4'>
									Explore
									<FiChevronsRight />
								</button>
							</div>
						</div>
					</div>

					{/* requests */}
					<div className='mt-16'>
						<h1 className='text-center font-semibold text-base sm:text-lg my-10'>
							YOU MAKE YOUR REQUEST, WE UNLOCK YOUR SOLAR SOLUTIONS.
						</h1>

						{/* flex */}
						<div className='w-[90%] mx-auto flex items-center justify-center md:justify-between flex-wrap gap-10'>
							{/* div 1 */}
							<div className=' flex flex-col items-center'>
								{/* image */}
								<div className='w-[3.5rem] aspect-square overflow-hidden'>
									<img className='w-full h-full' src='./ui1.png' alt='' />
								</div>

								{/* text */}
								<p className=' text-sm md:text-base mt-2'>
									Fill your contact form
								</p>
							</div>

							{/* div 2 */}
							<div className=' flex flex-col items-center'>
								{/* image */}
								<div className='w-[3.5rem] aspect-square overflow-hidden'>
									<img className='w-full h-full' src='./ui2.png' alt='' />
								</div>

								{/* text */}
								<p className='mt-2'>Calculate your load</p>
							</div>

							{/* div 3 */}
							<div className=' flex flex-col items-center'>
								{/* image */}
								<div className='w-[3.5rem] aspect-square overflow-hidden'>
									<img className='w-full h-full' src='./ui3.png' alt='' />
								</div>

								{/* text */}
								<p className='mt-2'>Make your request</p>
							</div>

							{/* div 4 */}
							<div className=' flex flex-col items-center'>
								{/* image */}
								<div className='w-[3.5rem] aspect-square overflow-hidden'>
									<img className='w-full h-full' src='./ui4.png' alt='' />
								</div>

								{/* text */}
								<p className='mt-2'>Equipments are delivered</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompanyHero;
