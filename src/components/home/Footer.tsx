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
						<div className=' text-center md:text-left w-[10rem]'>
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
						</div>

						{/* company */}
						<div className='text-center w-[10rem]'>
							<h1 className='text-lg font-semibold'>Company</h1>
							<ul className='grid gap-y-3 mt-4'>
								<li>
									<Link href={''}>About</Link>
								</li>
								<li>
									<Link href={''}>FAQs</Link>
								</li>
								<li>
									<Link href={''}>Installers</Link>
								</li>
								<li>
									<Link href={''}>Warehouses</Link>
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

					<p className='py-10'></p>
					<p className='text-center text-lg pb-10'>Enicom Africa @ 2023</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
