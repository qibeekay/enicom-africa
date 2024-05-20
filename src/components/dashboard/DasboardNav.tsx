'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { TfiMenuAlt } from 'react-icons/tfi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../CartContext';
import { ToastContainer, toast } from 'react-toastify';

const DasboardNav = ({ openRight }: { openRight: () => void }) => {
	const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const { cartItems } = useCart();

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// const navigationRef = useRef<HTMLDivElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const router = useRouter();

	// re-routes to home page
	const handleHome = () => {
		if (usertoken) {
			router.push('/dashboard');
		} else {
			router.push('/');
		}
	};

	// on mobile view toggles the search input
	const toggleMobileSearch = () => {
		setMobileSearchVisible((prev) => !prev);
	};

	// Focus on the search input when the mobile search is opened
	useEffect(() => {
		if (mobileSearchVisible && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [mobileSearchVisible]);

	// handle searchs
	const handleSearch = async () => {
		router.push(`/search-result?searchQuery=${searchQuery}`);
	};

	// handle search when enter is pressed on the keyboard
	const handleKeyPress = (e: { key: string }) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className='relative w-full font-poppins text-dark '>
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
							<div
								className='bg-greens h-full grid items-center py-2 px-3 text-white cursor-pointer'
								onClick={handleSearch}>
								<AiOutlineSearch size={27} />
							</div>
							{/* input */}
							<input
								type='text'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyPress={handleKeyPress}
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
								<div
									className='bg-greens h-full grid items-center py-2 px-3 text-white cursor-pointer'
									onClick={handleSearch}>
									<AiOutlineSearch size={27} />
								</div>
								{/* input */}
								<input
									ref={searchInputRef}
									type='text'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyPress={handleKeyPress}
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
							<Link
								href={usertoken ? '/cart' : '/login'}
								className='flex flex-col cursor-pointer'>
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
							<Link href={usertoken ? '/account' : '/login'}>
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

export default DasboardNav;
