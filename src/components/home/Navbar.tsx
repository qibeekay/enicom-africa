'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';
import {
	Dialog,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
} from '@material-tailwind/react';
import LoanCalculatorModal from '../LoanCalculatorModal';

const Navbar = () => {
	const [usermail, setUsermail] = useState('');
	const router = useRouter();

	const handleHome = () => {
		router.push('/');
	};

	const handleRegister = () => {
		router.push('/register');
	};

	// Check if user is logged in based on your authentication mechanism
	useEffect(() => {
		const userMail = localStorage.getItem('usertoken');
		setUsermail(userMail || '');
	});
	const isLoggedIn = !!usermail;

	const [nav, setNav] = useState(false);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	return (
		<div>
			<div className='flex items-center justify-between w-full bg-bgGreen px-4 lg:px-[4rem] py-4'>
				{/*image  */}
				<div className='grid items-center cursor-pointer' onClick={handleHome}>
					<Image src={'/logo.png'} width={150} height={150} alt='logo' />
				</div>

				{/* links */}
				<div className='hidden lg:grid'>
					<ul className='flex gap-x-7 font-medium'>
						<li>
							<Link href={'/store'}>Store</Link>
						</li>
						<li>
							<Link href={'/company'}>Company</Link>
						</li>
						<li>
							<Link href={'/about-us'}>About Us</Link>
						</li>
						<li>
							<Link href={''}>Contact Us</Link>
						</li>
						<Menu>
							<MenuHandler>
								<button>Resources</button>
							</MenuHandler>
							<MenuList>
								<MenuItem>
									<div
										onClick={handleOpen}
										className=' font-semibold text-greens '>
										Load Calculator
									</div>
								</MenuItem>
								<MenuItem>
									<Link
										href={'/loan-calculator'}
										className=' font-semibold text-greens '>
										Loan Calculator
									</Link>
								</MenuItem>
								<MenuItem>
									<Link href={'/faqs'} className='font-semibold text-greens '>
										FAQs
									</Link>
								</MenuItem>
							</MenuList>
						</Menu>
					</ul>
				</div>

				{/* button */}
				<div className='hidden sm:block'>
					{isLoggedIn ? (
						<div className='w-[10rem]'>
							<Link
								href={'/dashboard'}
								className='text-greens rounded grid items-center justify-center py-2 cursor-pointer font-semibold'>
								Dashboard
							</Link>
						</div>
					) : (
						<div
							className='bg-greens rounded w-[10rem] grid items-center justify-center text-white py-2 cursor-pointer'
							onClick={handleRegister}>
							<p>Get Started</p>
						</div>
					)}
				</div>

				<div className='lg:hidden cursor-pointer' onClick={() => setNav(true)}>
					<HiBars3 size={30} />
				</div>
			</div>

			{/* mobile nav */}
			<div className={nav ? 'lg:hidden relative' : ''}>
				<div
					className={
						nav
							? 'fixed left-0 top-0 w-full h-screen z-[99999] text-dark bg-bgGreen p-4 ease-in duration-500'
							: 'fixed left-0 top-[-120vh] w-full h-screen z-[99999] text-dark bg-bgGreen p-4 ease-out duration-500'
					}>
					{/* logo text */}
					<div className='flex items-center justify-between'>
						<div
							className='grid items-center cursor-pointer'
							onClick={handleHome}>
							<Image src={'/logo.png'} width={150} height={150} alt='logo' />
						</div>
						<div className='cursor-pointer' onClick={() => setNav(false)}>
							<HiX size={30} />
						</div>
					</div>

					{/* links */}
					<div className='mt-16'>
						<ul className=' grid gap-8 font-bold text-2xl xs:text-4xl text-center'>
							<li>
								<Link href={'/store'}>Store</Link>
							</li>
							<li>
								<Link href={'/company'}>Company</Link>
							</li>
							<li>
								<Link href={'/about-us'}>About Us</Link>
							</li>
							<li>
								<Link href={''}>Contact Us</Link>
							</li>
							<Menu>
								<MenuHandler>
									<button>Resources</button>
								</MenuHandler>
								<MenuList>
									<MenuItem>
										<div
											onClick={handleOpen}
											className=' font-semibold text-greens '>
											Load Calculator
										</div>
									</MenuItem>
									<MenuItem>
										<Link
											href={'/loan-calculator'}
											className=' font-semibold text-greens '>
											Loan Calculator
										</Link>
									</MenuItem>
									<MenuItem>
										<Link href={'/faqs'} className='font-semibold text-greens '>
											FAQs
										</Link>
									</MenuItem>
								</MenuList>
							</Menu>
						</ul>
					</div>

					{/* button */}
					<div className='grid items-center justify-center mt-8'>
						<div className=''>
							{isLoggedIn ? (
								<div className='w-[10rem]'>
									<Link
										href={'/dashboard'}
										className='text-greens rounded grid items-center justify-center py-2 cursor-pointer font-semibold'>
										Dashboard
									</Link>
								</div>
							) : (
								<div
									className='bg-greens rounded w-[10rem] grid items-center justify-center text-white py-2 cursor-pointer'
									onClick={handleRegister}>
									<p>Get Started</p>
								</div>
							)}
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

export default Navbar;
