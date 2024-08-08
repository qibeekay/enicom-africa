'use client';
import {
	getAllProviders,
	getLoanPackages,
	verifyLoanKyc,
} from '@/api/loan/loan';
import { DasboardNav, LoanForm1, MenuDrawer } from '@/components';
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
	const [selectedProviderName, setSelectedProviderName] = useState<
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

	// stores the pkage using use context so it can be used in a different page
	const handleGetLoan = (pkage: Package) => {
		selectPackage(pkage); // Set the selected package
		router.push('/loan-form');
	};

	useEffect(() => {
		// Retrieve the data from local storage
		const userData = localStorage.getItem('userResponse');
		console.log('data', userData);

		if (userData) {
			// Parse the data to convert it into a JavaScript object
			const userObject = JSON.parse(userData);

			// Access and set renitoken
			setRenitoken(userObject.renitoken);
		}
	}, []);

	console.log(selectedProviderName);


	return (
		<React.Fragment>
			<DasboardNav openRight={() => setOpenRight(true)} />

			<div className='max-w-6xl px-4 mx-auto pt-10 pb-20'>
				<p className='text-lg font-medium pt-2'>
					Select from our Financing Partners{' '}
				</p>
				<p>
					Choose your preferred finance partner and calculate your loan options
					all in one place.
				</p>
				<p className='text-sm'>
					Terms and Conditions apply (Financing is subject to approval based on
					the terms and conditions set by the chosen financial institution)
				</p>

				<div className='flex items-center justify-between w-full'>
					<div className=' mt-5 max-w-[20rem]'>
						<Select label='Select Loan Provider'>
							{providers.map((provider) => (
								<Option
									key={provider?.provider_token}
									onClick={() => {
										setSelectedProviderToken(provider?.provider_token);
										setSelectedProviderName(provider?.provider_name);
									}}>
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
								<LoanForm1
									filteredPackages={filteredPackages}
									
								/>
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
		</React.Fragment>
	);
};

export default LoanFacilityPage;
