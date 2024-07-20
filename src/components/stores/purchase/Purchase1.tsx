'use client';
import {
	Dialog,
	Input,
	Option,
	Select,
	Typography,
} from '@material-tailwind/react';
import React from 'react';
import { BsCart } from 'react-icons/bs';
import { HiMiniStar } from 'react-icons/hi2';
import PurchaseModal from './PurchaseModal';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import { CompletePay, IntializePay } from '@/api/cart/cart';
import { ToastContainer, toast } from 'react-toastify';
import { useFormData } from './FormDataContext';

interface props {
	setIsTab1Complete: (value: boolean) => void;
}

const Purchase1 = ({ setIsTab1Complete }: props) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);

	const { fetchCartItem, cartItems, total_price_th, total_price } = useCart();

	// State for form data
	const { formData, updateFormData } = useFormData();

	// Function to handle form input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		updateFormData({
			[name]: value,
		});
	};

	console.log(total_price);

	return (
		<div className='font-poppins my-10'>
			<div className='max-w-6xl px-4 mx-auto'>
				{/* flex */}
				<form className='flex flex-col-reverse md:flex-row gap-4 lg:gap-32'>
					{/* item */}
					<div className='w-full'>
						{/* items info */}
						<div className='bg-[#F2FFF1] px-4 sm:px-10 pt-8 pb-4 rounded-lg'>
							<h1 className='uppercase '>Order Summary</h1>

							{/* orders */}
							<div>
								{cartItems?.map((items, index) => (
									<div key={index} className='flex justify-between mt-7'>
										{/* image */}
										<div className='w-[7rem] sm:w-[10rem] aspect-[2/1.2] rounded-xl overflow-hidden'>
											<img
												className='w-full h-full object-cover'
												src={items.product_image}
												alt=''
											/>
										</div>

										{/* text */}
										<div className='text-right'>
											<p className=' uppercase'>{items.product_name}</p>

											<p className='text-greens font-medium my-2'>
												{items.product_price}
											</p>

											<p className='flex gap-4 sm:gap-10 items-center justify-end'>
												Quantity: <span>{items.product_quantity}</span>
											</p>
										</div>
									</div>
								))}
							</div>

							{/* engineer */}
							{/* <div className='flex items-center justify-between my-7'> */}
							{/* details */}
							{/* <div className='flex items-center gap-4'> */}
							{/* image */}
							{/* <div className=' w-[2rem] aspect-square overflow-hidden rounded-full'>
										<img
											className='w-full h-full object-cover object-center'
											src='/img.png'
											alt=''
										/>
									</div>

									<div>
										<p>Senator agbadfd</p>
										<p className='text-sm'>Installer</p>
									</div>
								</div> */}

							{/* rating / price */}
							{/* <div>
									<p className='text-greens font-medium text-right'>N50,000</p>
									<div className='flex gap-1 text-[#D49901] py-1'>
										<HiMiniStar />
										<HiMiniStar />
										<HiMiniStar />
										<HiMiniStar />
										<HiMiniStar />
									</div>
								</div> */}
							{/* </div> */}

							{/* total */}
							<div className='flex justify-between items-center font-medium mt-10'>
								<p>Total:</p>
								<p className='text-greens'>N{total_price_th}</p>
							</div>

							{/* pay now */}
							<button
								className='w-full bg-greens text-white py-3 rounded-lg mt-8'
								type='button'
								onClick={handleOpen}>
								Pay Now
							</button>
						</div>
					</div>

					{/* buttons */}
					<div className=' md:w-[80%] bg-[#F2FFF1] rounded-lg p-10'>
						<p className=' text-lg font-medium'>Confirm Address</p>

						<div className='mt-10'>
							<div className='grid gap-y-2'>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>State</Typography>
									<Input
										size='lg'
										className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
										labelProps={{
											className: 'before:content-none after:content-none',
										}}
										name='state'
										value={formData.state}
										onChange={handleInputChange}
										crossOrigin={undefined}
									/>
								</div>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>
										Local Government
									</Typography>
									<Input
										size='lg'
										className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
										labelProps={{
											className: 'before:content-none after:content-none',
										}}
										name='local_govt'
										value={formData.local_govt}
										onChange={handleInputChange}
										crossOrigin={undefined}
									/>
								</div>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>Address</Typography>
									<Input
										size='lg'
										className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
										labelProps={{
											className: 'before:content-none after:content-none',
										}}
										name='address'
										value={formData.address}
										onChange={handleInputChange}
										crossOrigin={undefined}
									/>
								</div>
							</div>
						</div>

						<div className='flex items-center gap-5 text-dark mt-20 mb-2 justify-between'>
							<p>Delivery fee:</p>
							<p className='font-semibold text-lg text-greens'>00</p>
						</div>
						<ToastContainer />
					</div>
				</form>

				<Dialog
					size='lg'
					open={open}
					handler={handleOpen}
					className='bg-transparent shadow-none text-dark'>
					<PurchaseModal handleOpen={handleOpen} tabOpen={setIsTab1Complete} />
				</Dialog>
			</div>
		</div>
	);
};

export default Purchase1;
