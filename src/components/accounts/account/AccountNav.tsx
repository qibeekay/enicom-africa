'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineBellAlert, HiOutlineCreditCard } from 'react-icons/hi2';
import { BsCart } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { TfiMenuAlt } from 'react-icons/tfi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../CartContext';
import { ToastContainer, toast } from 'react-toastify';
import { getUser } from '@/api/products/products';

const AccountNav = ({ openRight }: { openRight: () => void }) => {
	const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
	const { cartItems } = useCart();

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const navigationRef = useRef<HTMLDivElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const router = useRouter();

	const handleHome = () => {
		if (usertoken) {
			router.push('/dashboard');
		} else {
			router.push('/');
		}
	};

	// getting specific user data
	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			console.log(getusers);
		} catch (error) {
			console.log('error');
		}
	};

	useEffect(() => {
		getuser();
	}, []);

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
		<div className='relative w-full font-poppins text-dark '>
			<div className=''>
				{/* desktop-nav */}
				<div className='bg-[#E4FEE3] py-4'>
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
						{/* <div className='grid items-center'>
							<HiOutlineBellAlert size={22} />
						</div> */}

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
						<button
							className='grid items-end cursor-pointer relative'
							onClick={openRight}>
							<TfiMenuAlt size={35} />
						</button>
					</div>
				</div>

				<ToastContainer />
			</div>
		</div>
	);
};

export default AccountNav;
