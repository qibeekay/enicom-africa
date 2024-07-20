'use client';
import { useTabContext } from '@/components/TabContext';
import { Dialog } from '@material-tailwind/react';
import Link from 'next/link';
import React, { FormEvent } from 'react';
import { HiChevronLeft } from 'react-icons/hi2';
import LoanModal from './LoanModal';
import { IntializePay } from '@/api/cart/cart';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
interface CartDetailsProps {
	handleOpen: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
	tabOpen: (value: boolean) => void;
}

const PurchaseModal: React.FC<CartDetailsProps> = ({ handleOpen, tabOpen }) => {
	const { setTab } = useTabContext();
	const [open, setOpen] = React.useState(false);
	const handleOpen1 = () => setOpen((cur) => !cur);

	const { fetchCartItem, cartItems, total_price_th, total_price } = useCart();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const router = useRouter();

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const initialize = async (e: FormEvent) => {
		e.preventDefault();
		try {
			// Perform the decrease operation
			const response = await IntializePay(
				`$${token}`,
				`${total_price}`,
				`${usertoken}`
			);

			if (response.success === false) {
				toast.warn(response.message);
			} else {
				toast.success('Payment initialized successfully');
				tabOpen(true);
			}
		} catch (error) {
			toast.error('Error initializing payment');
			console.error('Error initializing payment:', error);
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
							<div className='w-[8rem] aspect-square h-fit'>
								<img className='w-full h-full' src='/check.png' alt='' />
							</div>

							<div>
								<p className='text-lg sm:text-2xl font-semibold'>Pay Now</p>
								<p className='text-sm sm:text-base pb-5'>
									Secure your purchase with our easy and secure payment options.
								</p>

								<p className='font-semibold  sm:text-lg'>
									Enjoy the experience
								</p>
								<p className='font-semibold sm:text-lg'>0% Charges</p>
							</div>
						</button>
					</div>

					{/* buy on credit */}
					<div className='w-full sm:w-[25rem] lg:w-full'>
						<Link
							onClick={handleOpen1}
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
									We offer up to N500,000 as loans to help stable your business.
									we trust you on your honour.
								</p>

								<p className='font-semibold  sm:text-lg'>Choose payback date</p>
								<p className='font-semibold sm:text-lg'>Just 2% interest</p>
							</div>
						</Link>
					</div>
					<ToastContainer />
				</div>
			</div>
			<Dialog
				size='lg'
				open={open}
				handler={handleOpen1}
				className='bg-transparent shadow-none text-dark'>
				<LoanModal handleOpen1={handleOpen1} />
			</Dialog>
		</div>
	);
};

export default PurchaseModal;
