'use client';
import {
	changeAgentsStatus,
	changeSellersStatus,
	getAgentsByToken,
} from '@/api/kyc/kyc';
import { Button, Spinner } from '@material-tailwind/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';

interface OverviewModalProps {
	handleOpen: (productToken: string) => void;
	agentsToken: string;
	fetchAgents: () => void;
}
interface Agent {
	// Define the structure of your product data
	fname: string;
	requested_date: string;
	is_verified_agent_status: string;
	is_verified_agent: string;
	agent_token: string;
	data: {
		fname: string;
		mail: string;
		profile_image: string;
		phone_number: string;
		address: string;
		agent_profile_credentials: {
			cac_number: string;
			utility_bill: string;
			experiences: string;
			education_bg: string;
			tax_id_number: string;
			verification_type: string;
			verification_number: string;
		};
		// Add other properties as needed
	};
}

const AgentsModal: React.FC<OverviewModalProps> = ({
	handleOpen,
	fetchAgents,
	agentsToken,
}) => {
	const [agentsByToken, setAgentsByToken] = useState<Agent | null>(null);
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
			const fetchedProducts = await getAgentsByToken(
				`$${token}`,
				`${agentsToken}`
			);
			setAgentsByToken(fetchedProducts);
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

	// show disapprove form, so admin can enter the reason for disapproving
	const disapprove = () => {
		setShowDisapproveForm(true);
	};

	// approve product
	const approve = async () => {
		setIsLoading(true);
		try {
			const approveProducts = await changeAgentsStatus(
				`$${token}`,
				`${agentsToken}`,
				approveVerify,
				disapproveReason,
				`${usertoken}`
			);
			setIsLoading(false);
			toast.success('Agent is now approved!');
			fetchAgents();
		} catch (error) {
			setIsLoading(false); // Ensure isLoading is set to false in case of an error
			toast.error('Error approving agent');
			// console.error('Error approving agent:', error);
		}
	};

	const handleDisapproveSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setIsDisLoading(true);
		// Perform disapproval process with disapproveReason
		try {
			const disapproveProducts = await changeSellersStatus(
				`$${token}`,
				`${agentsToken}`,
				disapproveVerify,
				disapproveReason,
				`${usertoken}`
			);

			// Close the form and fetch updated products
			setShowDisapproveForm(false);
			setIsDisLoading(false);
			toast.success('Seller has been Declined!');
			fetchAgents();
		} catch {
			setIsDisLoading(false);
			toast.success('Error Disapproving Seller');
		}
	};

	console.log(agentsByToken);
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
									src={agentsByToken?.data?.profile_image}
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
									<p className=' text-dark'>{agentsByToken?.data?.fname}</p>
									<p className='text-dark'>{agentsByToken?.data?.mail}</p>
									<p className='text-dark'>
										{agentsByToken?.data?.phone_number}
									</p>
									<p className='text-dark'>{agentsByToken?.data?.address}</p>
								</div>
							</div>
						</div>

						<div className='w-full flex gap-2 mt-6'>
							<div className='flex flex-col'>
								<span className='font-semibold'>Experience: </span>
								<span className='font-semibold'>Education Background: </span>
								<span className='font-semibold'>CAC Number: </span>
								<span className='font-semibold'>Verification Type: </span>
								<span className='font-semibold'>Verification Number: </span>
								<span className='font-semibold'>Status: </span>
								<span className='font-semibold'>Tax ID: </span>
								<span className='font-semibold'>Request Date: </span>
							</div>
							<div className='flex flex-col'>
								<p className=' text-dark'>
									{agentsByToken?.data?.agent_profile_credentials?.experiences}
								</p>
								<p className=' text-dark'>
									{agentsByToken?.data?.agent_profile_credentials?.education_bg}
								</p>
								<p className=' text-dark'>
									{agentsByToken?.data?.agent_profile_credentials?.cac_number}
								</p>
								<p className=' text-dark'>
									{
										agentsByToken?.data?.agent_profile_credentials
											?.verification_type
									}
								</p>
								<p className=' text-dark'>
									{
										agentsByToken?.data?.agent_profile_credentials
											?.verification_number
									}
								</p>
								<p className=' text-dark'>
									{agentsByToken?.is_verified_agent_status}
								</p>
								<p className=' text-dark'>
									{
										agentsByToken?.data?.agent_profile_credentials
											?.tax_id_number
									}
								</p>
								<p className=' text-dark'>{agentsByToken?.requested_date}</p>
							</div>
						</div>
						<div>
							<p className='font-semibold'>Utility Bill</p>
							<div className=' w-[25rem] h-[20rem] '>
								<img
									className='w-full'
									src={`
										https:\/\/enicom.iccflifeskills.com.ng\/uploads\/${agentsByToken?.data?.agent_profile_credentials?.utility_bill}
									`}
									alt={
										agentsByToken?.data?.agent_profile_credentials
											?.verification_number
									}
								/>
							</div>
						</div>
						<div className='flex items-center'>
							<Button size='sm' onClick={() => handleOpen('')}>
								Close
							</Button>
							<div className='w-full flex items-center gap-4 justify-end'>
								<Button color='green' onClick={approve}>
									{isLoading ? <Spinner className='h-4 w-4' /> : 'Approve'}
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
												{isDisLoading ? (
													<Spinner className='h-4 w-4' />
												) : (
													'Submit'
												)}
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

export default AgentsModal;
