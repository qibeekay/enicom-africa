'use client';
import { getBids, hireInstaller, userGetBid } from '@/api/installer/installer';
import {
	Button,
	Chip,
	Dialog,
	Spinner,
	Typography,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

interface Request {
	buyer_token: string;
	state: string;
	buyer_name: string;
	is_assigned: boolean;
	on_going: boolean;
	description: string;
	preferred_installation_date: string;
	request_bidding_token: string;
	requested_date: string;
}

interface Bids {
	agent_token: string;
	agent_name: string;
	price_charged: string;
	description: string;
	date_choosen_to_install: string;
	bidding_date: string;
}

const GetAllBidsDetails = () => {
	const [requests, setRequests] = useState<Request[]>([]);
	const [bids, setBids] = useState<Bids[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
	const [showBidForm, setShowBidForm] = useState<boolean>(false);
	const [currentBuyerToken, setCurrentBuyerToken] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hiredInstallers, setHiredInstallers] = useState<string[]>([]);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// Show bid form for a specific request
	const initiate = (requestToken: string) => {
		setShowBidForm(true);
		setCurrentBuyerToken(requestToken); // Set the current buyer token
		console.log(currentBuyerToken);
	};

	// hide bid form
	const cancelBid = () => {
		setShowBidForm(false);
		setCurrentBuyerToken('');
	};

	// fetch request
	const fetchRequests = async () => {
		try {
			const fetchedRequests = await userGetBid(
				`$${token}`,
				selectedFilter,
				usertoken
			);
			console.log('Fetched Sellers:', fetchedRequests);
			setRequests(fetchedRequests.requests);
		} catch (error) {
			// toast.error('Error fetching products');
			console.error('Error fetching sellers:', error);
		}
	};

	// fetch requests when componet mounts
	useEffect(() => {
		fetchRequests();
	}, [selectedFilter]);

	// fetch bids
	const fetchBids = async (requestToken: string) => {
		try {
			setLoading(true);
			const fetchedBids = await getBids(`$${token}`, requestToken);
			console.log('Fetched Sellers:', fetchedBids);
			setBids(fetchedBids.biddings || []);
			setLoading(false);
		} catch (error) {
			// toast.error('Error fetching products');
			console.error('Error fetching sellers:', error);
			setLoading(false);
		}
	};

	// fetch bids when componet mounts
	useEffect(() => {
		if (currentBuyerToken) {
			fetchBids(currentBuyerToken); // Fetch bids when the currentBuyerToken changes
		}
	}, [currentBuyerToken]);

	useEffect(() => {
		// Load hired installers from localStorage on component mount
		const storedHiredInstallers = JSON.parse(
			localStorage.getItem('hiredInstallers') || '[]'
		);
		setHiredInstallers(storedHiredInstallers);
	}, []);

	// hire agents
	const hireAgent = async (requestToken: string, agentToken: string) => {
		try {
			setIsLoading(true);
			const hiredAgent = await hireInstaller(
				`$${token}`,
				requestToken,
				usertoken,
				agentToken
			);

			console.log(hiredAgent);

			// If hiring is successful, update the hiredInstallers state and localStorage
			const updatedHiredInstallers = [...hiredInstallers, agentToken];
			setHiredInstallers(updatedHiredInstallers);
			localStorage.setItem(
				'hiredInstallers',
				JSON.stringify(updatedHiredInstallers)
			);

			setIsLoading(false);
		} catch (error) {
			// toast.error('Error fetching products');
			console.error('Error hiring Installer:', error);
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full h-screen overflow-scroll text-dark no-scrollbar font-poppins'>
			<div className='w-full'>
				<div className=' w-full flex gap-x-7 gap-y-4 items-center flex-wrap font-medium text-dark/60'>
					<Button
						onClick={() => setSelectedFilter(null)}
						className={`cursor-pointer ${
							selectedFilter === null
								? 'text-white bg-greens '
								: 'text-dark bg-white'
						}`}>
						All Request
					</Button>
					<Button
						onClick={() => setSelectedFilter('1')}
						className={`cursor-pointer ${
							selectedFilter === '1'
								? 'text-white bg-greens '
								: 'text-dark bg-white'
						}`}>
						Ongoing
					</Button>
				</div>

				<div className='w-full'>
					{/* view bids */}
					{requests?.map((request, index) => (
						<div key={index} className='w-full bg-white p-4 rounded-lg mt-5'>
							<div className=' flex gap-5 flex-col md:flex-row md:items-center'>
								{/* description */}
								<div className=' w-full'>
									<h1 className='font-bold'>Bid Description</h1>
									<p className='text-sm mt-4'>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Blanditiis labore sed fuga neque suscipit nesciunt velit
										voluptatum tenetur magnam deserunt?
									</p>

									<div className='w-fit mt-4'>
										<Chip
											size='sm'
											variant='ghost'
											value={request?.on_going ? 'Ongoing' : 'Assigned'}
											color={request?.on_going === true ? 'red' : 'green'}
										/>
									</div>
								</div>

								{/* view bids */}
								<div className='w-full grid justify-end'>
									<div className='grid items-center md:justify-end w-[10rem]'>
										{currentBuyerToken === request.request_bidding_token &&
										showBidForm ? (
											<Button
												variant='outlined'
												color='red'
												onClick={cancelBid}>
												Close
											</Button>
										) : (
											<Button
												variant='outlined'
												color='blue'
												onClick={() => initiate(request.request_bidding_token)}>
												Open Bids
											</Button>
										)}
									</div>
								</div>
							</div>

							{showBidForm &&
								currentBuyerToken === request.request_bidding_token && (
									<div className='mt-4'>
										{loading ? (
											<Spinner className='h-4 w-4' />
										) : bids?.length === 0 ? (
											<p>No Bid placed yet</p>
										) : (
											bids?.map((bid, index) => (
												<div
													key={index}
													className='mt-7 border rounded-lg border-dark p-4'>
													<div className=' flex gap-5 flex-col md:flex-row md:items-center justify-between'>
														{/* description */}
														<div className=' w-full'>
															<h1 className='font-bold'>{bid?.agent_name}</h1>
															<p className='text-sm'>{bid?.description}</p>

															<p>{bid?.price_charged}</p>
															<p>{bid?.date_choosen_to_install}</p>
														</div>

														{/* view bids */}
														<div className='w-full grid justify-end'>
															<div className='grid items-center md:justify-end w-[10rem]'>
																{hiredInstallers.includes(bid.agent_token) ? (
																	<div className=' border-blue-500 border rounded-md py-2 px-6 grid items-center justify-center'>
																		<p className='text-blue-500'>Hired</p>
																	</div>
																) : (
																	<Button
																		variant='outlined'
																		color='green'
																		onClick={() =>
																			hireAgent(
																				request.request_bidding_token,
																				bid.agent_token
																			)
																		}>
																		{isLoading ? (
																			<Spinner className='h-4 w-4' />
																		) : (
																			'Hire Installer'
																		)}
																	</Button>
																)}
															</div>
														</div>
													</div>
												</div>
											))
										)}
									</div>
								)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GetAllBidsDetails;
