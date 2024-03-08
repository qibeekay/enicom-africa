'use client';
import { getUser } from '@/api/products/products';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GoArrowDownLeft, GoArrowDownRight } from 'react-icons/go';

interface Users {
	fname: string;
	mail: string;
	lname: string;
	role: string;
	renitoken: string;
	is_verified: boolean;
	usertoken: number;
	is_verified_seller: boolean;
	is_verified_seller_status: string;
	is_verified_agent: boolean;
	is_verified_agent_status: string;
	kyc_status: boolean;
	accountDetails: {
		accountNumber: string;
		accountName: string;
	};
	accountBalance_th: string;
	accountBalance: string;
	accountNumber: string;
}

const AccountMainDetails = () => {
	const [user, setUser] = useState<Users | null>(null);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const [loading, setLoading] = useState<boolean>(true);

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// getting specific user data
	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			console.log(getusers);
			setUser(getusers);
			setLoading(false);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
			setLoading(false);
		}
	};

	useEffect(() => {
		getuser();
	}, []);

	if (loading) {
		return <div>Loading...</div>; // Render loading indicator if data is still fetching
	}

	return (
		<div className='w-full h-screen overflow-scroll text-dark no-scrollbar'>
			<div className='flex flex-col gap-y-7 '>
				{/* account details */}
				<div className='bg-white w-full rounded-lg py-5 px-7'>
					{/* name / edit */}
					<div className='w-full flex items-center justify-between'>
						<h1 className='font-semibold '>
							{user?.fname} {user?.lname}
						</h1>
						{/* <Link href={''} className='underline text-greens'>
							Edit
						</Link> */}
					</div>

					{/* email / address */}
					<div className='flex flex-col md:flex-row justify-between text-sm mt-4'>
						<p className='grid gap-y-2'>
							{user?.mail}
							{/* <span>+23456789987</span> */}
						</p>
						{/* <p className='mt-2 md:mt-0 w-full xs:w-[15rem] lg:w-[20rem] '>
							Benue Road, University of Ibadan, Ibadan, Oyo State. Nigeria
						</p> */}
					</div>
				</div>

				{/* <div className='bg-white w-full rounded-lg py-5 px-7'> */}
				{/* <h1 className='font-semibold '>My Orders</h1> */}

				{/* <div className='flex flex-wrap gap-5 items-center justify-between mt-7 mb-3'> */}
				{/* due payments */}
				{/* <div className='flex flex-col  items-center gap-y-4'>
							<div className='w-8 aspect-square'>
								<img src='/icon1.png' alt='' className='w-full h-full' />
							</div>
							<p className='font-medium'>Due Payments</p>
						</div> */}

				{/* to be delivered */}
				{/* <div className='flex flex-col  items-center gap-y-4'>
							<div className='w-8 aspect-square'>
								<img src='/icon2.png' alt='' className='w-full h-full' />
							</div>
							<p className='font-medium'>To be Delivered</p>
						</div> */}

				{/* delivered */}
				{/* <div className='flex flex-col  items-center gap-y-4'>
							<div className='w-8 aspect-square'>
								<img src='/icon3.png' alt='' className='w-full h-full' />
							</div>
							<p className='font-medium'>Delivered</p>
						</div> */}
				{/* </div> */}
				{/* </div> */}

				{/* my wallets */}
				<div className='bg-white w-full rounded-lg py-5 px-7'>
					<h1 className='font-semibold '>My Wallet</h1>

					<div className='flex flex-wrap items-center gap-5 gap-x-[10rem] mt-7 mb-3'>
						<div className='flex gap-2 items-center'>
							{/* icon */}
							<div className='flex items-center justify-center'>
								<div className='bg-greens rounded-full w-[2.1rem] aspect-square grid items-center justify-center text-white'>
									<GoArrowDownLeft size={30} />
								</div>
							</div>

							{/* text */}
							<p className='grid mt-3 text-xl font-semibold text-greens'>
								N{user?.accountBalance_th ? user.accountBalance_th : '0.00'}
								<span className='text-sm text-dark font-normal'>
									Total Amount
								</span>
							</p>
						</div>

						<div className='flex gap-2 items-center'>
							{/* icon */}
							<div className='flex items-center justify-center'>
								<div className='bg-[#FD0F0F] rounded-full w-[2.1rem] aspect-square grid items-center justify-center text-white'>
									<GoArrowDownRight size={30} />
								</div>
							</div>

							{/* text */}
							<p className='grid mt-3 text-xl font-semibold text-greens'>
								N0.00
								<span className='text-sm text-dark font-normal'>Pending</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountMainDetails;
