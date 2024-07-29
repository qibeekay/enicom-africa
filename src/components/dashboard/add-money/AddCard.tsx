'use client';
import { getUsersAccount } from '@/api/auth/api';
import { getUser } from '@/api/products/products';
import React, { useEffect, useState } from 'react';
import { IoIosCopy } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';

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
}

interface Account {
	accountBalance_th: string;
	accountBalance: string;
	accountNumber: string;
	accountDetails: {
		AvailableBalance: number;
		AvailableBalance_th: number;
		LedgerBalance: number;
		LedgerBalance_th: number;
		WithdrawableBalance: number;
		WithdrawableBalance_th: number;
		accountNumber: string;
	};
}

const AddCard = () => {
	const [user, setUser] = useState<Users | null>(null);
	const [account, setAccount] = useState<Account | null>(null);
	const [kyc, setKyc] = useState<string>('');
	const [renitoken, setRenitoken] = useState<string>('');
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const [loading, setLoading] = useState<boolean>(true);

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	useEffect(() => {
		// Retrieve the data from local storage
		const userData = localStorage.getItem('userResponse');
		console.log('data', userData);

		if (userData) {
			// Parse the data to convert it into a JavaScript object
			const userObject = JSON.parse(userData);

			// Access and set the renitokens

			setRenitoken(`${userObject.renitoken}`);
		}
	}, []);

	// getting specific user data
	// const getuser = async () => {
	// 	try {
	// 		const getusers = await getUser(`$${token}`, `${usertoken}`);
	// 		console.log(getusers);
	// 		setUser(getusers);
	// 		setRenitoken(getusers.renitoken);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		// console.error('Error fetching cart items:', error);
	// 		console.log('error');
	// 		setLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	getuser();
	// }, []);

	// getting user account details
	const getdetail = async () => {
		try {
			const getdetails = await getUsersAccount(`$${token}`, `${renitoken}`);
			setAccount(getdetails);
			// setUser(getusers);
			setLoading(false);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		if (renitoken) {
			getdetail();
		}
	}, [renitoken]);

	// Function to copy the account number to clipboard
	const copyToClipboard = () => {
		if (account) {
			navigator.clipboard.writeText(account.accountNumber);
			toast.success('Account number copied to clipboard!');
		}
	};
	return (
		<div className='w-full'>
			{/* form */}
			<div className='w-full'>
				<form action='' className='grid gap-y-10 mt-4 w-full'>
					{/* amount */}
					<div className='flex flex-col sm:w-[22rem] w-full'>
						<label htmlFor='account' className='font-medium'>
							Account Number
						</label>
						<div className='mt-2 font-medium bg-greens/10 text-greens outline-none py-2 px-5 rounded-lg w-full'>
							<p>{loading ? 'Loading...' : account?.accountNumber}</p>
						</div>
						<label htmlFor='account' className='font-medium mt-4'>
							Bank Name
						</label>
						<div className='mt-2 font-medium bg-greens/10 text-greens outline-none py-2 px-5 rounded-lg w-full'>
							<p>Enrich Microfinance Bank</p>
						</div>
					</div>

					<div className='w-full sm:w-[11rem]'>
						{/* submit */}
						<button
							type='button'
							onClick={copyToClipboard}
							className='bg-greens text-white py-2 px-10 rounded-lg w-full flex gap-4 items-center justify-center text-lg font-medium'>
							<IoIosCopy size='20' />
							<p>Copy</p>
						</button>
					</div>
				</form>
				<ToastContainer />
			</div>
		</div>
	);
};

export default AddCard;
