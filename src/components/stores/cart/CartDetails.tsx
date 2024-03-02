'use client';
import { Dialog, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import CartModal from './CartModal';
import { MdLiveHelp } from 'react-icons/md';
import {
	DecreaseCartItems,
	DeleteCartItems,
	IncreaseCartItems,
	IntializePay,
} from '@/api/cart/cart';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '@/components/CartContext';
import axios from 'axios';
import { getUser } from '@/api/products/products';
import { useRouter } from 'next/navigation';

const CartDetails = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	const { cartItems, fetchCartItem, total_price_th } = useCart();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const router = useRouter();

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const increase = async (
		productToken: string,
		currentQuantity: number,
		maximumQuantity: number
	) => {
		try {
			const updatedQuantity = currentQuantity + 1;

			// Check if the updated quantity exceeds the maximum quantity
			if (updatedQuantity > maximumQuantity) {
				toast.error('Quantity exceeds the maximum allowed');
				return;
			}

			// Perform the increase operation
			await IncreaseCartItems(`$${token}`, `${productToken}`, `${usertoken}`);

			// Fetch updated cart items after increasing
			fetchCartItem();
		} catch (error) {
			toast.error('Error increasing products');
			console.error('Error increasing products:', error);
		}
	};

	const decrease = async (productToken: string, currentQuantity: number) => {
		try {
			const updatedQuantity = currentQuantity - 1;

			// Check if the updated quantity is less than 0
			if (updatedQuantity < 0) {
				toast.error('Quantity cannot be less than 0');
				return;
			}

			// Perform the decrease operation
			await DecreaseCartItems(`$${token}`, `${productToken}`, `${usertoken}`);

			// Fetch updated cart items after decreasing
			fetchCartItem();
		} catch (error) {
			toast.error('Error decreasing products');
			console.error('Error decreasing products:', error);
		}
	};

	const remove = async (productToken: string) => {
		try {
			// Perform the decrease operation
			await DeleteCartItems(`$${token}`, `${productToken}`, `${usertoken}`);

			// Fetch updated cart items after decreasing
			await fetchCartItem();
			toast.success('item removed');
		} catch (error) {
			toast.error('Error removing products');
			console.error('Error removing products:', error);
		}
	};

	const purchase = () => {
		router.push('/purchase');
	};

	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			console.log(getusers);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
		}
	};

	useEffect(() => {
		getuser();
	}, []);

	// console.log(total_price_th);

	return (
		<div className='font-poppins my-10 relative'>
			<div className='max-w-6xl px-4 mx-auto'>
				{/* flex */}
				<div className='flex flex-col lg:flex-row gap-6'>
					{/* item */}
					<div className='w-full flex flex-col gap-y-6'>
						{/* items info */}
						{cartItems?.map((items, index) => (
							<div
								className='bg-white shadows rounded-lg p-4 w-full'
								key={index}>
								<div className='flex flex-col md:flex-row gap-5'>
									{/* image */}
									<div className='sm:w-[20rem] md:w-[50%]'>
										{/* img */}
										<div className=' w-full rounded-lg h-[9rem] overflow-hidden'>
											<img
												className='w-full h-full object-cover'
												src={items.product_image}
												alt=''
											/>
										</div>
									</div>

									<div className='w-full'>
										<div>
											<p className=' text-dark'>{items.product_name}</p>
											<p className='text-dark text-xl font-semibold '>
												{items.poduct_price_th}
											</p>
										</div>
										<div className='my-2 text-dark text-sm md:text-base'>
											<p className='flex gap-4 text-sm md:text-base'>
												Capacity: <span>{items.product_desc}</span>
											</p>
										</div>
									</div>
								</div>

								<div className='flex flex-col sm:flex-row items-center justify-between w-full mt-4'>
									{/* remove */}
									<div>
										<button
											className='bg-[#E4FEE3] py-2 px-[5.2rem] rounded-lg'
											onClick={() => remove(items.product_token)}>
											Remove
										</button>
									</div>
									{/* increment */}
									<div className='flex gap-5 items-center my-4'>
										{/* - */}
										<div
											className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl cursor-pointer'
											onClick={() =>
												decrease(items.product_token, items.product_quantity)
											}>
											<p>-</p>
										</div>

										{/* 1 */}
										<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white'>
											<p>{items.product_quantity}</p>
										</div>

										{/* + */}
										<div
											className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl cursor-pointer'
											onClick={() =>
												increase(
													items.product_token,
													items.product_quantity,
													items.maximum_quantity
												)
											}>
											<p>+</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* buttons */}
					{cartItems?.length === 0 ? (
						<p>Your cart is empty</p>
					) : (
						<div className=' sm:w-[20rem] md:w-[45%] bg-white shadows rounded-lg h-fit p-4'>
							<p className=' text-xl font-medium '>Cart Summary</p>

							{/* sub total */}
							<div className='flex items-center justify-between mt-3'>
								<p className='font-medium'>Sub Total</p>
								<p className=' text-xl font-semibold'>N{total_price_th}</p>
							</div>

							{/* Delivery fees included */}
							<p className=' mt-5'>Delivery fees included</p>

							{/* purchase */}
							<button
								className='w-full bg-greens text-white py-2 rounded-lg mt-11 mb-6'
								onClick={purchase}>
								Purchase
							</button>
						</div>
					)}
				</div>

				<ToastContainer />
			</div>
			<Dialog
				size='xl'
				open={open}
				handler={handleOpen}
				className='bg-transparent shadow-none text-dark'>
				<CartModal handleOpen={handleOpen} />
			</Dialog>

			{/* absolute */}
			<div className='fixed right-2 md:right-10 z-50 bottom-5 md:bottom-10 cursor-pointer text-greens '>
				<MdLiveHelp size={45} />
			</div>
		</div>
	);
};

export default CartDetails;
