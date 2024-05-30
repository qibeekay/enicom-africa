import React from 'react';
import { Footer, Navbar } from '@/components';
import Link from 'next/link';

const CookiePage = () => {
	return (
		<div>
			<div className='w-full font-poppins text-dark'>
				<div className='relative'>
					{/* <div className=' absolute w-full h-screen bg-[#011D00]/60 z-0'></div> */}
					<div className='relative z-10 py-[2.5rem]'>
						<Navbar />
					</div>

					{/* hero */}
					<div className='max-w-6xl mx-auto px-4'>
						<h1 className='font-semibold text-4xl text-center mb-7'>
							Cookies Policy
						</h1>
						<p>
							Our website uses cookies to distinguish you from other users of
							our website. This helps us to provide you with a good experience
							when you browse our website and allows us to improve our site.
						</p>
						<p className='mt-2'>
							A cookie is a small file of letters and numbers that we store on
							your browser or the hard drive of your computer if you agree.
							Cookies contain information that is transferred to your computer's
							hard drive.
						</p>
						<p className='mt-4 mb-2 font-semibold'>
							We use the following cookies:
						</p>
						<ul className='list-disc pl-10 grid gap-2'>
							<li>
								<span className='font-semibold'>
									Strictly necessary cookies.{' '}
								</span>
								These are cookies that are required for the operation of our
								website. These essential cookies are always enabled because our
								website will not work properly without them. They include, for
								example, cookies that enable you to log into secure areas of our
								website, use a shopping cart or make use of e-billing services.
								You can switch off these cookies in your browser settings, but
								you may then not be able to access all or parts of our website.{' '}
							</li>

							<li>
								<span className='font-semibold'>
									Analytical or performance cookies.
								</span>{' '}
								These allow us to recognise and count the number of visitors and
								to see how visitors move around our website when they are using
								it. This helps us to improve the way our website works, for
								example, by ensuring that users are finding what they are
								looking for easily.
							</li>
							<li>
								<span className='font-semibold'>Functionality cookies.</span>{' '}
								These are used to recognise you when you return to our website.
								This enables us to personalise our content for you, greet you by
								name and remember your preferences (for example, your choice of
								language or region).
							</li>
							<li>
								<span className='font-semibold'>Targeting cookies.</span> These
								cookies record your visit to our website, the pages you have
								visited and the links you have followed. We will use this
								information to make our website and the advertising displayed on
								it more relevant to your interests.
							</li>
						</ul>
						<p className=' mt-4 mb-2 font-semibold'>
							You can choose which analytical, functionality and targeting
							cookies we can set by clicking on the button(s):
						</p>

						<ul className='list-disc pl-10 grid gap-2'>
							<li>
								Strictly necessary cookies{' '}
								<Link href={''} className='font-medium'>
									ALWAYS ACTIVE
								</Link>
							</li>
							<li>Analytical or performance cookies OFF</li>
							<li>Functionality cookies OFF Targeting cookies OFF</li>
							<li>
								You can also choose to "Reject All" cookies in the cookie
								banner.
							</li>
						</ul>
						<p className='mt-4 mb-20'>
							However, if you use your browser settings to block all cookies
							(including essential cookies) you may not be able to access all or
							parts of our website. Except for essential cookies, all cookies
							will expire after [•]. If you have any questions or concerns about
							our use of cookies, please send us an email at [•].
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default CookiePage;
