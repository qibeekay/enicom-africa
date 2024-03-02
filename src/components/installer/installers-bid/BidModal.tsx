'use client';
import {
	getSellersRequestByToken,
	initiateBid,
} from '@/api/installer/installer';
import { Button } from '@material-tailwind/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import Datepicker from 'react-tailwindcss-datepicker';

interface OverviewModalProps {
	handleOpen: (productToken: string) => void;
	bidsToken: string;
	fetchRequests: () => void;
}

interface Request {
	buyer_token: string;
	state: string;
	address: string;
	name: string;
	description: string;
	has_accepted_agent: boolean;
	is_assigned_installer_status: string;
	on_going: boolean;
	preferred_installation_date: string;
	image: string;
	request_bidding_token: string;
	requested_date: string;
}

const BidModal: React.FC<OverviewModalProps> = ({
	handleOpen,
	fetchRequests,
	bidsToken,
}) => {
	const [bidsByToken, setBidsByToken] = useState<Request | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showBidForm, setShowBidForm] = useState<boolean>(false);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const fetchSingleRequest = async () => {
		try {
			const fetchedSingleRequest = await getSellersRequestByToken(
				`$${token}`,
				`${bidsToken}`
			);
			setBidsByToken(fetchedSingleRequest);
		} catch (error) {
			toast.error('Error fetching request');
			console.error('Error fetching request:', error);
		}
	};

	useEffect(() => {
		fetchSingleRequest();
	}, []);

	// handling date
	const [value1, setValue1] = useState({
		startDate: null,
		endDate: null,
	});

	const [value2, setValue2] = useState({
		startDate: null,
		endDate: null,
	});

	const handleValueChange1 = (newValue: any) => {
		console.log('newValue:', newValue);
		setValue1(newValue);
	};

	const handleValueChange2 = (newValue1: any) => {
		console.log('newValue1:', newValue1);
		setValue2(newValue1);
	};

	// show bid form
	const initiate = () => {
		setShowBidForm(true);
	};

	// hide bid form
	const cancelBid = () => {
		setShowBidForm(false);
	};

	// form data
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		description: '',
		preferred_installation_date: '',
		request_bidding_token: '',
		buyer_token: '',
		usertoken: usertoken,
	});

	// sets form data empty
	const resetForm = () => {
		setFormData({
			name: '',
			price: '',
			description: '',
			preferred_installation_date: '',
			request_bidding_token: '',
			buyer_token: '',
			usertoken: '',
		});
	};

	/* handling all form change */
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		// Check if the changed field is the verification type
	};

	// initiate bid
	const handleInitiateBid = async (event: FormEvent) => {
		event.preventDefault();
		try {
			setIsLoading(true);

			// Check if the token is defined before using it
			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			// Ensure that usertoken is a string and not null
			const userToken = formData.usertoken || '';
			const buyerToken = bidsByToken?.buyer_token || '';
			const requestToken = bidsByToken?.request_bidding_token || '';
			const customString = `${value1.startDate} - ${value2.startDate}` || '';

			const response = await initiateBid(
				{
					...formData,
					request_bidding_token: requestToken,
					buyer_token: buyerToken,
					preferred_installation_date: customString,
					usertoken: userToken,
				},
				`$${token}`
			);

			console.log('Request response:', response);

			if (response.success === true) {
				toast.success('Request Submitted, You will be notified when Approved');
				resetForm();
				// router.push('/verify-mail');
			} else {
				toast.error(response.message || 'Failed to request');
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to request');
		} finally {
			setIsLoading(false);
		}
	};

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
						<div className=''>
							{/* name details */}
							<div className='w-full flex gap-2 mt-6'>
								<div className='flex flex-col gap-2 w-full md:w-[70%]'>
									<div>
										<span className='font-semibold'>Name: </span>
										<p className=' md:hidden text-dark'>{bidsByToken?.name}</p>
									</div>
									<div>
										<span className='font-semibold'>State: </span>
										<p className=' md:hidden text-dark'>{bidsByToken?.state}</p>
									</div>
									<div>
										<span className='font-semibold'>Address: </span>
										<p className=' md:hidden text-dark'>
											{bidsByToken?.address}
										</p>
									</div>
									<div>
										<span className='font-semibold'>Assigned Status: </span>
										<p className=' md:hidden text-dark'>
											{bidsByToken?.has_accepted_agent ? 'Pending' : 'Assigned'}
										</p>
									</div>
									<div>
										<span className='font-semibold'>Installation Period: </span>
										<p className=' md:hidden text-dark'>
											{bidsByToken?.preferred_installation_date}
										</p>
									</div>
									<div>
										<span className='font-semibold'>Request Date: </span>
										<p className=' md:hidden  text-dark'>
											{bidsByToken?.requested_date}
										</p>
									</div>
									<div>
										<span className='font-semibold'>
											Installation Description:
										</span>
										<p className=' md:hidden text-dark'>
											{bidsByToken?.description}
										</p>
									</div>
								</div>
								<div className='hidden md:flex flex-col md:gap-2 w-full'>
									<p className=' text-dark'>{bidsByToken?.name}</p>
									<p className=' text-dark'>{bidsByToken?.state}</p>
									<p className=' text-dark'>{bidsByToken?.address}</p>
									<p className=' text-dark'>
										{bidsByToken?.has_accepted_agent ? 'Pending' : 'Assigned'}
									</p>
									<p className=' text-dark'>
										{bidsByToken?.preferred_installation_date}
									</p>
									<p className=' text-dark'>{bidsByToken?.requested_date}</p>
									<p className=' text-dark'>{bidsByToken?.description}</p>
								</div>
							</div>

							<div className=''>
								<div className='grid items-center justify-end'>
									{showBidForm ? (
										<Button variant='outlined' color='red' onClick={cancelBid}>
											Cancel
										</Button>
									) : (
										<Button variant='outlined' color='green' onClick={initiate}>
											Bid
										</Button>
									)}
								</div>
								{showBidForm && (
									<div className='mt-4'>
										<form
											onSubmit={handleInitiateBid}
											className='flex flex-col gap-4'>
											<label>
												<input
													className='w-full outline-none border py-2 border-dark rounded-lg px-4'
													placeholder='Firstname Lastname'
													name='name'
													value={formData.name}
													onChange={handleChange}
													required
												/>
											</label>
											<label>
												<input
													className='w-full outline-none border py-2 border-dark rounded-lg px-4'
													placeholder='Price of Installation in naira'
													name='price'
													value={formData.price}
													onChange={handleChange}
													required
												/>
											</label>
											<label>
												<textarea
													name='description'
													value={formData.description}
													onChange={handleChange}
													placeholder='Other Details, Instructions or Requirements'
													className='w-full border rounded-lg px-3 py-2 border-dark/50 h-[6rem] mt-2 outline-none'></textarea>
											</label>

											{/* preferred installation date */}
											<div className='flex items-center gap-2 flex-col sm:flex-row'>
												<Datepicker
													useRange={false}
													asSingle={true}
													placeholder={'Start Date'}
													value={value1}
													inputClassName='w-full rounded-md focus:ring-0 font-normal border border-dark px-4 py-2'
													toggleClassName='absolute bg-greens rounded-r-lg text-white right-0 h-full px-4 py-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
													onChange={handleValueChange1}
													primaryColor={'green'}
													showShortcuts={false}
												/>

												<Datepicker
													useRange={false}
													asSingle={true}
													placeholder={'End Date'}
													value={value2}
													inputClassName='w-full rounded-md focus:ring-0 font-normal border border-dark px-4 py-2'
													toggleClassName='absolute bg-greens rounded-r-lg text-white right-0 h-full px-4 py-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
													onChange={handleValueChange2}
													primaryColor={'green'}
													showShortcuts={false}
												/>
											</div>

											<button
												type='submit'
												className='bg-greens rounded-lg text-white py-2 px-4 cursor-pointer'>
												{isLoading ? 'Requesting...' : 'Request'}
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

export default BidModal;
