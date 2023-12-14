'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineBellAlert, HiOutlineCreditCard } from 'react-icons/hi2';
import { BsCart } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { TfiMenuAlt } from 'react-icons/tfi';
import { CgMenuGridR } from 'react-icons/cg';
import { PiShoppingBagOpenLight } from 'react-icons/pi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DasboardNav = () => {
	const [nav, setNav] = useState(false);
	const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

	const navigationRef = useRef<HTMLDivElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const router = useRouter();

	const handleHome = () => {
		router.push('/dashboard');
	};

	const closeNavigation = () => {
		setNav(false);
	};

	// Event listener to close the navigation when clicking away
	const closeNavigationOnClickAway = (e: MouseEvent) => {
		if (
			nav &&
			navigationRef.current &&
			!navigationRef.current.contains(e.target as HTMLElement)
		) {
			closeNavigation();
		}
	};

	useEffect(() => {
		document.addEventListener('click', closeNavigationOnClickAway);

		return () => {
			document.removeEventListener('click', closeNavigationOnClickAway);
		};
	}, [nav]);

	const toggleMobileSearch = () => {
		setMobileSearchVisible((prev) => !prev);
	};

	// Focus on the search input when the mobile search is opened
	useEffect(() => {
		if (mobileSearchVisible && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [mobileSearchVisible]);

	return (
		<div className='relative w-full font-poppins text-dark overflow-hidden'>
			<div className=''>
				{/* desktop-nav */}
				<div className='bg-bgGreen py-2'>
					<div className='flex items-center md:items-stretch justify-between gap-4 max-w-6xl px-4 mx-auto relative'>
						{/* image */}
						<div
							className='grid items-center cursor-pointer'
							onClick={handleHome}>
							<Image src={'/logo.png'} width={150} height={150} alt='logo' />
						</div>

						{/* search */}
						<div className='hidden sm:relative w-[70%] sm:w-[45%] sm:flex items-center bg-white overflow-hidden gap-3 rounded'>
							{/* icon */}
							<div className='bg-greens h-full grid items-center py-2 px-3 text-white'>
								<AiOutlineSearch size={27} />
							</div>
							{/* input */}
							<input
								type='text'
								className='bg-transparent outline-none w-full placeholder:text-[10px] md:placeholder:text-base placeholder:text-dark'
								placeholder='Search Solar Product'
							/>
						</div>

						{/* search */}
						<div className='sm:hidden' onClick={toggleMobileSearch}>
							<AiOutlineSearch size={27} />
						</div>

						{/* search bar for mobile */}
						{mobileSearchVisible && (
							<div className='fixed top-[49px] z-50 w-[70%] flex items-center bg-bgGreen overflow-hidden gap-3 rounded'>
								{/* icon */}
								<div className='bg-greens h-full grid items-center py-2 px-3 text-white'>
									<AiOutlineSearch size={27} />
								</div>
								{/* input */}
								<input
									ref={searchInputRef}
									type='text'
									className='bg-transparent outline-none w-full placeholder:text-[10px] md:placeholder:text-base placeholder:text-dark'
									placeholder='Search Solar Product'
								/>
							</div>
						)}

						{/* notifications */}
						<div className='grid items-center'>
							<HiOutlineBellAlert size={22} />
						</div>

						{/* cart */}
						<div className='grid items-end'>
							<Link href={'/cart'} className='flex flex-col cursor-pointer'>
								<div className='grid items-center justify-center'>
									<BsCart size={18} />
								</div>
								<p className='hidden md:block text-center text-sm'>Cart</p>
							</Link>
						</div>

						{/* account */}
						<div className='grid items-end'>
							<Link href={'/account'}>
								<div className='flex flex-col items-center text-greens'>
									<FaUserCircle size={18} />
								</div>
								<p className='hidden md:block text-sm text-center'>Account</p>
							</Link>
						</div>

						{/* menu */}
						<div
							className='grid items-end cursor-pointer relative'
							onClick={() => setNav(true)}>
							<TfiMenuAlt size={35} />
						</div>
					</div>
				</div>
				{/* mobile-nav */}
				<div className={nav ? 'top-0 fixed z-[999] w-full h-screen' : ''}>
					<div
						ref={navigationRef}
						onClick={closeNavigation}
						className={nav ? 'overlay' : ''}></div>
					<div
						className={
							nav
								? 'absolute right-0  top-0 bg-bgGreen px-7 w-[20rem] z-10 h-screen pt-20 duration-300 ease-in'
								: 'absolute -right-[100rem]  top-0 bg-bgGreen px-7 w-[20rem] z-10 h-screen pt-20 duration-300 ease-in'
						}>
						{/* dashboard */}
						<Link
							href={'/dashboard'}
							className=' flex items-center justify-end gap-4 hover:bg-greens/20 py-3 px-5 rounded-lg hover:text-greens'>
							<CgMenuGridR size='30' />

							<p className=''>Dashboard</p>
						</Link>

						{/* store */}
						<Link
							href={'/store'}
							className=' flex items-center justify-end gap-4 hover:bg-greens/20 py-3 px-5 rounded-lg hover:text-greens my-5'>
							<PiShoppingBagOpenLight size='27' />

							<p className=''>Store</p>
						</Link>

						{/* loan */}
						<Link
							href={''}
							className=' flex items-center justify-end gap-4 hover:bg-greens/20 py-3 px-5 rounded-lg hover:text-greens'>
							<HiOutlineCreditCard size='27' />
							<p className=''>Loan Facility</p>
						</Link>

						{/* seller */}
						<div className='w-full mt-10'>
							<Link className='' href={''}>
								<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
									Become a Seller
								</p>
							</Link>
						</div>

						{/* agent */}
						<div className='w-full mt-7'>
							<Link className='' href={''}>
								<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
									Become an Agent
								</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DasboardNav;
