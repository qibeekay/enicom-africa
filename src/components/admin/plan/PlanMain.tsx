'use client';
import React, {
	FormEvent,
	Fragment,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { SearchNav } from '@/components';
import { Typography } from '@material-tailwind/react';
import { Combobox, Transition } from '@headlessui/react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import {
	createLoanPackages,
	createLoanProvider,
	createPlan,
	getAllPlans,
	getAllProviders,
} from '@/api/loan/loan';
import { ToastContainer, toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

interface Plan {
	// cat_id: string;
	plan_token: string;
	plan_duration: string;
	plan_digit: string;
	// Add other properties if needed
}

interface Provider {
	// cat_id: string;
	provider_name: string;
	provider_image: string;
	provider_token: string;
	// Add other properties if needed
}

interface UploadResponse {
	success: boolean;
	message: string;
	data?: {
		image: string;
	};
	status_code?: number;
}

const PlanMain = () => {
	const [showPlanForm, setShowPlanForm] = useState(false);
	const [newPlan, setNewPlan] = useState('');
	const [newPlanDigit, setNewPlanDigit] = useState(0);
	const [plans, setPlans] = useState<Plan[]>([]);
	const [selectedPlans, setSelectedPlans] = useState<Plan | null>(null);

	const [showProviderForm, setShowProviderForm] = useState(false);
	const [newProvider, setNewProvider] = useState('');
	const [newProviderDigit, setNewProviderDigit] = useState(0);
	const [providers, setProviders] = useState<Provider[]>([]);
	const [selectedProviders, setSelectedProviders] = useState<Provider | null>(
		null
	);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [query, setQuery] = useState<string>('');
	const [query1, setQuery1] = useState<string>('');
	const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(
		null
	);
	const [file, setFile] = useState<File | null>(null);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// handle upload
	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const selectedFile = acceptedFiles[0];

			// Validate MIME type and file extension
			if (
				selectedFile &&
				(selectedFile.type.startsWith('image/') ||
					selectedFile.type.startsWith('video/'))
			) {
				setFile(selectedFile);

				// Upload the file immediately after it is selected
				const formData = new FormData();
				formData.append('image', selectedFile);

				try {
					const uploadResponse = await fetch(
						'https://enicom.reni.com.ng/v0.1/api/upload_image',
						{
							method: 'POST',
							headers: {
								Authorization: `Bearer $${token}`,
							},
							body: formData,
						}
					);

					const result = await uploadResponse.json();
					setUploadResponse(result);
					toast.success('Image uploaded');
				} catch (error) {
					// console.error('Image upload failed:', error);
					toast.error('Image upload failed');
					setUploadResponse({ success: false, message: 'Image upload failed' });
				}
			} else {
				console.warn('Invalid file format or extension');
				toast.warn('Invalid file format or extension');
			}
		},
		[token]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: ['image/*'] as any,
		maxFiles: 1,
	});

	const uploadedImageUrl = uploadResponse?.data?.image;

	// show plan form
	const handleCreatePlan = () => {
		setShowPlanForm(true);
	};

	// show provider form
	const handleCreateProvider = () => {
		setShowProviderForm(true);
	};

	// fetch plans
	const fetchPlans = async () => {
		const fetchedPlans = (await getAllPlans(`$${token}`)) || [];
		setPlans(fetchedPlans);
	};

	useEffect(() => {
		fetchPlans();
	}, []);

	// fetch provider
	const fetchProviders = async () => {
		const fetchedProviders = (await getAllProviders(`$${token}`)) || [];
		setProviders(fetchedProviders);
	};

	useEffect(() => {
		fetchProviders();
	}, []);

	// create plan
	const handleSavePlan = async () => {
		const success = await createPlan(newPlan, newPlanDigit, `$${token}`);

		if (success) {
			// Refresh the list of categories after adding a new one
			fetchPlans();
			toast.success('Plans Updated');
			// Reset the state and hide the input field
			setNewPlan('');
			setNewPlanDigit(0);
		}
	};

	// create provider
	const handleSaveProvider = async () => {
		const success = await createLoanProvider(
			newProvider,
			uploadedImageUrl || '',
			`$${token}`
		);

		if (success) {
			// Refresh the list of categories after adding a new one
			fetchPlans();
			toast.success('Provider Updated');
			// Reset the state and hide the input field
			setNewProvider('');
			// setNewPlanDigit(0);
		}
	};

	// create loan packages
	const [formData, setFormData] = useState({
		plan_token: '',
		provider_token: '',
		amount: 0,
		percentage: '',
		package_desc: '',
	});

	const resetForm = () => {
		setFormData({
			plan_token: '',
			provider_token: '',
			amount: 0,
			percentage: '',
			package_desc: '',
		});
	};

	// handling form data values
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// handle form submit to create package
	const handleLoanPackage = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			const providerToken = selectedProviders?.provider_token;

			const planToken = selectedPlans?.plan_token;

			if (!planToken || !providerToken) {
				toast.error('error');
				return;
			}

			const response = await createLoanPackages(
				{
					...formData,
					provider_token: providerToken,
					plan_token: planToken,
				},
				`$${token}`
			);

			toast.success('Loan Package Created');
			resetForm();
		} catch (error: any) {
			toast.error('Failed to upload');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<SearchNav />

			<div>
				<h1>Create Loans</h1>

				<div>
					<form action='' className=' w-[70%] mx-auto'>
						<div className='flex flex-col gap-3'>
							{/* select plans */}
							<div className='w-full relative z-50'>
								<Typography className='mb-1 text-dark'>Loan Plans</Typography>

								<Combobox
									value={selectedPlans}
									onChange={(selected) => setSelectedPlans(selected)}>
									<div className='relative z-50 mt-1'>
										<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
											<Combobox.Input
												className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
												displayValue={() =>
													selectedPlans
														? selectedPlans.plan_duration
														: 'Select Loan Plans'
												}
												onChange={(event) => setQuery(event.target.value)}
											/>
											<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
												<FaChevronDown
													className='h-5 w-5 text-gray-400'
													aria-hidden='true'
												/>
											</Combobox.Button>
										</div>
										<Transition
											as={Fragment}
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
											afterLeave={() => setQuery('')}>
											<Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
												{plans.length === 0 && query !== '' ? (
													<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
														Nothing found.
													</div>
												) : (
													plans.map((plan) => (
														<Combobox.Option
															key={plan.plan_token}
															value={plan}
															className={({ active }) =>
																`relative cursor-default select-none py-2 pl-10 pr-4 ${
																	active
																		? 'bg-teal-600 text-white'
																		: 'text-gray-900'
																}`
															}>
															{({ selected, active }) => (
																<>
																	<span
																		className={`block truncate ${
																			selected ? 'font-medium' : 'font-normal'
																		}`}>
																		{plan.plan_duration}
																	</span>
																	{selected ? (
																		<span
																			className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																				active ? 'text-white' : 'text-teal-600'
																			}`}>
																			<FaCheck
																				className='h-5 w-5'
																				aria-hidden='true'
																			/>
																		</span>
																	) : null}
																</>
															)}
														</Combobox.Option>
													))
												)}
											</Combobox.Options>
										</Transition>
									</div>
								</Combobox>

								{/* add category */}
								{showPlanForm ? (
									<div className='flex flex-col md:flex-row gap-4 items-end mt-5'>
										<div className='w-full'>
											<label htmlFor=''>Plan Name</label>
											<input
												type='text'
												placeholder='e.g 3 months plan'
												className='w-full mt-1 outline-none border py-2 border-dark rounded-lg px-4'
												value={newPlan}
												onChange={(e) => setNewPlan(e.target.value)}
											/>
										</div>
										<div className='w-full'>
											<label htmlFor=''>
												Plan Digit <small>(e.g 3)</small>
											</label>
											<input
												type='number'
												placeholder='Enter Category Name'
												className='w-full mt-1 outline-none border py-2 border-dark rounded-lg px-4'
												value={newPlanDigit}
												onChange={(e) =>
													setNewPlanDigit(parseInt(e.target.value, 10))
												}
											/>
										</div>
										<div className='flex gap-4'>
											<div className=''>
												<div
													className='bg-greens border-2 border-greens rounded-lg text-white py-2 px-4 cursor-pointer'
													onClick={handleSavePlan}>
													<p>Add</p>
												</div>
											</div>
											<div className=''>
												<div
													className='bg-white border-greens border-2 rounded-lg text-dark py-2 px-4 cursor-pointer'
													onClick={() => {
														setShowPlanForm(false);
													}}>
													<p>Cancel</p>
												</div>
											</div>
										</div>
									</div>
								) : (
									<div className='cursor-pointer mt-2'>
										<p className='text-greens' onClick={handleCreatePlan}>
											Create Plan
										</p>
									</div>
								)}
							</div>

							{/* select providers */}
							<div className='w-full'>
								<Typography className=' mb-1 text-dark'>
									Loan Provider
								</Typography>

								<Combobox
									value={selectedProviders}
									onChange={(selected) => setSelectedProviders(selected)}>
									<div className='relative z-30 mt-1'>
										<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
											<Combobox.Input
												className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
												displayValue={() =>
													selectedProviders
														? selectedProviders.provider_name
														: 'Select Loan Provider'
												}
												onChange={(event) => setQuery1(event.target.value)}
											/>
											<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
												<FaChevronDown
													className='h-5 w-5 text-gray-400'
													aria-hidden='true'
												/>
											</Combobox.Button>
										</div>
										<Transition
											as={Fragment}
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
											afterLeave={() => setQuery1('')}>
											<Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
												{providers.length === 0 && query1 !== '' ? (
													<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
														Nothing found.
													</div>
												) : (
													providers.map((provider) => (
														<Combobox.Option
															key={provider.provider_token}
															value={provider}
															className={({ active }) =>
																`relative cursor-default select-none flex items-center py-2 pl-4 pr-4 ${
																	active
																		? 'bg-teal-600 text-white'
																		: 'text-gray-900'
																}`
															}>
															{({ selected, active }) => (
																<>
																	<img
																		src={`https://enicom.reni.com.ng/uploads/${provider.provider_image}`}
																		alt={provider.provider_name}
																		className='w-8 h-8 object-cover rounded-full mr-2'
																	/>
																	<span
																		className={`block truncate ${
																			selected ? 'font-medium' : 'font-normal'
																		}`}>
																		{provider.provider_name}
																	</span>
																	{selected ? (
																		<span
																			className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																				active ? 'text-white' : 'text-teal-600'
																			}`}>
																			<FaCheck
																				className='h-5 w-5'
																				aria-hidden='true'
																			/>
																		</span>
																	) : null}
																</>
															)}
														</Combobox.Option>
													))
												)}
											</Combobox.Options>
										</Transition>
									</div>
								</Combobox>

								{/* add category */}
								{showProviderForm ? (
									<div className='flex flex-col md:flex-row gap-4 items-end mt-5'>
										<div className='w-full'>
											<label htmlFor=''>Providers Name</label>
											<input
												type='text'
												placeholder='e.g 3 months plan'
												className='w-full mt-1 outline-none border py-2 border-dark rounded-lg px-4'
												value={newProvider}
												onChange={(e) => setNewProvider(e.target.value)}
											/>
										</div>
										{/* image upload */}
										<div className='max-w-xl relative z-0'>
											<label
												// {...getRootProps()}
												className='flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
												<span className='flex items-center space-x-2'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='w-6 h-6 text-gray-600'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'
														strokeWidth='2'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
														/>
													</svg>
													{file ? (
														<div className='flex items-center'>
															<span className='font-medium text-gray-600'>
																{file.name} is selected.{' '}
																<span
																	className='text-blue-600 underline cursor-pointer'
																	onClick={() => setFile(null)}>
																	Remove
																</span>
															</span>
														</div>
													) : (
														<span className='font-medium text-gray-600'>
															Drop files to Attach, or{' '}
															<span className='text-blue-600 underline'>
																browse
															</span>
														</span>
													)}
												</span>
												<input
													{...getInputProps()}
													type='file'
													name='file_upload'
													className='hidden'
													aria-hidden='true' // hide from screen readers
												/>
											</label>

											{/* Display the uploaded image */}
											{uploadedImageUrl && (
												<div className=' w-[5rem] aspect-square overflow-hidden bg-orange-500 absolute right-5 top-5'>
													<img
														src={`https://enicom.reni.com.ng/uploads/${uploadedImageUrl}`}
														alt={uploadedImageUrl}
														className='w-full h-full object-cover'
													/>
												</div>
											)}
										</div>
										<div className='flex gap-4'>
											<div className=''>
												<div
													className='bg-greens border-2 border-greens rounded-lg text-white py-2 px-4 cursor-pointer'
													onClick={handleSaveProvider}>
													<p>Add</p>
												</div>
											</div>
											<div className=''>
												<div
													className='bg-white border-greens border-2 rounded-lg text-dark py-2 px-4 cursor-pointer'
													onClick={() => {
														setShowProviderForm(false);
													}}>
													<p>Cancel</p>
												</div>
											</div>
										</div>
									</div>
								) : (
									<div className='cursor-pointer mt-2'>
										<p className='text-greens' onClick={handleCreateProvider}>
											Create Provider
										</p>
									</div>
								)}
							</div>

							{/* amount */}
							<div>
								<label htmlFor='amount'>Amount</label>
								<input
									type='number'
									name='amount'
									value={formData.amount}
									onChange={handleChange}
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								/>
							</div>

							{/* percentage */}
							<div>
								<label htmlFor='percentage'>Percentage</label>
								<input
									type='text'
									name='percentage'
									value={formData.percentage}
									onChange={handleChange}
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								/>
							</div>

							{/* package description */}
							<div>
								<label htmlFor='amount'>Package Description</label>
								<input
									type='text'
									name='package_desc'
									value={formData.package_desc}
									onChange={handleChange}
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								/>
							</div>

							{/* button */}
							<div className='mt-5'>
								<button
									className='bg-greens px-14 py-2 rounded-lg text-white w-fit'
									onClick={handleLoanPackage}>
									{isLoading ? 'Loading...' : 'Upload'}
								</button>
							</div>
						</div>
					</form>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
};

export default PlanMain;
