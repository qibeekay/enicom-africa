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
import { useCart } from '../CartContext';
import { ToastContainer, toast } from 'react-toastify';
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from '@material-tailwind/react';
import { getUser } from '@/api/products/products';

const DasboardNav = () => {
	const [nav, setNav] = useState(false);
	const [status, setStatus] = useState('');
	const [agentStatus, setAgentStatus] = useState('');
	const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
	const { cartItems } = useCart();

	const navigationRef = useRef<HTMLDivElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const router = useRouter();

	const handleHome = () => {
		router.push('/dashboard');
	};
	const handleBusiness = () => {
		localStorage.setItem('bussiness_type', 'Bussiness');
		router.push('/sellers');
	};
	const handleIndividual = () => {
		// Save the word "individual" to local storage
		localStorage.setItem('bussiness_type', 'Individual');
		router.push('/sellers');
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

	const handleLogout = () => {
		// Clear user-related information from local storage
		localStorage.removeItem('fname');
		localStorage.removeItem('lname');
		localStorage.removeItem('mail');
		localStorage.removeItem('usertoken');
		localStorage.removeItem('renitoken');

		// Redirect to the login page
		toast.success('Logout Successful');
		router.push('/login'); // Change '/login' to the actual path of your login page
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			setStatus(getusers.is_verified_seller);
			setAgentStatus(getusers.is_verified_agent);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
		}
	};

	useEffect(() => {
		getuser();
	}, []);

	// console.log(status);

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
						<div className='grid items-end relative'>
							<Link href={'/cart'} className='flex flex-col cursor-pointer'>
								<div className='grid items-center justify-center'>
									<BsCart size={20} />
								</div>
								<p className='hidden md:block text-center text-sm'>Cart</p>
								<div className='bg-greens text-white w-4 aspect-square rounded-full grid items-center justify-center absolute -top-1 right-0'>
									<p className='text-xs'>{cartItems?.length || 0}</p>
								</div>
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
							href={'/loan-facility'}
							className=' flex items-center justify-end gap-4 hover:bg-greens/20 py-3 px-5 rounded-lg hover:text-greens'>
							<HiOutlineCreditCard size='27' />
							<p className=''>Loan Facility</p>
						</Link>

						{/* become a seller */}
						{status ? (
							<div className='w-full mt-10'>
								<Link className='' href={'/sales'}>
									<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
										Sellers Dashboard
									</p>
								</Link>
							</div>
						) : (
							<div className='w-full mt-10'>
								<button
									className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'
									onClick={handleOpen}>
									Become a Seller
								</button>
							</div>
						)}

						{/* become an Agent */}
						{agentStatus ? (
							<div className='w-full mt-10'>
								<Link className='' href={'agent-dashboard'}>
									<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
										Agents Dashboard
									</p>
								</Link>
							</div>
						) : (
							<div className='w-full mt-7'>
								<Link className='' href={'/agent'}>
									<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
										Become an Agent
									</p>
								</Link>
							</div>
						)}

						{/* logout */}
						<div className='w-full mt-7'>
							<button
								className='grid justify-end w-full'
								onClick={handleLogout}>
								<p className='border-greens border w-full rounded-lg text-dark py-2 px-5 text-center text-sm'>
									Logout
								</p>
							</button>
						</div>
					</div>
				</div>
				<Dialog
					size='xs'
					open={open}
					handler={handleOpen}
					className='bg-white shadow-none text-dark p-6'>
					<DialogHeader>You want to become a seller?</DialogHeader>
					<div className='grid mt-4'>
						<button
							className='border border-greens bg-greens text-white py-2'
							onClick={handleIndividual}>
							Register as an Individual
						</button>
						<button
							className='border border-greens bg-greens text-white py-2 mt-4'
							onClick={handleBusiness}>
							Register as a Business
						</button>
					</div>
				</Dialog>
				<ToastContainer />
			</div>
		</div>
	);
};

export default DasboardNav;
