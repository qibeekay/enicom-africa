'use client';
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
	handleOpen: (productToken: string) => void;
	productToken: string;
	fetchProduct: () => void;
}

interface Product {
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

const OverviewModal: React.FC<OverviewModalProps> = ({
	handleOpen,
	productToken,
	fetchProduct,
}) => {
	const [productsByToken, setProductsByToken] = useState<Product | null>(null);
	const [disapproveReason, setDisapproveReason] = useState<string>('');
	const [showDisapproveForm, setShowDisapproveForm] = useState<boolean>(false);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const fetchProducts = async () => {
		try {
			const fetchedProducts = await getAdminProductByToken(
				`$${token}`,
				`${productToken}`
			);
			setProductsByToken(fetchedProducts);
		} catch (error) {
			toast.error('Error fetching products');
			console.error('Error fetching products:', error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	// approve product
	const approve = async () => {
		const approveProducts = await approveProduct(
			`$${token}`,
			`${productToken}`,
			`${productsByToken?.product_name}`,
			`${productsByToken?.product_condition}`,
			`${usertoken}`
		);
		toast.success('Product Approved');
		fetchProduct();
	};

	const disapprove = () => {
		setShowDisapproveForm(true);
	};

	const handleDisapproveSubmit = async (event: FormEvent) => {
		event.preventDefault();
		// Perform disapproval process with disapproveReason
		const disapproveProducts = await disapproveProduct(
			`$${token}`,
			`${productToken}`,
			`${productsByToken?.product_name}`,
			disapproveReason,
			`${productsByToken?.product_condition}`,
			`${usertoken}`
		);

		// Close the form and fetch updated products
		setShowDisapproveForm(false);
		fetchProduct();
		toast.success('Product Disapproved');
	};
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
									src={productsByToken?.product_image}
									alt=''
								/>
							</div>

							{/* increment */}
							<div className='flex justify-between items-center my-4'>
								{/* - */}
								<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl cursor-pointer'>
									<p>-</p>
								</div>

								{/* 1 */}
								<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white'>
									<p>{productsByToken?.product_quantity}</p>
								</div>

								{/* + */}
								<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl'>
									<p>+</p>
								</div>
							</div>

							{/* purchase */}
							<div className='mt-6'>
								<button
									className='py-2 bg-greens w-full text-white rounded-md'
									onClick={approve}>
									Approve Product
								</button>
							</div>

							{/* Add to Cart */}
							<div className='mt-5'>
								<button
									className='py-2 bg-[#222222] w-full text-white rounded-md flex gap-4 items-center justify-center cursor-pointer'
									onClick={disapprove}>
									Disapprove Product
								</button>
							</div>

							{showDisapproveForm && (
								<div className=' mt-5'>
									<form
										onSubmit={handleDisapproveSubmit}
										className='flex gap-4 items-center'>
										<label>
											<input
												className='w-full outline-none border py-2 border-dark rounded-lg px-4'
												placeholder='Disapproval Reason:'
												value={disapproveReason}
												onChange={(e) => setDisapproveReason(e.target.value)}
												required
											/>
										</label>
										<button
											type='submit'
											className='bg-greens rounded-lg text-white py-2 px-4 cursor-pointer'>
											Submit
										</button>
									</form>
								</div>
							)}
						</div>

						<div className='w-full'>
							<div>
								<p className=' text-dark'>{productsByToken?.product_name}</p>
								<p className='text-dark text-xl font-semibold '>
									{productsByToken?.product_price}
								</p>
							</div>
							<div className='my-2 text-dark text-sm md:text-base'>
								<p className='flex gap-4 text-sm md:text-base'>
									Description:
									<span>{productsByToken?.product_desc}</span>
								</p>
							</div>
							<div className='text-sm md:text-base'>
								<p>By Sdelaide Ventures</p>
								<p className='flex gap-4 my-3'>
									Capacity:{' '}
									<span>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Voluptatum ullam nobis fugit consectetur debitis similique.
									</span>
								</p>

								<p>Delivery: 10 - 15 days after request</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default OverviewModal;
