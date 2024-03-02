'use client';
import { getAllSellers } from '@/api/kyc/kyc';
import { getAllProductAdmin } from '@/api/products/products';
import {
	Avatar,
	Button,
	Chip,
	Dialog,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Typography,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SellersModal } from '@/components';

interface Seller {
	// Define the structure of your product data
	fname: string;
	requested_date: string;
	bussiness_type: string;
	is_verified_seller_status: string;
	is_verified_seller: string;
	profile_image: string;
	seller_profile_token: string;
	// Add other properties as needed
}

const OverviewTab4 = () => {
	const [sellers, setSellers] = useState<Seller[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
	const [sellersToken, setSellersToken] = useState<string>('');
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const [open, setOpen] = React.useState(false);
	const handleOpen = (sellersToken: string) => {
		setOpen((cur) => !cur);
		setSellersToken(sellersToken);
	};

	const fetchSellers = async () => {
		try {
			const fetchedSellers = await getAllSellers(`$${token}`, selectedFilter);
			console.log('Fetched Sellers:', fetchedSellers);
			setSellers(fetchedSellers.sellers);
		} catch (error) {
			// toast.error('Error fetching products');
			console.error('Error fetching sellers:', error);
		}
	};

	useEffect(() => {
		fetchSellers();
	}, [selectedFilter]); // Call fetchSellers whenever selectedFilter changes

	console.log(sellers);
	return (
		<div>
			<div className='w-full overflow-scroll'>
				<div className='px-4 mt-10'>
					<Menu>
						<MenuHandler>
							<Button>
								{selectedFilter === null
									? 'All Sellers'
									: selectedFilter === '0'
									? 'Unverified Sellers'
									: 'Verified Sellers'}
							</Button>
						</MenuHandler>
						<MenuList>
							{/* if clicked pass null to is verified */}
							<MenuItem onClick={() => setSelectedFilter(null)}>
								All Sellers
							</MenuItem>
							{/* if clicked pass 0 to is verified */}
							<MenuItem onClick={() => setSelectedFilter('0')}>
								Unverified Sellers
							</MenuItem>
							{/* if clicked pass 1 to is verified */}
							<MenuItem onClick={() => setSelectedFilter('1')}>
								Verified Sellers
							</MenuItem>
						</MenuList>
					</Menu>
				</div>
				<table className='w-full min-w-max table-auto text-left'>
					<thead className=''>
						<tr>
							<th className='py-7 px-4'>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70'>
									Name
								</p>
							</th>
							<th className=''>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70'>
									Business Type
								</p>
							</th>
							<th className=''>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70'>
									Status
								</p>
							</th>
							<th className=''>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70 '>
									Date
								</p>
							</th>
							<th className=' p-4'></th>
						</tr>
					</thead>
					<tbody className=''>
						{sellers?.map((seller, index) => (
							<tr key={index} className=''>
								<td>
									<div className='flex gap-2 items-center'>
										<Avatar
											src={seller?.profile_image}
											alt={seller?.profile_image}
											size='md'
											className='border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1'
										/>

										<Typography
											variant='small'
											color='blue-gray'
											className='font-bold'>
											{seller?.fname}
										</Typography>
									</div>
								</td>
								<td className='text-left'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-bold'>
										{seller?.bussiness_type}
									</Typography>
								</td>
								<td className=''>
									<div className='w-max'>
										<Chip
											size='sm'
											variant='ghost'
											value={seller?.is_verified_seller_status}
											color={
												seller?.is_verified_seller_status === 'Approved'
													? 'green'
													: seller?.is_verified_seller_status === 'Pending'
													? 'amber'
													: 'red'
											}
										/>
									</div>
								</td>

								<td>
									<div>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-bold'>
											{seller?.requested_date}
										</Typography>
									</div>
								</td>
								<td>
									<div>
										<Button
											variant='outlined'
											size='sm'
											onClick={() => handleOpen(seller?.seller_profile_token)}>
											Details
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Dialog
					size='lg'
					open={open}
					handler={() => handleOpen('')}
					className='bg-transparent shadow-none text-dark'>
					<SellersModal
						handleOpen={handleOpen}
						sellersToken={sellersToken}
						fetchSellers={fetchSellers}
					/>
				</Dialog>
			</div>
		</div>
	);
};

export default OverviewTab4;
