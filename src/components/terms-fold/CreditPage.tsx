import React from 'react';
import { Footer, Navbar } from '@/components';
import Link from 'next/link';

const CreditPage = () => {
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
							Credit Check Policy
						</h1>
						<p>
							<span className='font-medium'>I/we consent</span> to Energy Infra
							Company Limited (“ENICOM”) making enquiries about my/our credit
							record with any credit reference agency and credit bureaus and any
							other relevant third party to confirm my/our details on this
							application.
						</p>
						<p className='mt-4'>
							<span className='font-medium'>
								I/We/My/Our/any Director/Shareholder/Member/Trustee/Authorised
								Representative/ Partner/Spouse/Related{' '}
							</span>
							Party also undertake to provide credit reference agencies and
							credit bureaus with regular updates regarding how I/we manage{' '}
							<span className='font-medium'>my/our </span> account, including{' '}
							<span className='font-medium'>my/our</span>
							failure to meet agreed terms and conditions.
						</p>
						<p className='mt-4'>
							<span className='font-medium'>I/we </span> further accept that
							such check or enquiries by ENICOM or any authorised third party by
							ENICOM does/do not infringe any of <span>my/our </span>{' '}
							fundamental rights and where it so constitutes an infringement,{' '}
							<span className='font-medium'>I/we </span> thereby waive such
							fundamental rights, and <span className='font-medium'>I/we</span>{' '}
							accept that the reference check is part of the registration /
							renewal process for us to obtain the finance sought from ENICOM.
						</p>

						<p className='mt-4 mb-20'>
							<span className='font-medium'>I/we consent</span> that credit
							reference agencies and credit bureaus may, in turn, make the
							records and details available to other credit grantors. ENICOM may
							also give this information to any person who in its opinion, needs
							it to carry out any of ENICOM’s rights or duties in terms of the
							contract or any law pertaining to the products I/we have
							requested.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default CreditPage;
