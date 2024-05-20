'use client';
import { changeSellersStatus, getSellersByToken } from '@/api/kyc/kyc';
import { Button } from '@material-tailwind/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';

interface OverviewModalProps {
	handleOpen: (productToken: string) => void;
	sellersToken: string;
	fetchSellers: () => void;
}
interface Seller {
	// Define the structure of your product data
	fname: string;
	requested_date: string;
	bussiness_type: string;
	is_verified_seller_status: string;
	is_verified_seller: string;
	seller_profile_token: string;
	data: {
		fname: string;
		mail: string;
		profile_image: string;
		phone_number: string;
		address: string;
		seller_profile_credentials: {
			cac_number: string;
			utility_bill: string;
			bussiness_name: string;
			verification_type: string;
			verification_number: string;
			current_production_capacity: string;
			fast_supply_deliveries: string;
			effective_support_process: string;
			error_margin_expect: string;
			customer_support_staff: string;
			greater_demand: string;
			product_catalogue: string;
		};
		// Add other properties as needed
	};
}

const SellersModal: React.FC<OverviewModalProps> = ({
	handleOpen,
	fetchSellers,
	sellersToken,
}) => {
	const [sellersByToken, setSellersByToken] = useState<Seller | null>(null);
	const [disapproveReason, setDisapproveReason] = useState<string>('');
	const [selectedFilter, setSelectedFilter] = useState<string>('');
	const [showDisapproveForm, setShowDisapproveForm] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDisLoading, setIsDisLoading] = useState<boolean>(false);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const fetchProducts = async () => {
		try {
			const fetchedProducts = await getSellersByToken(
				`$${token}`,
				`${sellersToken}`
			);
			setSellersByToken(fetchedProducts);
		} catch (error) {
			toast.error('Error fetching products');
			console.error('Error fetching products:', error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const approveVerify = 1;
	const disapproveVerify = 2;

	const disapprove = () => {
		setShowDisapproveForm(true);
	};

	// approve product
	const approve = async () => {
		setIsLoading(true);
		try {
			const approveProducts = await changeSellersStatus(
				`$${token}`,
				`${sellersToken}`,
				approveVerify,
				disapproveReason,
				`${usertoken}`
			);
			toast.success('Seller is now approved!');
			setIsLoading(false);
			fetchSellers();
		} catch (error: any) {
			setIsLoading(false);
			toast.error('Error disapproving seller');
		}
	};

	const handleDisapproveSubmit = async (event: FormEvent) => {
		event.preventDefault();
		// Perform disapproval process with disapproveReason
		setIsDisLoading(true);
		try {
			const disapproveProducts = await changeSellersStatus(
				`$${token}`,
				`${sellersToken}`,
				disapproveVerify,
				disapproveReason,
				`${usertoken}`
			);

			// Close the form and fetch updated products
			setShowDisapproveForm(false);
			setIsDisLoading(false);
			toast.success('Seller has been Declined!');
			fetchSellers();
		} catch (error) {
			setIsDisLoading(false);
			toast.error('Error declining seller');
		}
	};

	console.log(sellersByToken);
	return (
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-1 h-screen md:px-8 overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={() => handleOpen('')}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				<div className='bg-white p-4 w-full'>
					<div className=''>
						{/* image */}
						<div className='flex flex-col sm:flex-row sm:items-center gap-4'>
							{/* img */}
							<div className=' w-[7rem] aspect-square rounded-full overflow-hidden'>
								<img
									className='w-full h-full'
									src={sellersByToken?.data?.profile_image}
									alt=''
								/>
							</div>

							{/* name details */}
							<div className='flex gap-4'>
								<div className='flex flex-col'>
									<span className='font-semibold'>Name: </span>
									<span className='font-semibold'>Email: </span>
									<span className='font-semibold'>Phone: </span>
									<span className='font-semibold'>Address: </span>
								</div>
								<div className='flex flex-col'>
									<p className=' text-dark'>{sellersByToken?.data?.fname}</p>
									<p className='text-dark'>{sellersByToken?.data?.mail}</p>
									<p className='text-dark'>
										{sellersByToken?.data?.phone_number}
									</p>
									<p className='text-dark'>{sellersByToken?.data?.address}</p>
								</div>
							</div>
						</div>

						<div className='w-full flex gap-2 mt-6'>
							<div className='flex flex-col'>
								<span className='font-semibold'>Business Type: </span>
								{sellersByToken?.bussiness_type === 'Individual' ? null : (
									<span className='font-semibold'>Business Name: </span>
								)}
								{sellersByToken?.bussiness_type === 'Individual' ? null : (
									<span className='font-semibold'>CAC Number: </span>
								)}
								<span className='font-semibold'>Verification Type: </span>
								<span className='font-semibold'>Verification Number: </span>
								<span className='font-semibold'>Production Capacity: </span>
								<span className='font-semibold'>Delivery Speed: </span>
								<span className='font-semibold'>Support Process: </span>
								<span className='font-semibold'>Expected Error Margin: </span>
								<span className='font-semibold'>Support Staff: </span>
								<span className='font-semibold'>Price Adjustments: </span>
								<span className='font-semibold'>Status: </span>
								<span className='font-semibold'>Request Date: </span>
							</div>
							<div className='flex flex-col'>
								<p className=' text-dark'>{sellersByToken?.bussiness_type}</p>
								{sellersByToken?.bussiness_type === 'Individual' ? null : (
									<p className=' text-dark'>
										{
											sellersByToken?.data?.seller_profile_credentials
												?.bussiness_name
										}
									</p>
								)}

								{sellersByToken?.bussiness_type === 'Individual' ? null : (
									<p className=' text-dark'>
										{
											sellersByToken?.data?.seller_profile_credentials
												?.cac_number
										}
									</p>
								)}

								<p className=' text-dark'>
									{
										sellersByToken?.data?.seller_profile_credentials
											?.verification_type
									}
								</p>

								<p className=' text-dark'>
									{
										sellersByToken?.data?.seller_profile_credentials
											?.verification_number
									}
								</p>

								<p className=' text-dark'>
									{
										sellersByToken?.data?.seller_profile_credentials
											?.current_production_capacity
									}
								</p>
								<p className=' text-dark'>
									{
										sellersByToken?.data?.seller_profile_credentials
											?.fast_supply_deliveries
									}
								</p>
								<p className=' text-dark'>
									{
										sellersByToken?.data?.seller_profile_credentials
											?.effective_support_process
									}
								</p>
								<p className=' text-dark'>
									{
										sellersByToken?.data?.seller_profile_credentials
											?.error_margin_expect
									}
								</p>
								<p className=' text-dark'>
									{
										sellersByToken?.data?.seller_profile_credentials
											?.customer_support_staff
									}
								</p>
								<p className=' text-dark'>
									{
										sellersByToken?.data?.seller_profile_credentials
											?.greater_demand
									}
								</p>
								<p className=' text-dark'>
									{sellersByToken?.is_verified_seller_status}
								</p>
								<p className=' text-dark'>{sellersByToken?.requested_date}</p>
							</div>
						</div>

						<div>
							<p className='font-semibold'>Product Catalog</p>
							<div className='w-[25rem] h-[15rem]'>
								<img
									className='w-full'
									src={`https://enicom.iccflifeskills.com.ng/uploads/${sellersByToken?.data?.seller_profile_credentials?.product_catalogue}`}
									alt={
										sellersByToken?.data?.seller_profile_credentials
											?.product_catalogue
									}
								/>
							</div>
						</div>

						{sellersByToken?.bussiness_type === 'Individual' ? null : (
							<div>
								<p className='font-semibold'>Utility Bill</p>
								<div className='w-[25rem] h-[15rem]'>
									<img
										className='w-full'
										src={`https://enicom.iccflifeskills.com.ng/uploads/${sellersByToken?.data?.seller_profile_credentials?.utility_bill}`}
										alt={
											sellersByToken?.data?.seller_profile_credentials
												?.verification_number
										}
									/>
								</div>
							</div>
						)}
						<div className='flex items-center mt-7'>
							<Button size='sm' onClick={() => handleOpen('')}>
								Close
							</Button>
							<div className='w-full flex items-center gap-4 justify-end'>
								<Button color='green' onClick={approve}>
									{isLoading ? 'Loading...' : 'Approve'}
								</Button>
								<Button variant='outlined' color='red' onClick={disapprove}>
									Decline
								</Button>
								{showDisapproveForm && (
									<div className=''>
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
												{isDisLoading ? 'Loading...' : 'Submit'}
											</button>
										</form>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default SellersModal;
