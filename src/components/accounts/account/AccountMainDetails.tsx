'use client';
import { getUsersAccount } from '@/api/auth/api';
import { getUser } from '@/api/products/products';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineSwap } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import { GiBackwardTime } from 'react-icons/gi';
import { GoArrowDownLeft, GoArrowDownRight } from 'react-icons/go';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import { useFlutterwavePayment } from '../../../hooks/useFlutterwavePayment';

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

const AccountMainDetails = () => {
	const [user, setUser] = useState<Users | null>(null);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const [loading, setLoading] = useState<boolean>(true);
	const [loading1, setLoading1] = useState<boolean>(true);
	const [account, setAccount] = useState('');
	const [kyc, setKyc] = useState<string>('');
	const [showBalance, setShowBalance] = useState<boolean>(true);
	const { initiatePayment } = useFlutterwavePayment();
	const [amount, setAmount] = useState('');

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// Check if user is logged in based on your authentication mechanism
	// useEffect(() => {
	// 	// Retrieve kyc_status from local storage
	// 	const storedKycStatus = localStorage.getItem('bvn_status');
	// 	setKyc(storedKycStatus || '');
	// }, []);

	const router = useRouter();

	const kycClick = () => {
		router.push('/kyc');
	};

	useEffect(() => {
		// Retrieve the data from local storage
		const userData = localStorage.getItem('userResponse');
		console.log('data', userData);

		if (userData) {
			// Parse the data to convert it into a JavaScript object
			const userObject = JSON.parse(userData);

			// Access and set the seller status
			setUser(userObject.is_verified_seller_status);
			setKyc(`${userObject.kyc_status}`);
		}
	}, []);

	// getting user account details
	const getdetail = async () => {
		try {
			const getdetails = await getUsersAccount(`$${token}`, `${usertoken}`);
			// console.log(getdetails);
			setAccount(`${getdetails}`);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
		}
	};

	// Function to toggle showing or hiding the balance
	const toggleShowBalance = () => {
		setShowBalance((prevShowBalance) => !prevShowBalance);
		// Store the state of showBalance in localStorage
		localStorage.setItem('showBalance', JSON.stringify(!showBalance));
	};

	useEffect(() => {
		// Retrieve showBalance state from localStorage and update the state
		const storedShowBalance = localStorage.getItem('showBalance');
		if (storedShowBalance !== null) {
			setShowBalance(JSON.parse(storedShowBalance));
		}
	}, []);

	useEffect(() => {
		if (usertoken) {
			getdetail();
		}
	}, [usertoken]);

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (amount) {
			initiatePayment(parseFloat(amount));
		}
	};

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
						<p className='grid gap-y-2'>{user?.mail}</p>
					</div>

					<div className='flex md:items-center flex-wrap justify-between mb-3'>
						{/* Balance / transaction history  */}
						<div>
							{kyc === 'true' ? (
								<div className='flex items-center gap-4 md:gap-10'>
									<h1 className='text-dark font-medium text-lg'>Balances</h1>
									<div>
										<Link
											className='flex items-center gap-1 text-dark'
											href={''}>
											<GiBackwardTime size={25} />
											<span className=' underline'>Transaction History</span>
										</Link>
									</div>
								</div>
							) : (
								<h1 className='text-dark font-medium text-lg'>Verification</h1>
							)}
						</div>

						{/* View Details */}
						<div>
							<Link href={''} className='underline text-dark'>
								View Details
							</Link>
						</div>
					</div>

					{/* wallet */}
					<div>
						{kyc === 'true' ? (
							<div className='flex flex-col md:flex-row xl:flex-row items-center gap-4 md:gap-20 lg:gap-10 xl:gap-20'>
								{/* wallet balance */}
								<div className='bg-greens text-white w-full sm:w-[20rem] md:w-full p-4 rounded-lg'>
									<div>
										{/* top */}
										<div className='flex justify-between items-center'>
											<p className='text-sm font-light text-white/70'>Wallet</p>
											<AiOutlineEyeInvisible
												onClick={toggleShowBalance}
												className='cursor-pointer'
											/>
										</div>

										{/* amount */}
										<div>
											<h1 className='font-semibold text-2xl'>
												{showBalance ? ( // Conditionally render balance or asterisks based on showBalance state
													<>N {account || '0.00'}</>
												) : (
													<>******</>
												)}
											</h1>
										</div>

										{/* bottom */}
										<div className='flex justify-between items-center text-white/70'>
											{/* withdraw */}
											<div className='flex items-center'>
												<div>
													<AiOutlineSwap />
												</div>
												<button className='underline text-sm font-light '>
													Withdraw
												</button>
											</div>

											{/* Add Money */}
											<div className='flex items-center'>
												<FiPlus />
												<button
													onClick={() =>
														document
															.getElementById('fundWalletForm')
															?.classList.toggle('hidden')
													}
													className='underline text-sm '>
													Fund Wallet
												</button>
											</div>
										</div>
									</div>
								</div>

								{/* borrowed balance */}
								<div className='bg-greens/5 text-dark w-full sm:w-[20rem] md:w-full p-4 rounded-lg'>
									<div>
										{/* top */}
										<div className='flex justify-between items-center'>
											<p className='flex items-center text-sm gap-5'>
												<span>Total Borrowed </span>
												<AiOutlineEyeInvisible />
											</p>
											<p className='flex items-center text-sm'>
												<FiPlus /> Pay back loan
											</p>
										</div>
										{/* amount */}
										<div>
											<h1 className='font-semibold text-2xl py-1'>N0.00</h1>
										</div>
										{/* bottom */}
										<div className='flex justify-between items-center'>
											date
											<div className='flex items-center text-sm text-dark'>
												<p>28/12/2022</p>
											</div>
											{/* due date */}
											<div className='flex items-center text-sm '>
												<p className='text-[#FD0F0F]'>days remaining</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div>
								<div
									className='bg-greens rounded-lg p-4 text-white cursor-pointer'
									onClick={kycClick}>
									<p>Verify Account</p>
									<p className='text-xs mt-2 text-white/70'>
										Complete your registration process to get your account
										number and enjoy our loan facility
									</p>
									<div className='flex items-center justify-end mt-2'>
										<HiOutlineChevronRight />
										<HiOutlineChevronRight />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Fund Wallet Form */}
				<div id='fundWalletForm' className='hidden'>
					<form onSubmit={handleSubmit} className='flex gap-2 items-end'>
						<div>
							<div>
								<label htmlFor='amount'>Enter Amount</label>
							</div>
							<input
								type='number'
								value={amount}
								onChange={handleAmountChange}
								placeholder='Enter amount'
								className='outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								min='1'
							/>
						</div>

						<button
							type='submit'
							className='bg-greens w-fit rounded-lg text-white py-3 px-5 text-center text-sm'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AccountMainDetails;
