'use client';
import { useTabContext } from '@/components/TabContext';
import { Dialog, Spinner } from '@material-tailwind/react';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi2';
import LoanModal from './LoanModal';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import { useFormData } from './FormDataContext';
import { CompletePay } from '@/api/cart/cart';
import { GoCheckCircleFill } from 'react-icons/go';
interface CartDetailsProps {
	handleOpen: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
	tabOpen: (value: boolean) => void;
}

const PurchaseModal: React.FC<CartDetailsProps> = ({ handleOpen, tabOpen }) => {
	const { setTab } = useTabContext();
	const [open, setOpen] = React.useState(false);
	const handleOpen1 = () => setOpen((cur) => !cur);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { fetchCartItem, cartItems, total_price_th, total_price } = useCart();
	const { formData } = useFormData();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const router = useRouter();

	const transformCartItems = () => {
		return cartItems.map((item) => ({
			productToken: item.product_token,
			quantity: item.product_quantity,
			price: parseFloat(item.product_price.replace(',', '')),
			productOwner: item.product_owner.toString(),
		}));
	};

	const transformedItems = transformCartItems();

	console.log(transformedItems);

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const initialize = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			// Perform the decrease operation
			const response = await CompletePay(
				`$${token}`,
				usertoken,
				transformedItems,
				formData.state,
				formData.city,
				formData.address
			);

			if (response.success === false) {
				toast.warn(response.message);
				setIsLoading(false);
			} else {
				toast.success('Payment successfull');
				handleOpen1();
			}
		} catch (error) {
			console.error('Error initializing payment:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-1 md:px-8 h-screen overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={handleOpen}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				{/* header */}
				<p className='text-center font-medium text-xl'>Payment Method</p>

				<div className='flex flex-col lg:flex-row items-center gap-16 px-4 xl:px-10 mt-10'>
					{/* pay now */}
					<div className='w-full sm:w-[25rem] lg:w-full'>
						<button
							onClick={initialize}
							className='flex gap-5 bg-[#E4FEE3] rounded-2xl p-4 sm:p-7'>
							{isLoading ? (
								<div className='flex items-center'>
									<p>Processing... </p> <Spinner className='h-4 w-4' />
								</div>
							) : (
								<>
									<div className='w-[8rem] aspect-square h-fit'>
										<img className='w-full h-full' src='/check.png' alt='' />
									</div>

									<div>
										<p className='text-lg sm:text-2xl font-semibold'>Pay Now</p>
										<p className='text-sm sm:text-base pb-5'>
											Secure your purchase with our easy and secure payment
											options.
										</p>

										<p className='font-semibold  sm:text-base'>
											Pay from your Wallet directly.
										</p>
										<p className='font-semibold sm:text-base'>
											Enjoy a 0% charge experience
										</p>
									</div>
								</>
							)}
						</button>
					</div>

					{/* buy on credit */}
					{isLoading ? (
						''
					) : (
						<div className='w-full sm:w-[25rem] lg:w-full'>
							<Link
								// onClick={handleOpen1}
								href={''}
								className='flex gap-5 bg-[#E4FEE3] rounded-2xl p-4 sm:p-7'>
								<div className='w-[8rem] aspect-square h-fit'>
									<img className='w-full h-full' src='/check.png' alt='' />
								</div>

								<div>
									<p className='text-lg sm:text-2xl font-semibold'>
										Buy on Credit
									</p>
									<p className='text-sm sm:text-base pb-5'>
										We offer up to N500,000 as loans to help stable your
										business. we trust you on your honour.
									</p>

									<p className='font-semibold  sm:text-lg'>
										Choose payback date
									</p>
									<p className='font-semibold sm:text-lg'>Just 2% interest</p>
								</div>
							</Link>
						</div>
					)}
					<ToastContainer />
				</div>
			</div>
			{/* <Dialog
				size='lg'
				open={open}
				handler={handleOpen1}
				className='bg-transparent shadow-none text-dark'>
				<LoanModal handleOpen1={handleOpen1} />
			</Dialog> */}

			<Dialog open={open} handler={handleOpen1}>
				<div className='grid items-center justify-center text-center py-20'>
					<h1 className=' text-[28px] font-semibold text-greens'>
						Congratulations
					</h1>

					<div className='grid items-center justify-center text-greens my-7'>
						<GoCheckCircleFill size='100' />
					</div>

					<p className=' font-medium text-dark/[85%]'>
						You purchase has been placed succesfully. Check your email for more
						details
						{/* <span className='text-greens'>$100,000</span>. */}
					</p>

					<div className='mt-10'>
						<Link
							href={'/dashboard'}
							className='bg-greens px-6 py-2 rounded-lg text-white'>
							Go To Home
						</Link>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default PurchaseModal;
