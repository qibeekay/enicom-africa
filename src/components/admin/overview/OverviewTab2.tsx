'use client';
import { deleteLoanPackage, getLoanPackages } from '@/api/loan/loan';
import { Avatar, Button, Chip, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface Package {
	amount: string;
	interest_amount: string;
	loan_percentage: string;
	package_desc: string;
	package_token: string;
	plan_digit: string;
	plan_duration: string;
	plan_token: string;
	provider_image: string;
	provider_name: string;
	provider_token: string;
}

const OverviewTab2 = () => {
	const [packages, setPackages] = useState<Package[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pLoading, setpLoading] = useState<boolean>(false);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// fetch plans
	const fetchPackages = async () => {
		setpLoading(true);
		try {
			const fetchedPackages = (await getLoanPackages(`$${token}`)) || [];
			setPackages(fetchedPackages);
		} catch {
			toast.error('Error fetching packages');
		} finally {
			setpLoading(false);
		}
	};

	useEffect(() => {
		fetchPackages();
	}, []);

	// delete package
	const deletePackages = async (packageToken: string) => {
		setIsLoading(true);
		try {
			await deleteLoanPackage(packageToken, `$${token}`);
			// If deletion is successful, refetch the packages
			toast.success('Loan Package Deleted');
			await fetchPackages();
		} catch (error) {
			toast.error('Error deleting package');
			console.error('Error deleting package:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<table className='w-full min-w-max table-auto text-left'>
				<thead className=''>
					<tr>
						<th className='py-7 px-4'>
							<p
								// color='blue-gray'
								className='font-normal leading-none opacity-70'>
								Provider Name
							</p>
						</th>

						<th className=''>
							<p
								// color='blue-gray'
								className='font-normal leading-none opacity-70'>
								Plan Duration
							</p>
						</th>
						<th className=''>
							<p
								// color='blue-gray'
								className='font-normal leading-none opacity-70 '>
								Percentage
							</p>
						</th>
						<th className=' p-4'></th>
					</tr>
				</thead>
				{pLoading ? (
					<div className='px-4 mt-7'>Loading...</div>
				) : packages.length === 0 ? (
					<div className='px-4 mt-7'>No record available.</div>
				) : (
					<tbody className=''>
						{packages.map((pkage, index) => (
							<tr key={index} className=''>
								<td>
									<div className='flex gap-2 items-center'>
										<Avatar
											src={pkage?.provider_image}
											alt={pkage?.provider_name}
											size='md'
											className='border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1 mt-4'
										/>

										<Typography
											variant='small'
											color='blue-gray'
											className='font-bold'>
											{pkage?.provider_name}
										</Typography>
									</div>
								</td>
								<td className='text-left'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-bold'>
										{pkage?.plan_duration}
									</Typography>
								</td>

								<td>
									<div>
										<Typography
											variant='small'
											color='blue-gray'
											className='font-bold'>
											{pkage?.loan_percentage}%
										</Typography>
									</div>
								</td>
								<td>
									<div>
										<Button
											variant='outlined'
											size='sm'
											color='red'
											onClick={() => deletePackages(pkage.package_token)}>
											{isLoading ? 'Deleting...' : 'Delete'}
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				)}
				<ToastContainer />
			</table>
		</div>
	);
};

export default OverviewTab2;
