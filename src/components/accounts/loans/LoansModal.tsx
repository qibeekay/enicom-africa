'use client';
import { getSpecificLoan } from '@/api/loan/loan';
import {
	approveProduct,
	disapproveProduct,
	getAdminProductByToken,
} from '@/api/products/products';
import { Chip, Spinner } from '@material-tailwind/react';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { HiChevronLeft } from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';

interface OverviewModalProps {
	handleOpen: (loanToken: string) => void;
	loanToken: string;
	fetchLoanDatas: () => void;
}

interface Loan {
	package_plan: string;
	fullname: string;
	amount_to_borrow: string;
	amount_plus_intrest: string;
	loanStatus: string;
	loan_token: number;
	verification_type: string;
	verification_number: string;
	isCompletedStatus: string;
	requested_date: string;
	other_related_info: {
		guarantors: [
			{
				guarantorName: string;
				guarantorEmail: string;
				guarantorPhone: string;
				address: string;
				relationship: string;
			}
		];
		colleterals: {
			years_of_usage: string;
			proof_of_ownership: string;
			watt: number;
			price_bought: string;
		};
		getAllRecordsOfMonthExpectedToPay: [
			{
				dueDate: string;
				priceExpectedToPay: string;
				penaltyFee: string;
				paymentStatus: string;
				remind_a_day_before_status: string;
				historyData: string;
			}
		];
		preferredProvider: {
			status: boolean;
			data: {
				provider_token: string;
				provider_name: string;
				provider_image: string;
			};
		};
	};
}

const LoansModal: React.FC<OverviewModalProps> = ({
	handleOpen,
	loanToken,
	fetchLoanDatas,
}) => {
	const [loansByToken, setLoansByToken] = useState<Loan | null>(null);
	const [showPlan, setShowPlan] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isDisLoading, setIsDisLoading] = useState<boolean>(false);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const togglePlan = () => {
		setShowPlan(!showPlan);
	};

	const fetchLoanData = async () => {
		try {
			const fetchedLoans = await getSpecificLoan(`$${token}`, `${loanToken}`);
			setLoansByToken(fetchedLoans);
			setIsLoading(false);
		} catch (error) {
			toast.error('Error fetching products');
			console.error('Error fetching products:', error);
		}
	};

	useEffect(() => {
		fetchLoanData();
	}, []);

	return (
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-1 md:px-8 h-screen overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={() => handleOpen('')}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				{isLoading ? (
					<div className='grid items-center justify-center font-semibold text-lg h-full'>
						<Spinner className='h-4 w-4' />
					</div>
				) : (
					<div className='bg-white p-4 w-full'>
						<div>
							{/* amount */}
							<div className='bg-greens relative z-0 text-white mt-4 rounded-lg flex flex-col justify-center px-10 py-16'>
								<div className='flex items-center justify-between'>
									<p className='text-white/70 text-sm'>Outstanding Loan</p>
									<p className='text-white/70 text-sm'>
										{loansByToken?.loanStatus}
									</p>
								</div>
								<h1 className='text-3xl font-bold mt-3 '>
									N {loansByToken?.amount_plus_intrest}
								</h1>
							</div>

							{/* details */}
							<div className='relative z-10 w-full'>
								{/* loan details */}
								<div className='w-[60%] bg-white absolute shadow-lg rounded-lg -top-10 z-10 left-[50%] -translate-x-[50%] p-7'>
									{/* amount / duration */}
									<div className='flex justify-between items-center'>
										{/* amount */}
										<div className='w-full border-r border-dark/30'>
											<p className='text-dark/70 text-sm'>Amount</p>
											<p className='font-semibold '>
												N{loansByToken?.amount_plus_intrest}
											</p>
										</div>

										{/* duration */}
										<div className='w-full border-l border-dark/30 text-right'>
											<p className='text-dark/70 text-sm'>Duration</p>
											<p className='font-semibold'>
												{loansByToken?.package_plan}
											</p>
										</div>
									</div>

									{/* status / request */}
									<div className='flex justify-between items-center mt-5'>
										{/* status */}
										<div className='w-full border-r border-dark/30 grid '>
											<p className='text-dark/70 text-sm'>Status</p>
											<p className='font-semibold'>
												{loansByToken?.loanStatus}
											</p>
										</div>

										{/* request */}
										<div className='w-full border-l border-dark/30 text-right'>
											<p className='text-dark/70 text-sm'>Requested date</p>
											<p className='font-semibold'>
												{loansByToken?.requested_date}
											</p>
										</div>
									</div>
								</div>

								{/* repayment details */}
								<div className='pt-[9rem]'>
									{/* guarantors */}
									<div className='mt-7 bg-greens/10  py-2 px-4 rounded-lg'>
										<div
											className='cursor-pointer flex items-center justify-between'
											onClick={togglePlan}>
											<p className=' text-dark text-lg font-semibold'>
												View Repayment Plan
											</p>

											{showPlan ? <HiChevronUp /> : <HiChevronDown />}
										</div>
										{showPlan && (
											<div className='mt-5'>
												{loansByToken?.other_related_info?.getAllRecordsOfMonthExpectedToPay?.map(
													(record, index) => (
														<div
															key={index}
															className='border-b border-dark/30 font-medium py-7 '>
															{/* header */}
															<div className='flex items-center gap-4 '>
																{/* number */}
																<div className=' w-[2.5rem] aspect-square rounded-full grid items-center justify-center bg-greens text-white border-[3px] border-white'>
																	<p>{index + 1}</p>
																</div>

																{/* plan */}
																<p className='font-semibold text-lg'>
																	{index + 1} payment
																</p>
															</div>

															{/* repay details */}
															<div className='px-4 mt-4 flex flex-col gap-1'>
																{/* repay date */}
																<div className='flex items-center justify-between'>
																	<p>Repayment Date:</p>

																	<p className='text-right'>
																		{record?.dueDate}
																	</p>
																</div>

																{/* repay amount */}
																<div className='flex items-center justify-between'>
																	<p>Repayment Amount:</p>

																	<p className='text-right'>
																		<span className='font-semibold'>N </span>
																		{record?.priceExpectedToPay}
																	</p>
																</div>

																{/* payment status */}
																<div className='flex items-center justify-between'>
																	<p>Payment status:</p>

																	<p className='text-right'>
																		{record?.paymentStatus}
																	</p>
																</div>

																{/* penalty fee */}
																<div className='flex items-center justify-between'>
																	<p>Penalty Fee:</p>

																	<p className='text-right'>
																		<span className='font-semibold'>N </span>
																		{record?.penaltyFee}
																	</p>
																</div>
															</div>
														</div>
													)
												)}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<ToastContainer />
		</div>
	);
};

export default LoansModal;
