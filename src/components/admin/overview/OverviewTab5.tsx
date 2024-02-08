'use client';
import { getAllAgents } from '@/api/kyc/kyc';
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
import { AgentsModal } from '@/components';

interface Agent {
	// Define the structure of your product data
	fname: string;
	mail: string;
	requested_date: string;
	bussiness_type: string;
	is_verified_agent_status: string;
	is_verified_agent: string;
	profile_image: string;
	agent_token: string;
	// Add other properties as needed
}
const OverviewTab5 = () => {
	const [agents, setAgents] = useState<Agent[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
	const [agentsToken, setAgentsToken] = useState<string>('');
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const [open, setOpen] = React.useState(false);
	const handleOpen = (agentsToken: string) => {
		setOpen((cur) => !cur);
		setAgentsToken(agentsToken);
	};

	const fetchAgents = async () => {
		try {
			const fetchedAgents = await getAllAgents(`$${token}`, selectedFilter);
			console.log('Fetched Agents:', fetchedAgents);
			setAgents(fetchedAgents.agents);
		} catch (error) {
			// toast.error('Error fetching products');
			console.error('Error fetching Agents:', error);
		}
	};

	useEffect(() => {
		fetchAgents();
	}, [selectedFilter]); // Call fetchSellers whenever selectedFilter changes

	console.log(agents);
	return (
		<div>
			<div className='w-full overflow-scroll'>
				<div className='px-4 mt-10'>
					<Menu>
						<MenuHandler>
							<Button>
								{selectedFilter === null
									? 'All Agents'
									: selectedFilter === '0'
									? 'Unverified Agents'
									: 'Verified Agents'}
							</Button>
						</MenuHandler>
						<MenuList>
							{/* if clicked pass null to is verified */}
							<MenuItem onClick={() => setSelectedFilter(null)}>
								All Agents
							</MenuItem>
							{/* if clicked pass 0 to is verified */}
							<MenuItem onClick={() => setSelectedFilter('0')}>
								Unverified Agents
							</MenuItem>
							{/* if clicked pass 1 to is verified */}
							<MenuItem onClick={() => setSelectedFilter('1')}>
								Verified Agents
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
						{agents?.map((agent, index) => (
							<tr key={index} className=''>
								<td>
									<div className='flex gap-2 items-center'>
										<Avatar
											src={agent.profile_image}
											alt={agent.profile_image}
											size='md'
											className='border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1'
										/>

										<Typography
											variant='small'
											color='blue-gray'
											className='font-bold'>
											{agent.fname}
										</Typography>
									</div>
								</td>
								<td className='text-left'>
									<Typography
										variant='small'
										color='blue-gray'
										className='font-bold'>
										{agent.mail}
									</Typography>
								</td>
								<td className=''>
									<div className='w-max'>
										<Chip
											size='sm'
											variant='ghost'
											value={agent.is_verified_agent_status}
											color={
												agent.is_verified_agent_status === 'Approved'
													? 'green'
													: agent.is_verified_agent_status === 'Pending'
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
											{agent.requested_date}
										</Typography>
									</div>
								</td>
								<td>
									<div>
										<Button
											variant='outlined'
											size='sm'
											onClick={() => handleOpen(agent.agent_token)}>
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
					<AgentsModal
						handleOpen={handleOpen}
						agentsToken={agentsToken}
						fetchAgents={fetchAgents}
					/>
				</Dialog>
			</div>
		</div>
	);
};

export default OverviewTab5;
