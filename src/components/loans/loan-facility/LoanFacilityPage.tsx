'use client';
import {
	getAllProviders,
	getLoanPackages,
	verifyLoanKyc,
} from '@/api/loan/loan';
import { DasboardNav, MenuDrawer } from '@/components';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogFooter,
	DialogHeader,
	Option,
	Select,
} from '@material-tailwind/react';
import { getUser } from '@/api/products/products';
import Link from 'next/link';
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

	const [renitoken, setRenitoken] = useState('');
	const [bvn, setBvn] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [openRight, setOpenRight] = React.useState(false);

	// Access the selectPackage function from the loan package context
	const { selectPackage, selectedPackage, setVerifiedLoanData } =
		useLoanPackage();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const router = useRouter();

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

	const [open1, setOpen1] = React.useState(false);
	const handleOpen1 = () => setOpen1((cur) => !cur);

	// stores the pkage using use context so it can be used in a different page
	const handleGetLoan = (pkage: Package) => {
		selectPackage(pkage); // Set the selected package
		handleOpen1(); // Open the dialog
	};

	// console.log(selectedPackage);

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// api to get users data
	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
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
				<p className='text-lg font-medium pt-2'>Loan Provider and Calculator</p>
				<p>
					Choose your preferred finance partner and calculate your loan options
					all in one place.
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

			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />

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
