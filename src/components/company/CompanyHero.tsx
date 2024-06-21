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

const CompanyHero = () => {
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
						What we Do
					</h1>

					{/* flex details */}
					<div className='flex flex-col md:flex-row items-center gap-10'>
						{/* flex 1 */}
						<div className='w-full bg-white shadows rounded-3xl'>
							{/* image */}
							<div className=' '>
								<img className='w-full h-full' src='./c1.png' alt='' />
							</div>
							{/* text */}
							<div className='px-4'>
								<p className='font-semibold my-3'>I am a HomeOwner/Customer</p>
								<p className='grid gap-3 text-sm sm:text-base'>
									Enicom recognizes the pain point of homeowners and customers.
									we are dedicated to revolutionizing solar solutions for
									homeowners and customers, providing accessibility, and
									affordability right to your doorstep.{' '}
									<span>
										Discover how Enicom can help you power your home sustainably
										and affordably.
									</span>
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
											<button className='bg-bgGreen py-1.5 px-5 rounded-3xl flex items-center gap-3'>
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
											<button className='bg-bgGreen py-1.5 px-5 rounded-3xl flex items-center gap-3'>
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
								<p className='font-semibold my-3'>
									I am a Business/Service provider
								</p>
								<p className='grid gap-3 text-sm sm:text-base'>
									Enicom has created an online marketplace to help small, medium
									and large businesses sell their Solar products and services to
									a wide range of customers every day. Whether you are a
									Supplier, Installer or Seller, our platform can help you scale
									up your business and increase revenue.
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

						{/* details */}
						<div className='mt-16'>
							<h1 className='text-center font-semibold text-base sm:text-lg'>
								What you must know about Solar Financing
							</h1>
							<p className='w-full text-sm md:w-[85%] text-center mx-auto mt-3'>
								Solar energy systems can be expensive, costing thousands or even
								tens of thousands of naira. It's completely understandable to
								feel hesitant about investing in solar energy because of the
								high upfront costs involved. Fortunately, there are financing
								options available that can help homeowners benefit from solar
								energy savings, without having to pay a huge sum of money
								upfront. Some of these financing options offer little to no down
								payment, making it easier for homeowners to switch to solar
								energy even if they don’t have a lump sum of savings.
							</p>
						</div>

						{/* details with tab */}
						<div className='mt-16'>
							<h1 className='text-center font-semibold text-base sm:text-lg grid'>
								Three Model Structure to fit everyone’s journey,
								<span>Enabling sustainable energy & seamless solar</span>
							</h1>
							<p className='w-full text-sm md:w-[85%] text-center mx-auto mt-3'>
								Empower your energy choice with our tailored solar solutions
								that fits every journey.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompanyHero;
