'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import { PiShoppingBagOpenLight } from 'react-icons/pi';
import { TfiMenuAlt } from 'react-icons/tfi';

const SellerNav = () => {
	const [nav, setNav] = useState(false);
	const navigationRef = useRef<HTMLDivElement | null>(null);

	const router = useRouter();

	const handleHome = () => {
		router.push('/');
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
	return (
		<div className='relative w-full font-poppins text-dark overflow-hidden'>
			<div className='py-7 px-[4rem]'>
				<div className='flex items-center justify-between'>
					{/* image */}
					<div
						className='grid items-center cursor-pointer'
						onClick={handleHome}>
						<Image src={'/logo.png'} width={150} height={150} alt='logo' />
					</div>

					{/* menu */}
					<div
						className='grid items-end cursor-pointer relative'
						onClick={() => setNav(true)}>
						<TfiMenuAlt size={35} />
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
									Become an Installer
								</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerNav;
