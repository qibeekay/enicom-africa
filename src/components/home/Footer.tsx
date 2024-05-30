'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';

const Footer = () => {
	const router = useRouter();

	const handleHome = () => {
		router.push('/');
	};

	return (
		<div className='bg-[#035202] text-white/90 font-poppins pt-20'>
			<div className='px-[3rem]'>
				<div>
					{/* image */}
					<div className=''>
						<div className='w-[10rem] cursor-pointer' onClick={handleHome}>
							<img className='w-full h-full' src='/logowhite.png' alt='' />
						</div>
					</div>

					{/* div */}
					<div className='flex justify-center md:justify-between gap-10 flex-wrap mt-8'>
						{/* products */}
						{/* <div className=' text-center md:text-left w-[10rem]'>
							<h1 className='text-lg font-semibold'>Products</h1>
							<ul className=' grid gap-y-3 mt-4'>
								<li>
									<Link href={''}>Solar Batteries</Link>
								</li>
								<li>
									<Link href={''}>Solar Panels</Link>
								</li>
								<li>
									<Link href={''}>Solar Bodies</Link>
								</li>
								<li>
									<Link href={''}>Solar Bodies</Link>
								</li>
							</ul>
						</div> */}

						{/* company */}
						<div className='text-center w-[10rem]'>
							<h1 className='text-lg font-semibold'>Company</h1>
							<ul className='grid gap-y-3 mt-4'>
								<li>
									<Link href={'/about-us'}>About</Link>
								</li>
								<li>
									<Link href={'/company'}>Company</Link>
								</li>
								<li>
									<Link href={'/faqs'}>FAQs</Link>
								</li>
							</ul>
						</div>

						{/* Address */}
						<div className='text-center w-[10rem]'>
							<h1 className='text-lg font-semibold'>Address and Contact</h1>
							<ul className='grid gap-y-3 mt-4'>
								<li>
									<Link href={''}>Address to physical office or quarters</Link>
								</li>
								<li>
									<Link href={''}>Email Address</Link>
								</li>
								<li>
									<Link href={''}>Phone Number</Link>
								</li>
							</ul>
						</div>

						{/* socials */}
						<div className='text-center md:text-right w-[10rem]'>
							<h1 className='text-lg font-semibold'>Socials</h1>
							<div className='flex items-center justify-center md:justify-end gap-4 my-4'>
								<FaTwitter size={25} />
								<FaFacebook size={25} />
								<FaInstagram size={25} />
							</div>
						</div>
					</div>
					<div className='w-full pt-16 pb-10'>
						<ul className='w-full flex flex-wrap text-sm items-center justify-center gap-x-10 gap-y-4'>
							<li>
								<Link href={'/terms-of-use'} className='text-white/70'>
									Terms of use
								</Link>
							</li>
							<li>
								<Link href={'/credit-policy-notice'} className='text-white/70'>
									Credit Policy notice
								</Link>
							</li>
							<li>
								<Link
									href={'/non-disclosure-agreement'}
									className='text-white/70'>
									Non Disclosure Agreement
								</Link>
							</li>
							<li>
								<Link href={'/cookie-policy'} className='text-white/70'>
									Cookies Policy
								</Link>
							</li>
							<li>
								<Link href={'/website-acceptable'} className='text-white/70'>
									Acceptable Use Policy
								</Link>
							</li>
						</ul>

						<p className='text-center text-lg pb-10 pt-4'>
							Enicom Africa @ 2023
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
