'use client';
import { adminLoanRecord } from '@/api/loan/loan';
import {
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
import AdminLoanModal from './AdminLoanModal';

interface Loan {
	amount_plus_intrest: string;
	amount_to_borrow: string;
	fullname: string;
	isCompletedStatus: string;
	loanStatus: string;
	loan_token: string;
	package_plan: string;
	requested_date: string;
}

const OverviewTab1 = () => {
	const [loanData, setLoanData] = useState<Loan[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
	const [loanToken, setLoanToken] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const handleOpen = (loanToken: string) => {
		setOpen((cur) => !cur);
		setLoanToken(loanToken);
	};

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// fetch plans
	const fetchLoanDatas = async () => {
		setIsLoading(true);
		try {
			const fetchedLoanDatas =
				(await adminLoanRecord(`$${token}`, selectedFilter)) || [];
			setLoanData(fetchedLoanDatas.loan_applicant || []);
		} catch (error) {
			console.error('Error fetching loan data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchLoanDatas();
	}, [selectedFilter]);

	console.log(loanData);
	return (
		<div>
			<div className='w-full overflow-scroll'>
				<div className='px-4 mt-10'>
					<Menu>
						<MenuHandler>
							<Button>
								{selectedFilter === null
									? 'All Loans'
									: selectedFilter === '1'
									? 'Approved Loans'
									: 'Disapproved Loans'}
							</Button>
						</MenuHandler>
						<MenuList>
							{/* if clicked pass null to is verified */}
							<MenuItem onClick={() => setSelectedFilter(null)}>
								All Loans
							</MenuItem>
							{/* if clicked pass 0 to is verified */}
							<MenuItem onClick={() => setSelectedFilter('1')}>
								Approved Loans
							</MenuItem>
							{/* if clicked pass 1 to is verified */}
							<MenuItem onClick={() => setSelectedFilter('2')}>
								Disapproved Loans
							</MenuItem>
						</MenuList>
					</Menu>
				</div>
				{isLoading ? (
					<div className='px-4 mt-7'>Loading...</div>
				) : loanData.length === 0 ? (
					<div className='px-4 mt-7'>No record available.</div>
				) : (
					<table className='w-full min-w-max table-auto text-left'>
						<thead className=''>
							<tr>
								<th className='py-7 px-4'>
									<p className='font-normal leading-none opacity-70'>Name</p>
								</th>
								<th>
									<p className='font-normal leading-none opacity-70'>
										Amount Borrowed
									</p>
								</th>
								<th>
									<p className='font-normal leading-none opacity-70'>
										To Payback
									</p>
								</th>
								<th>
									<p className='font-normal leading-none opacity-70'>Status</p>
								</th>
								<th>
									<p className='font-normal leading-none opacity-70'>Date</p>
								</th>
								<th>
									<p className='font-normal leading-none opacity-70'></p>
								</th>
							</tr>
						</thead>
						<tbody>
							{loanData?.map((loan, index) => (
								<tr key={index}>
									<td>
										<div className='mt-2 px-4'>
											<Typography variant='small' color='blue-gray'>
												{loan?.fullname}
											</Typography>
										</div>
									</td>
									<td className='text-left'>
										<div className='mt-2'>
											<Typography variant='small' color='blue-gray'>
												{loan?.amount_to_borrow}
											</Typography>
										</div>
									</td>
									<td className='text-left'>
										<div className='mt-2'>
											<Typography variant='small' color='blue-gray'>
												{loan?.amount_plus_intrest}
											</Typography>
										</div>
									</td>
									<td>
										<div className='w-max mt-2'>
											<Chip
												size='sm'
												variant='ghost'
												value={loan?.loanStatus}
												color={
													loan?.loanStatus === 'approved'
														? 'green'
														: loan?.loanStatus === 'pending'
														? 'amber'
														: 'red'
												}
											/>
										</div>
									</td>
									<td>
										<div className='mt-2'>
											<Typography variant='small' color='blue-gray'>
												{loan?.requested_date}
											</Typography>
										</div>
									</td>

									<td>
										<div className='mt-2 ml-4'>
											<Button
												variant='outlined'
												size='sm'
												color='blue-gray'
												onClick={() => handleOpen(loan?.loan_token)}>
												Details
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
			<Dialog
				size='lg'
				open={open}
				handler={() => handleOpen('')}
				className='bg-transparent shadow-none text-dark'>
				<AdminLoanModal
					handleOpen={handleOpen}
					loanToken={loanToken}
					fetchLoanDatas={fetchLoanDatas}
				/>
			</Dialog>
		</div>
	);
};

export default OverviewTab1;
