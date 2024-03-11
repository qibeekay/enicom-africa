'use client';
import { getSpecificLoan } from '@/api/loan/loan';
import {
	approveProduct,
	disapproveProduct,
	getAdminProductByToken,
} from '@/api/products/products';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { HiChevronLeft } from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';

interface OverviewModalProps {
	handleOpen: (loanToken: string) => void;
	loanToken: string;
	fetchLoanDatas: () => void;
}

interface Loan {
	product_name: string;
	poduct_price_th: string;
	product_price: string;
	product_image: string;
	product_token: string;
	product_desc: string;
	product_condition: string;
	product_quantity: number;
	maximum_quantity: number;
}

const LoansModal: React.FC<OverviewModalProps> = ({
	handleOpen,
	loanToken,
	fetchLoanDatas,
}) => {
	const [loansByToken, setLoansByToken] = useState<Loan | null>(null);
	// const [disapproveReason, setDisapproveReason] = useState<string>('');
	// const [showDisapproveForm, setShowDisapproveForm] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDisLoading, setIsDisLoading] = useState<boolean>(false);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const fetchLoanData = async () => {
		try {
			const fetchedLoans = await getSpecificLoan(`$${token}`, `${loanToken}`);
			setLoansByToken(fetchedLoans);
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

				<div className='bg-white p-4 w-full'>
					<div className='flex flex-col md:flex-row gap-5'>
						{/* image */}
						<div className='sm:w-[20rem] md:w-[50%]'>
							{/* img */}
							<div className=' w-full rounded-lg h-[17rem] overflow-hidden'>
								<img
									className='w-full h-full'
									src={loansByToken?.product_image}
									alt=''
								/>
							</div>
						</div>

						<div className='w-full'>
							<div>
								<p className=' text-dark'>{loansByToken?.product_name}</p>
								<p className='text-dark text-xl font-semibold '>
									{loansByToken?.product_price}
								</p>
							</div>
							<div className='my-2 text-dark text-sm md:text-base'>
								<p className='flex gap-4 text-sm md:text-base'>
									Description:
									<span>{loansByToken?.product_desc}</span>
								</p>
							</div>
							<div className='text-sm md:text-base'>
								<p>By Sdelaide Ventures</p>
								<p className='flex gap-4 my-3'>
									{/* Capacity:{' '}
									<span>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Voluptatum ullam nobis fugit consectetur debitis similique.
									</span> */}
								</p>

								{/* <p>Delivery: 10 - 15 days after request</p> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default LoansModal;
