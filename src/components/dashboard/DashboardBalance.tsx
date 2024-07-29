'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GiBackwardTime } from 'react-icons/gi';
import { FiPlus } from 'react-icons/fi';
import { HiChevronDown } from 'react-icons/hi2';
import { LiaSearchSolid } from 'react-icons/lia';
import { AiOutlineEyeInvisible, AiOutlineSwap } from 'react-icons/ai';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { DashBoardItems } from '..';
import { useRouter } from 'next/navigation';
import { getUser } from '@/api/products/products';
import { getUsersAccount } from '@/api/auth/api';
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

const DashboardBalance = () => {
	const [user, setUser] = useState<Users | null>(null);
	// const [renitoken, setRenitoken] = useState<string>('');
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const [loading, setLoading] = useState<boolean>(true);

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// getting specific user data
	// const getuser = async () => {
	// 	try {
	// 		const getusers = await getUser(`$${token}`, `${usertoken}`);
	// 		console.log(getusers);
	// 		setUser(getusers);
	// 		// setRenitoken(getusers.renitoken);
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
	// const getdetail = async () => {
	// 	try {
	// 		const getdetails = await getUsersAccount(`$${token}`, `${renitoken}`);
	// 		setAccount(getdetails);
	// 		// setUser(getusers);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		// console.error('Error fetching cart items:', error);
	// 		console.log('error');
	// 		setLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	if (renitoken) {
	// 		getdetail();
	// 	}
	// }, [renitoken]);

	// Function to toggle showing or hiding the balance
	// const toggleShowBalance = () => {
	// 	setShowBalance((prevShowBalance) => !prevShowBalance);
	// 	// Store the state of showBalance in localStorage
	// 	localStorage.setItem('showBalance', JSON.stringify(!showBalance));
	// };

	// useEffect(() => {
	// 	// Retrieve showBalance state from localStorage and update the state
	// 	const storedShowBalance = localStorage.getItem('showBalance');
	// 	if (storedShowBalance !== null) {
	// 		setShowBalance(JSON.parse(storedShowBalance));
	// 	}
	// }, []);

	return (
		<div className='w-full font-poppins'>
			<div>
				{/* header */}

				{/* items */}
				<div>
					<DashBoardItems />
				</div>
			</div>
		</div>
	);
};

export default DashboardBalance;
