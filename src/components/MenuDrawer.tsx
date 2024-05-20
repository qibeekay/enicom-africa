'use client';
import { getUser } from '@/api/products/products';
import {
	Button,
	Dialog,
	DialogFooter,
	DialogHeader,
	Drawer,
	IconButton,
} from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import { PiShoppingBagOpenLight } from 'react-icons/pi';
import { toast } from 'react-toastify';

interface Props {
	openRight: boolean;
	setOpenRight: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuDrawer = ({ openRight, setOpenRight }: Props) => {
	const [status, setStatus] = useState('');
	const [role, setRole] = useState<string[]>([]);

	const [agentStatus, setAgentStatus] = useState('');

	const closeDrawerRight = () => setOpenRight(false);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const router = useRouter();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	const handleCancel = () => {
		setOpen(false); // Close the dialog
	};

	const handleBusiness = () => {
		localStorage.setItem('bussiness_type', 'Bussiness');
		router.push('/sellers');
	};
	const handleIndividual = () => {
		// Save the word "individual" to local storage
		localStorage.setItem('bussiness_type', 'Individual');
		router.push('/sellers');
	};

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			setStatus(getusers.is_verified_seller);
			setAgentStatus(getusers.is_verified_agent);
			setRole(getusers.roles);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
		}
	};

	useEffect(() => {
		getuser();
	}, []);

	const handleLogin = () => {
		router.push('/login');
	};

	const handleLogout = () => {
		// Clear user-related information from local storage
		localStorage.removeItem('fname');
		localStorage.removeItem('lname');
		localStorage.removeItem('mail');
		localStorage.removeItem('usertoken');
		localStorage.removeItem('renitoken');

		router.push('/login'); // Change '/login' to the actual path of your login page
		// Redirect to the login page
		toast.success('Logout Successful');
	};

	return (
		<div>
			<Drawer
				placement='right'
				open={openRight}
				onClose={closeDrawerRight}
				className='p-4 bg-bgGreen'>
				<div className='mb-6 flex items-center justify-end'>
					<IconButton
						variant='text'
						color='blue-gray'
						onClick={closeDrawerRight}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='h-5 w-5'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</IconButton>
				</div>
				{usertoken ? (
					<div>
						{/* dashboard */}
						<Link
							href={'/dashboard'}
							className=' flex items-center justify-end gap-4 hover:bg-greens/20 py-3 px-5 rounded-lg hover:text-greens'>
							<CgMenuGridR size='30' />

							<p className=''>Dashboard</p>
						</Link>

						{/* store */}
						<Link
							href={'/store'}
							className=' flex items-center justify-end gap-4 hover:bg-greens/20 py-3 px-5 rounded-lg hover:text-greens my-5'>
							<PiShoppingBagOpenLight size='27' />

							<p className=''>Store</p>
						</Link>

						{/* loan */}
						<Link
							href={'/loan-facility'}
							className=' flex items-center justify-end gap-4 hover:bg-greens/20 py-3 px-5 rounded-lg hover:text-greens'>
							<HiOutlineCreditCard size='27' />
							<p className=''>Loan Facility</p>
						</Link>

						<div>
							{/* become a seller */}
							{status ? (
								<div className='w-full mt-5'>
									<Link className='' href={'/sales'}>
										<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
											Sellers Dashboard
										</p>
									</Link>
								</div>
							) : (
								<div className='w-full mt-5'>
									<button
										className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'
										onClick={handleOpen}>
										Become a Seller
									</button>
								</div>
							)}

							{/* become an Agent */}
							{agentStatus ? (
								<div className='w-full mt-5'>
									<Link className='' href={'agent-dashboard'}>
										<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
											Agents Dashboard
										</p>
									</Link>
								</div>
							) : (
								<div className='w-full mt-5'>
									<Link className='' href={'/agent'}>
										<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
											Become an Agent
										</p>
									</Link>
								</div>
							)}

							{/* loan calculator */}
							<div className='w-full mt-5'>
								<Link className='' href={'/loan-calculator'}>
									<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
										Loan Calculator
									</p>
								</Link>
							</div>
							{/* logout */}
							<div className='w-full mt-7'>
								<button
									className='grid justify-end w-full'
									onClick={handleLogout}>
									<p className='border-greens border w-full rounded-lg text-dark py-2 px-5 text-center text-sm'>
										Logout
									</p>
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className='w-full mt-5'>
						<button
							className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'
							onClick={handleLogin}>
							Get Started
						</button>
					</div>
				)}
			</Drawer>
			<Dialog
				size='xs'
				open={open}
				handler={handleOpen}
				className='bg-white shadow-none text-dark p-6'>
				<DialogHeader>You want to become a seller?</DialogHeader>
				<div className='grid mt-4'>
					<button
						className='border border-greens bg-greens text-white py-2'
						onClick={handleIndividual}>
						Register as an Individual
					</button>
					<button
						className='border border-greens bg-greens text-white py-2 mt-4'
						onClick={handleBusiness}>
						Register as a Business
					</button>
				</div>
				<DialogFooter>
					<Button
						variant='text'
						color='red'
						onClick={handleCancel}
						className='mr-1'>
						<span>Cancel</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</div>
	);
};

export default MenuDrawer;
