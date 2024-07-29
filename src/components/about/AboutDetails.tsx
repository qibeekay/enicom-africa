'use client';
import { Dialog } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';
import LoanCalculatorModal from '../LoanCalculatorModal';
import { FaMoneyBillWave } from 'react-icons/fa';
import { IoShieldCheckmark } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdOutlineHeadsetMic } from 'react-icons/md';
import { BsTools } from 'react-icons/bs';

const AboutDetails = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	return (
		<div className='w-full font-poppins text-dark bg-bgGreen'>
			<div className=' max-w-6xl px-4 mx-auto py-10'>
				<div className='w-full'>
					{/* grids */}
					<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 text-center'>
						{/* grid-items */}
						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div>
								<IoShieldCheckmark size={50} />
							</div>
							{/* text */}
							<p className='text-lg font-medium'>Quality</p>
							<p className=' mt-2'>
								Purchase high quality solar systems and equipment customized to
								your energy needs
							</p>
						</div>

						{/* grid-items */}
						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div>
								<FaPeopleGroup size={50} />
							</div>
							{/* text */}
							<p className='text-lg font-medium'>Consultation</p>
							<p className=' mt-2'>
								We provide specialized consultations on the solar installation
								process.
							</p>
						</div>

						{/* grid-items */}
						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div>
								<FaMoneyBillWave size={50} />
							</div>
							{/* text */}
							<p className='text-lg font-medium'>Flexible Finance Options</p>
							<p className=' mt-2'>
								Own your system at an affordable price choosing from our list of
								financial partners offering flexible payment options.{' '}
							</p>
						</div>

						{/* grid-items */}
						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div>
								<BsTools size={45} />
							</div>
							{/* text */}
							<p className='text-lg font-medium'>Turnkey Installation</p>
							<p className=' mt-2'>
								Our expert team handles every aspect of your installation
								process, from initial site assessment and system design to
								installation and final testing.
							</p>
						</div>

						<div className='flex flex-col items-center justify-center gap-2'>
							{/* img */}
							<div>
								<MdOutlineHeadsetMic size={50} />
							</div>
							{/* text */}
							<p className='text-lg font-medium'>Consultin Service</p>
							<p className=' mt-2'>
								We provide you with expert advice and customised solutions for
								your energy needs. For guidance on system selection, financial
								planning, optimizing your energy use, our team of consultants
								will guide you every step of the way.
							</p>
						</div>
					</div>

					{/* mission */}
					<div className='text-center mt-10'>
						<h1 className='text-xl font-semibold py-4'>Our Mission</h1>
						<div className='flex flex-col gap-7 sm:w-[90%] md:[w-80%] lg:[w-60%] xl:[45%] mx-auto'>
							<p className='text-xl'>
								To provide access to renewable energy solutions through
								innovative technology and affordable acquisition options.
							</p>
							<p>
								Millions of people across Africa still do not have access to
								electricity. This staggering number underscores the urgent need
								for innovative solutions in the energy sector.
							</p>
							<p>
								Countries across Africa face three significant challenges in
								electricity distribution: providing a reliable electricity
								supply to more people, ensuring affordability, and reducing
								widespread reliance on high carbon emitters.
							</p>
							<p>
								At Enicom, our purpose is to help people switch to better energy
								by providing access to funding and trusted, reliable,
								high-quality solar solutions. Enicom bridges this gap by
								connecting buyers to verified sellers and installers while
								offering flexible payment options for you to own your solar
								systems.
							</p>
						</div>
					</div>

					{/* vision */}
					<div className='text-center mt-10'>
						<h1 className='text-xl font-semibold py-4'>Our Vision</h1>
						<div className='flex flex-col gap-7 sm:w-[90%] md:[w-80%] lg:[w-60%] xl:[45%] mx-auto'>
							<p className='text-xl'>
								To be the recognized leader in the renewable energy solutions
								across Africa.
							</p>
							<p>
								Our commitment is to lead in providing solutions through
								innovative technology, ensuring that every home and organization
								has access to clean and affordable energy.
							</p>
						</div>
					</div>

					{/* commitment */}
					<div className='flex flex-col md:flex-row gap-10 items-center mb-10 mt-20'>
						{/* flex-1 */}
						<div className='w-full'>
							{/* text */}
							<div>
								<h1 className='text-xl font-semibold'>Our Commitments:</h1>
								{/* line */}
								<div className='bg-greens w-[7rem] h-1.5 mt-2'></div>
							</div>

							{/* list */}
							<ul className=' list-disc mt-5 grid gap-1 pl-4 text-sm lg:text-base'>
								<li>
									To provide seamless process in the acquisition of a Solar
									System.
								</li>
								<li>
									To offer swift customer service with a guaranteed response
									time of within 24hrs, ensuring your needs are addressed
									promptly.
								</li>
								<li>
									To provide personalized solar installation quotes within 24 to
									48 hours of receiving all required information about
									customer’s property and energy needs.
								</li>
								<li>
									Through our communication channels, we further provide
									assistance and support to customers on product selection,
									compatibility, installation and maintenance, helping you make
									decisions and optimize the performance of your solar systems.
								</li>
								<li>
									That products purchased from our marketplace are high-quality
									solar products, including panels, inverters, batteries, and
									other accessories and are from reputable manufacturers and
									suppliers.
								</li>
								<li>
									That all products purchased from our marketplace come with
									manufacturer’s warranties because of our want to provide you
									at every purchase you make, with peace of mind and protection
									against defects or malfunctions.
								</li>
							</ul>
						</div>

						{/* flex-2 */}
						<div className='w-full flex flex-col gap-7 items-center'>
							{/* load calculator */}
							<div className='bg-greens p-4 rounded-lg text-white shadow-2xl'>
								<h1 className='font-medium'>Load Calculator</h1>
								<p className='text-sm my-2'>
									Input information of what you want to power in your home.
									Based on this calculation, you will get a list of items you
									need to purchase. You will be redirected to our marketplace
									where you can purchase your items.
								</p>

								{/* links */}
								<button
									className='flex gap-4 items-center'
									onClick={handleOpen}>
									{/* text */}
									Calculate your load
									{/* img */}
									<div className='w-10 aspect-square overflow-hidden'>
										<img
											className='w-full h-full'
											src='/groupwhite.png'
											alt=''
										/>
									</div>
								</button>
							</div>

							{/* loan calculator */}
							<div className='bg-white p-4 rounded-lg text-dark shadow-2xl'>
								<h1 className='font-medium'>Loan Calculator</h1>
								<p className='text-sm my-2'>
									Like to take a loan? Calculate how much you will need to pay
									when you use our financing option to buy your solar items.
								</p>

								{/* links */}
								<Link
									href={'/loan-calculator'}
									className='flex gap-4 items-center'>
									{/* text */}
									Calculate your loan
									{/* img */}
									<div className='w-10 aspect-square overflow-hidden'>
										<img
											className='w-full h-full'
											src='/groupgreen.png'
											alt=''
										/>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<Dialog
					size='lg'
					open={open}
					handler={handleOpen}
					className='bg-transparent shadow-none text-dark'>
					<LoanCalculatorModal handleOpen={handleOpen} />
				</Dialog>
			</div>
		</div>
	);
};

export default AboutDetails;
