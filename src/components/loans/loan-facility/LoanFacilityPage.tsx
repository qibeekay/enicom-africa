'use client';
import {
	getAllProviders,
	getLoanPackages,
	verifyLoanKyc,
} from '@/api/loan/loan';
import { DasboardNav } from '@/components';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogFooter,
	DialogHeader,
	Drawer,
	IconButton,
	Option,
	Select,
} from '@material-tailwind/react';
import { getUser } from '@/api/products/products';
import Link from 'next/link';
import { CgMenuGridR } from 'react-icons/cg';
import { PiShoppingBagOpenLight } from 'react-icons/pi';
import { HiOutlineCreditCard } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useLoanPackage } from './LoanPackageContext';

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

interface Provider {
	// cat_id: string;
	provider_name: string;
	provider_image: string;
	provider_token: string;
	// Add other properties if needed
}

const LoanFacilityPage = () => {
	const [providers, setProviders] = useState<Provider[]>([]);
	const [packages, setPackages] = useState<Package[]>([]);
	const [selectedProviderToken, setSelectedProviderToken] = useState<
		string | null
	>(null);

	const [status, setStatus] = useState('');
	const [agentStatus, setAgentStatus] = useState('');
	const [renitoken, setRenitoken] = useState('');
	const [bvn, setBvn] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [openRight, setOpenRight] = React.useState(false);

	// Access the selectPackage function from the loan package context
	const { selectPackage, selectedPackage, setVerifiedLoanData } =
		useLoanPackage();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const router = useRouter();

	// handles storing and navigating to their specific page
	const handleBusiness = () => {
		localStorage.setItem('bussiness_type', 'Bussiness');
		router.push('/sellers');
	};

	const handleIndividual = () => {
		// Save the word "individual" to local storage
		localStorage.setItem('bussiness_type', 'Individual');
		router.push('/sellers');
	};

	// fetch plans
	const fetchPackages = async () => {
		const fetchedPackages = (await getLoanPackages(`$${token}`)) || [];
		setPackages(fetchedPackages);
	};

	useEffect(() => {
		fetchPackages();
	}, []);

	// fetch provider
	const fetchProviders = async () => {
		const fetchedProviders = (await getAllProviders(`$${token}`)) || [];
		setProviders(fetchedProviders);
	};

	useEffect(() => {
		fetchProviders();
	}, []);

	// Filter packages by selected provider token
	const filteredPackages = selectedProviderToken
		? packages?.filter((pkg) => pkg?.provider_token === selectedProviderToken)
		: [];

	const closeDrawerRight = () => setOpenRight(false);

	const handleLogout = () => {
		// Clear user-related information from local storage
		localStorage.removeItem('fname');
		localStorage.removeItem('lname');
		localStorage.removeItem('mail');
		localStorage.removeItem('usertoken');
		localStorage.removeItem('renitoken');

		// Redirect to the login page
		toast.success('Logout Successful');
		router.push('/login'); // Change '/login' to the actual path of your login page
	};

	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	const handleOpen1 = () => setOpen1((cur) => !cur);
	const handleCancel = () => {
		setOpen(false); // Close the dialog
	};

	// stores the pkage using use context so it can be used in a different page
	const handleGetLoan = (pkage: Package) => {
		selectPackage(pkage); // Set the selected package
		handleOpen1(); // Open the dialog
	};

	console.log(selectedPackage);

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// api to get users data
	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			setStatus(getusers.is_verified_seller);
			setAgentStatus(getusers.is_verified_agent);
			setRenitoken(getusers.renitoken);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
		}
	};

	// fetch user when it mounts
	useEffect(() => {
		getuser();
	}, []);

	const verifyingLoan = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			const verifiedLoan = await verifyLoanKyc(renitoken, bvn, `$${token}`);
			toast.success('Bvn submitted succesfully');
			setVerifiedLoanData(verifiedLoan.data);

			router.push('/loan-form');
			// setIsLoading(false);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			toast.error('error submitting bvn');
			console.log('error');
			// setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<React.Fragment>
			<DasboardNav openRight={() => setOpenRight(true)} />

			<div className='max-w-6xl px-4 mx-auto pt-10 pb-20'>
				<p className='text-lg font-medium pt-2'>View Loan Package</p>
				<p>
					Check the category your purchase loan falls, and view the duration and
					payback dates
				</p>

				<div className='flex items-center justify-between w-full'>
					<div className=' mt-5 max-w-[20rem]'>
						<Select label='Select Loan Provider'>
							{providers.map((provider) => (
								<Option
									key={provider?.provider_token}
									onClick={() =>
										setSelectedProviderToken(provider?.provider_token)
									}>
									{provider?.provider_name}
								</Option>
							))}
						</Select>
					</div>

					<div className='w-[20rem] '>
						<Link
							href={'/loan-calculator'}
							className=' text-white py-2 grid items-center bg-greens justify-center rounded-lg'>
							Loan Calculator
						</Link>
					</div>
				</div>

				{selectedProviderToken ? (
					<div>
						{filteredPackages?.length === 0 ? (
							<p className='text-center mt-4'>
								No packages available for the selected provider
							</p>
						) : (
							<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
								{/* small */}
								{filteredPackages?.map((pkage, index) => (
									<div
										key={index}
										className='border-2 border-[#CEFFCC] hover:border-greens rounded-2xl py-5'>
										<div className='px-5 pb-5'>
											<p className=' text-2xl font-semibold text-greens'>
												{pkage?.plan_duration}
												<span className='text-base text-dark font-normal'>
													({pkage?.plan_digit} Months)
												</span>
											</p>

											<div className=' flex items-center gap-2'>
												<div className=' w-[3rem] h-[3rem] rounded-full overflow-hidden'>
													<img
														className='w-full h-full'
														src={pkage?.provider_image}
														alt=''
													/>
												</div>
												<p className='py-5'>{pkage?.provider_name}</p>
											</div>

											<p>{pkage?.loan_percentage}% Interest</p>

											<button
												className='w-full py-4 border-[#CEFFCC] border-2 hover:bg-greens text-lg font-bold text-dark/50 hover:text-white rounded-lg mt-7 mb-2'
												onClick={() => handleGetLoan(pkage)}>
												Get Loan
											</button>
										</div>

										<div className='flex items-center gap-4'>
											<hr className='w-full bg-black h-0.5' />
											<p>Package</p>
											<hr className='w-full bg-black h-0.5' />
										</div>

										<ul className='list-disc px-10 mt-5 grid gap-2'>
											<li>{pkage.package_desc}</li>
										</ul>
									</div>
								))}
							</div>
						)}
					</div>
				) : (
					<p className='text-center mt-10'>
						Please select a provider to see loan packages
					</p>
				)}
			</div>

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

					{/* loan calculator */}
					<Link
						href={'/loan-calculator'}
						className=' flex items-center justify-end gap-4 hover:bg-greens/20 py-3 px-5 rounded-lg hover:text-greens'>
						<HiOutlineCreditCard size='27' />
						<p className=''>Loan Calculator</p>
					</Link>

					<div>
						{/* become a seller */}
						{status ? (
							<div className='w-full mt-10'>
								<Link className='' href={'/sales'}>
									<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
										Sellers Dashboard
									</p>
								</Link>
							</div>
						) : (
							<div className='w-full mt-10'>
								<button
									className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'
									onClick={handleOpen}>
									Become a Seller
								</button>
							</div>
						)}

						{/* become an Agent */}
						{agentStatus ? (
							<div className='w-full mt-10'>
								<Link className='' href={'agent-dashboard'}>
									<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
										Agents Dashboard
									</p>
								</Link>
							</div>
						) : (
							<div className='w-full mt-10'>
								<Link className='' href={'/agent'}>
									<p className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'>
										Become an Agent
									</p>
								</Link>
							</div>
						)}
					</div>

					{/* logout */}
					<div className='w-full mt-7'>
						<button className='grid justify-end w-full' onClick={handleLogout}>
							<p className='border-greens border w-full rounded-lg text-dark py-2 px-5 text-center text-sm'>
								Logout
							</p>
						</button>
					</div>
				</div>
			</Drawer>

			{/* become a seller modal */}
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

			{/* verify bvn modal */}
			<Dialog
				size='xs'
				open={open1}
				handler={handleOpen1}
				className='bg-white shadow-none text-dark p-6'>
				<DialogHeader>Verify Bvn</DialogHeader>
				<form action=''>
					<div className='grid mt-4'>
						{/* bvn */}
						<div>
							<label htmlFor='bvn'>
								<input
									type='text'
									className='w-full mt-1 outline-none border py-2 border-dark rounded-lg px-4'
									placeholder='Please enter you bvn'
									value={bvn}
									onChange={(e) => setBvn(e.target.value)}
								/>
							</label>
						</div>
						{/* submit */}
					</div>
				</form>
				<DialogFooter>
					<Button
						variant='text'
						color='red'
						onClick={handleOpen1}
						className='mr-1'>
						<span>Cancel</span>
					</Button>

					<Button
						variant='outlined'
						color='green'
						onClick={verifyingLoan}
						className='w-fit'>
						{isLoading ? 'Submitting' : 'Submit'}
					</Button>
				</DialogFooter>
			</Dialog>
		</React.Fragment>
	);
};

export default LoanFacilityPage;
