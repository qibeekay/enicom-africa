'use client';
import {
	calculateLoan,
	getAllProviders,
	getLoanPackages,
} from '@/api/loan/loan';
import { Button, Option, Select } from '@material-tailwind/react';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useLoanPackage } from '../loan-facility/LoanPackageContext';
import { toast } from 'react-toastify';

import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

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

interface Result {
	Duration: string;
	loan_interest: number;
	totalLoanAmount: string;
	calculateMonthsAhead: [
		{
			monthExpectedToPay: string;
			paymentDate: string;
		}
	];
	monthlyRepayment: string;
}

const LoanCalculatorMain = () => {
	const [providers, setProviders] = useState<Provider[]>([]);
	const [result, setResult] = useState<Result | null>(null);
	const [packages, setPackages] = useState<Package[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPlan, setShowPlan] = useState(false);
	const formResultsRef = useRef<HTMLDivElement>(null); // Ref for the form/results section
	const [selectedProviderToken, setSelectedProviderToken] = useState<
		string | null
	>(null);

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Function to scroll to the form/results section
	const scrollToFormResults = () => {
		if (formResultsRef.current) {
			formResultsRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the section with smooth behavior
		}
	};

	const handleChange = (event: { target: { value: string } }) => {
		setValue(parseInt(event.target.value)); // Update the state with the new value
	};

	// Access the selectPackage function from the loan package context
	const { selectPackage, selectedPackage, setVerifiedLoanData } =
		useLoanPackage();

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
	const [value, setValue] = useState(5000); // Initial value

	// stores the pkage using use context so it can be used in a different page
	const handleChoosePkage = (pkage: Package) => {
		selectPackage(pkage); // Set the selected package
	};

	// calculating loans
	const calcLoan = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			const response = await calculateLoan(
				`$${token}`,
				selectedPackage?.plan_token,
				selectedPackage?.loan_percentage,
				selectedPackage?.provider_token,
				value.toString()
			);
			toast.success('Loan Calculation successful');
			setResult(response);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			toast.error('error calculating loans');
			// setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	const togglePlan = () => {
		setShowPlan(!showPlan);
	};

	return (
		<div className='max-w-6xl px-4 mx-auto pt-10 pb-20 text-dark'>
			<p className='text-lg font-medium pt-2'>Loan Calculator</p>
			<p>Pick your preffered loan provider and package to calculate</p>

			{/* loan providers */}
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

			{/* loan packages */}
			<div>
				{selectedProviderToken ? (
					<div>
						{filteredPackages.length === 0 ? (
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

											<p>{pkage?.loan_percentage}% interest</p>

											<button
												className='w-full py-4 border-[#CEFFCC] border-2 hover:bg-greens text-lg font-bold text-dark/50 hover:text-white rounded-lg mt-7 mb-2 '
												onClick={() => {
													handleChoosePkage(pkage);
													scrollToFormResults(); // Scroll to the form/results section after choosing a package
												}}>
												Choose
											</button>
										</div>
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

			{/* loan calculator div */}
			<div className='w-full mt-10'>
				{/* headings */}
				<h1 className='text-center font-bold text-2xl'>Loan Calculator</h1>

				{/* form / results */}
				<div
					ref={formResultsRef}
					className='flex flex-col md:flex-row w-full mt-10 gap-4'>
					{/* form */}
					<form className='w-full' action=''>
						{/* form container */}
						<div>
							{/* amount */}
							<div>
								<label
									htmlFor='medium-range'
									className='block mb-1 text-sm font-medium text-gray-900 '>
									Borrow Amount
								</label>
								<input
									id='amount'
									type='range'
									min={5000}
									max={1000000}
									value={value}
									onChange={handleChange}
									step={1000}
									className='w-full h-2 mb-4 bg-[#E9ECEF] rounded-lg appearance-none cursor-pointer'
									style={{
										background: `linear-gradient(to right, green 0%, green ${
											(value - 5000) / 10000
										}%, #d3d3d3 ${(value - 5000) / 10000}%, #d3d3d3 100%)`,
									}}
								/>
								{/* min - max amout */}
								<div className='flex items-center justify-between w-full text-sm'>
									<p>N5000</p>
									<p>N1000000</p>
								</div>
								{/* ammount display */}
								<p className='text-center font-bold text-2xl'>N{value}</p>
							</div>

							{/* provider name */}
							<div className='flex items-start sm:items-center md:items-start flex-col sm:flex-row md:flex-col lg:flex-row lg:items-center  justify-between gap-5 md:gap-0 mt-7 w-full'>
								{/* text */}
								<h1 className='font-semibold'>Provider Name:</h1>

								{/* box */}
								<div className='text-dark h-[3rem] p-2 bg-white border w-full sm:w-[70%] md:w-full md:mt-2 lg:mt-0 lg:w-[50%] grid items-center'>
									<p>{selectedPackage?.provider_name || ''}</p>
								</div>
							</div>

							{/* Plan duraton */}
							<div className='flex items-start sm:items-center md:items-start flex-col sm:flex-row md:flex-col lg:flex-row lg:items-center justify-between gap-5 md:gap-0 mt-7 w-full'>
								{/* text */}
								<h1 className='font-semibold'>Paymemt Period:</h1>

								{/* box */}
								<div className='text-dark h-[3rem] p-2 bg-white border w-full sm:w-[70%] md:w-full md:mt-2 lg:mt-0 lg:w-[50%] grid items-center'>
									<p>{selectedPackage?.plan_duration || ''}</p>
								</div>
							</div>

							{/* Interest rate */}
							<div className='flex items-start sm:items-center md:items-start flex-col sm:flex-row md:flex-col lg:flex-row lg:items-center  justify-between w-full gap-5 md:gap-0 mt-7'>
								{/* text */}
								<h1 className='font-semibold'>Interest Rate:</h1>

								{/* box */}
								<div className='flex items-center w-full sm:w-[70%] md:w-full md:mt-2 lg:mt-0 lg:w-[50%]'>
									<div className='text-dark h-[3rem] p-2 bg-white border w-full grid items-center'>
										<p>{selectedPackage?.loan_percentage || ''}</p>
									</div>
									<div className='h-[3rem] w-[3rem] p-2 grid items-center justify-center bg-[#E9ECEF]'>
										%
									</div>
								</div>
							</div>

							<div className='w-full grid justify-end mt-7'>
								<Button onClick={calcLoan} className='bg-greens text-white'>
									{isLoading ? 'Calculating' : 'Calculate'}
								</Button>
							</div>
						</div>
					</form>

					{/* result */}
					<div className='w-full border-t border-t-dark/30 md:border-t-0 mt-10 md:mt-0 py-10 md:py-0'>
						{/* total payment */}
						<div className='text-center'>
							<p className='font-bold text-lg'>Total Loan Payment</p>
							<h1 className='font-bold text-3xl text-greens mt-5'>
								N{result?.totalLoanAmount || '0.00'}
							</h1>
							<p className='text-xs'>Interest Included</p>
						</div>

						{/* other details */}
						<div className='flex flex-col sm:flex-row items-center gap-5 w-full justify-center mt-10 md:mt-[7rem]'>
							{/* total interest paid*/}
							<div className='text-center bg-[#f6f6f6] w-[14rem] rounded-md py-4'>
								<p>Interest Paid</p>
								<p className='font-bold text-3xl'>
									N{result?.loan_interest || '0.00'}
								</p>
							</div>
							{/* total monthly paid  */}
							<div className='text-center bg-[#E9FFF6] w-[14rem] rounded-md py-4'>
								<p>Monthly Payment</p>
								<p className='font-bold text-3xl'>
									N{result?.monthlyRepayment || '0.00'}
								</p>
							</div>
						</div>

						{/* repayment plan */}
						<div className='mt-5'>
							{/* guarantors */}
							<div className='mt-7 bg-greens/10  py-2 px-4 rounded-lg'>
								<div
									className='cursor-pointer flex items-center justify-between'
									onClick={togglePlan}>
									<p className=' text-dark text-lg font-semibold'>
										View Repayment Plan
									</p>

									{showPlan ? <HiChevronUp /> : <HiChevronDown />}
								</div>
								{showPlan && (
									<div className='mt-5'>
										{result?.calculateMonthsAhead?.map((record, index) => (
											<div
												key={index}
												className='border-b border-dark/30 font-medium py-7 '>
												{/* header */}
												<div className='flex items-center gap-4 '>
													{/* number */}
													<div className=' w-[2.5rem] aspect-square rounded-full grid items-center justify-center bg-greens text-white border-[3px] border-white'>
														<p>{index + 1}</p>
													</div>

													{/* plan */}
													<p className='font-semibold text-lg'>
														{record?.monthExpectedToPay}
													</p>
												</div>

												{/* repay details */}
												<div className='px-4 mt-4 flex flex-col gap-1'>
													{/* repay date */}
													<div className='flex items-center justify-between'>
														<p>Repayment Date:</p>

														<p className='text-right'>{record?.paymentDate}</p>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanCalculatorMain;
