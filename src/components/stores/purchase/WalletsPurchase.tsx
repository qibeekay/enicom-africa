'use client';
import { CompletePay } from '@/api/cart/cart';
import { useCart } from '@/components/CartContext';
import { Input, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useFormData } from './FormDataContext';
import { useTabContext } from '@/components/TabContext';
import { ToastContainer, toast } from 'react-toastify';

const WalletsPurchase = () => {
	const { setTab } = useTabContext();
	const [otpData, setOtpData] = useState({
		otp: '',
	});

	// Function to handle form input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setOtpData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const { fetchCartItem, cartItems, total_price_th, total_price } = useCart();
	const { formData } = useFormData();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const router = useRouter();

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// Function to handle the payment process
	const handlePayment = async () => {
		try {
			const cartItemsWithFormData = cartItems.map((item) => ({
				product_token: item.product_token,
				product_quantity: item.product_quantity,
				product_price: item.product_price,
				product_owner: item.product_owner,
				product_name: item.product_name,
				product_image: item.product_image,
				product_type: item.product_type,
			}));

			const products = cartItemsWithFormData || [];

			const engineerId = { engineer_id: 0 };
			const address = formData;
			const totalPrice = total_price || 0;

			// Call the CompletePay function
			const paymentResult = await CompletePay(
				`$${token}`,
				`${usertoken}`,
				otpData.otp,
				products,
				engineerId,
				address,
				totalPrice
			);

			if (paymentResult.success === false) {
				toast.warn(paymentResult.message);
			} else {
				// The toast notification should be success, not error
				toast.success('Payment successfully');
				setTab('3');
			}

			// You can add additional logic based on the payment result, e.g., show a success message

			// Optionally, close the modal or navigate to a success page
		} catch (error) {
			// Handle errors, e.g., show an error message
			toast.error('Error processing payment:');
			console.error('Error processing payment:', error);
		}
	};

	console.log(cartItems);

	console.log('Form Data in AnotherComponent:', formData);

	return (
		<div className='w-full my-32'>
			<div>
				<form action='' className='relative'>
					{/* Verification Code */}
					<div className='flex flex-col items-center justify-center w-full'>
						<div className='w-[50%]'>
							<Typography className='mb-1 text-dark'>
								Enter Verification pin
							</Typography>
							<Input
								size='lg'
								className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								name='otp'
								value={otpData.otp}
								onChange={handleInputChange}
								crossOrigin={undefined}
							/>
						</div>
						<div className='mt-10 grid items-center justify-center'>
							<button
								className='bg-greens px-14 py-2 rounded-lg text-white'
								onClick={handlePayment}
								type='button'>
								Complete Payment
							</button>
						</div>
					</div>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};

export default WalletsPurchase;
