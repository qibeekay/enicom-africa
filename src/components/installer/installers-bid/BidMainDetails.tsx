'use client';
import { getAllSellersRequest } from '@/api/installer/installer';
import { Button, Chip, Dialog, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { BidModal } from '@/components';

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

const BidMainDetails = () => {
	const [requests, setRequests] = useState<Request[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
	const [bidsToken, setBidsToken] = useState<string>('');

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const [open, setOpen] = React.useState(false);
	const handleOpen = (bidsToken: string) => {
		setOpen((cur) => !cur);
		setBidsToken(bidsToken);
	};

	const fetchRequests = async () => {
		try {
			const fetchedRequests = await getAllSellersRequest(
				`$${token}`,
				selectedFilter
			);
			console.log('Fetched Sellers:', fetchedRequests);
			setRequests(fetchedRequests.buyer_agents_requests);
		} catch (error) {
			// toast.error('Error fetching products');
			console.error('Error fetching sellers:', error);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, [selectedFilter]);

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
						All Requests
					</Button>
					<Button
						onClick={() => setSelectedFilter('0')}
						className={`cursor-pointer ${
							selectedFilter === '0'
								? 'text-white bg-greens '
								: 'text-dark bg-white'
						}`}>
						Pending
					</Button>
					<Button
						onClick={() => setSelectedFilter('1')}
						className={`cursor-pointer ${
							selectedFilter === '1'
								? 'text-white bg-greens '
								: 'text-dark bg-white'
						}`}>
						Assigned
					</Button>
				</div>
				<div className='w-full'>
					<table className='w-full min-w-max table-auto text-left'>
						<thead className=''>
							<tr>
								<th className='py-7 px-4'>
									<p className='font-normal leading-none opacity-70'>Name</p>
								</th>
								<th className=''>
									<p className='font-normal leading-none opacity-70'>State</p>
								</th>
								<th className=''>
									<p className='font-normal leading-none opacity-70'>
										Assign Status
									</p>
								</th>
								<th className=''>
									<p className='font-normal leading-none opacity-70 '>
										Request Date
									</p>
								</th>
								<th className=' p-4'></th>
							</tr>
						</thead>

						<tbody className=''>
							{requests?.map((request, index) => (
								<tr key={index} className='mt-2'>
									<td>
										<div className=' items-center'>
											<Typography
												variant='small'
												color='blue-gray'
												className='font-bold'>
												{request.buyer_name}
											</Typography>
										</div>
									</td>
									<td className='text-left'>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-bold'>
											{request.state}
										</Typography>
									</td>
									<td className=''>
										<div className='w-max'>
											<Chip
												size='sm'
												variant='ghost'
												value={request.is_assigned ? 'Assigned' : 'Ongoing'}
												color={request.is_assigned === true ? 'green' : 'red'}
											/>
										</div>
									</td>

									<td>
										<div>
											<Typography
												variant='small'
												color='blue-gray'
												className='font-bold'>
												{request.requested_date}
											</Typography>
										</div>
									</td>
									<td>
										<div>
											<Button
												variant='outlined'
												size='sm'
												onClick={() =>
													handleOpen(request.request_bidding_token)
												}>
												Details
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Dialog
					size='lg'
					open={open}
					handler={() => handleOpen('')}
					className='bg-transparent shadow-none text-dark'>
					<BidModal
						handleOpen={handleOpen}
						bidsToken={bidsToken}
						fetchRequests={fetchRequests}
					/>
				</Dialog>
			</div>
		</div>
	);
};

export default BidMainDetails;
