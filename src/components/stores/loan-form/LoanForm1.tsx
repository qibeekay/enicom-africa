'use client';
import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { FileRejection, useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import { applyLoan } from '@/api/loan/loan';
import { useTabContext } from '@/components/TabContext';
import { useLoanPackage } from '@/components/loans/loan-facility/LoanPackageContext';
import { Option, Select } from '@material-tailwind/react';

interface UploadResponse {
	success: boolean;
	message: string;
	data?: {
		image: string;
	};
	status_code?: number;
}

interface Guarantor {
	name: string;
	email: string;
	phone: string;
	address: string;
	relationship: string;
}

interface Collecteral {
	collecteral_name: string;
	years_of_usage: string;
	watts: string;
	price_bought: string;
	proof_of_ownership: string | undefined;
}

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

interface filter {
	filteredPackages: any;
}

const LoanForm1 = ({ filteredPackages }: filter) => {
	const [showCollateralForm, setShowCollateralForm] = useState(false);
	const [showGuarantor1, setShowGuarantor1] = useState(false);
	const [showGuarantor2, setShowGuarantor2] = useState(false);
	const [verificationType, setVerificationType] = useState<string>('');
	const [img, setImg] = useState<File | null>(null);
	const [img1, setImg1] = useState<File | null>(null);
	// State variable to track loading state
	const [uploading, setUploading] = useState(false);
	const [uploading1, setUploading1] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(
		null
	);
	const [uploadResponse1, setUploadResponse1] = useState<UploadResponse | null>(
		null
	);

	// Access the selectPackage function from the loan package context
	const { selectedPackage, verifiedLoanData } = useLoanPackage();

	const { setTab } = useTabContext();

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// handle upload 1
	const onDrop1 = useCallback(
		async (acceptedFiles: File[]) => {
			const selectedFile = acceptedFiles[0];

			// Set loading state to true when upload starts
			setUploading(true);

			// Validate MIME type and file extension
			const validFileTypes = ['image/jpeg', 'image/png'];
			if (
				selectedFile &&
				(validFileTypes.includes(selectedFile.type) ||
					/\.(jpg|jpeg|png)$/i.test(selectedFile.name))
			) {
				setImg(selectedFile);

				// Upload the file immediately after it is selected
				const formData = new FormData();
				formData.append('image', selectedFile);

				try {
					const uploadResponse = await fetch(
						'https://enicom.iccflifeskills.com.ng/v0.1/api/upload_image',
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
					setUploadResponse({
						success: false,
						message: 'Image upload failed',
					});
				}
			} else {
				console.warn('Invalid file format or extension');
				toast.warn('Invalid file format or extension');
			}
			// Set loading state back to false when upload completes
			setUploading(false);
		},
		[token]
	);

	// handle upload 2
	const onDrop2 = useCallback(
		async (acceptedFiles: File[]) => {
			const selectedFile = acceptedFiles[0];

			// Set loading state to true when upload starts
			setUploading1(true);

			// Validate MIME type and file extension
			const validFileTypes = ['image/jpeg', 'image/png'];
			if (
				selectedFile &&
				(validFileTypes.includes(selectedFile.type) ||
					/\.(jpg|jpeg|png)$/i.test(selectedFile.name))
			) {
				setImg1(selectedFile);

				// Upload the file immediately after it is selected
				const formData = new FormData();
				formData.append('image', selectedFile);

				try {
					const uploadResponse = await fetch(
						'https://enicom.iccflifeskills.com.ng/v0.1/api/upload_image',
						{
							method: 'POST',
							headers: {
								Authorization: `Bearer $${token}`,
							},
							body: formData,
						}
					);

					const result = await uploadResponse.json();
					setUploadResponse1(result);

					// Update the proof_of_ownership property of the Collecteral object
					setCollecterals((prevState) => {
						const updatedCollecterals = [...prevState];
						updatedCollecterals[0].proof_of_ownership = result?.data?.image;
						return updatedCollecterals;
					});

					toast.success('Image uploaded');
				} catch (error: any) {
					toast.error('Image upload failed');
					setUploadResponse1({
						success: false,
						message: 'Image upload failed',
					});
				}
			} else {
				console.warn('Invalid file format or extension');
				toast.warn('Invalid file format or extension');
			}
			// Set loading state back to false when upload completes
			setUploading1(false);
		},
		[token]
	);

	const { getRootProps: getRootProps1, getInputProps: getInputProps1 } =
		useDropzone({
			onDrop: onDrop1,
			accept: ['image/*'] as any,
			maxFiles: 1,
		});

	const { getRootProps: getRootProps2, getInputProps: getInputProps2 } =
		useDropzone({
			onDrop: onDrop2,
			accept: ['image/*'] as any,
			maxFiles: 1,
		});

	const imageUrl = uploadResponse?.data?.image;
	const imageUrl1 = uploadResponse1?.data?.image;
	console.log(imageUrl1);

	const toggleCollateralForm = () => {
		setShowCollateralForm(!showCollateralForm);
	};

	const toggleGuarantorForm1 = () => {
		setShowGuarantor1(!showGuarantor1);
	};

	const toggleGuarantorForm2 = () => {
		setShowGuarantor2(!showGuarantor2);
	};

	// storing value of guarantors in an array state
	const [guarantors, setGuarantors] = useState<Guarantor[]>([
		{
			name: '',
			email: '',
			phone: '',
			address: '',
			relationship: '',
		},
		{
			name: '',
			email: '',
			phone: '',
			address: '',
			relationship: '',
		},
	]);

	// storing value of collecterals in an array state
	const [collecterals, setCollecterals] = useState<Collecteral[]>([
		{
			collecteral_name: '',
			years_of_usage: '',
			watts: '',
			price_bought: '',
			proof_of_ownership: '',
		},
	]);

	// handle the change collecteral object collection
	const handleCollecteralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCollecterals((prevState) => {
			const updatedCollecterals = prevState.map((collecteral, index) => {
				if (index === 0) {
					return { ...collecteral, [name]: value };
				}
				return collecteral;
			});
			return updatedCollecterals;
		});
	};

	// handle the change first guarantor object collection
	const handleGuarantor1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setGuarantors((prevState) => {
			const updatedGuarantors = [...prevState];
			updatedGuarantors[0][name as keyof Guarantor] = value; // Type assertion here
			return updatedGuarantors;
		});
	};

	// handle the change second guarantor object collection
	const handleGuarantor2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setGuarantors((prevState) => {
			const updatedGuarantors = [...prevState];
			updatedGuarantors[1][name as keyof Guarantor] = value; // Type assertion here
			return updatedGuarantors;
		});
	};

	// store the first and second guarantor objects in an array
	const addGuarantorsToArray = () => {
		setGuarantors([guarantors[0], guarantors[1]]);
	};

	console.log(guarantors);
	console.log(collecterals);
	console.log(selectedPackage);
	console.log(verifiedLoanData);

	// other form data
	const [formData, setFormData] = useState({
		amount_intended_to_borrow: '',
		occupation: '',
		purpose_of_loan: '',
	});

	/* handling all form change */
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

	const handleVerificationTypeChange = (
		selectedValue: React.SetStateAction<string>
	) => {
		setVerificationType(selectedValue);
		// Additional logic if needed
	};

	// handle loan final applications
	const handleLoanApply = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			// Call the CompletePay function
			const paymentResult = await applyLoan(
				`$${token}`,
				`${usertoken}`,
				selectedPackage?.plan_token,
				selectedPackage?.provider_token,
				formData.amount_intended_to_borrow,
				verifiedLoanData,
				selectedPackage?.loan_percentage,
				imageUrl ?? '',
				formData.purpose_of_loan,
				formData.occupation,
				guarantors,
				collecterals
			);

			if (paymentResult.success === false) {
				toast.warn(paymentResult.message);
			} else {
				// The toast notification should be success, not error
				toast.success('Payment successfully');
				setTab('2');

				// Reset form data after successful upload
				setFormData({
					amount_intended_to_borrow: '',
					occupation: '',
					purpose_of_loan: '',
				});

				setGuarantors([
					{
						name: '',
						email: '',
						phone: '',
						address: '',
						relationship: '',
					},
					{
						name: '',
						email: '',
						phone: '',
						address: '',
						relationship: '',
					},
				]);

				setCollecterals([
					{
						collecteral_name: '',
						years_of_usage: '',
						watts: '',
						price_bought: '',
						proof_of_ownership: '',
					},
				]);
				setImg(null);
				setImg1(null);
				setUploadResponse(null);
				setUploadResponse1(null);
			}

			// You can add additional logic based on the payment result, e.g., show a success message

			// Optionally, close the modal or navigate to a success page
		} catch (error) {
			// Handle errors, e.g., show an error message
			toast.error('Error processing payment:');
			console.error('Error processing payment:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='px-4 md:px-[5rem] py-10'>
			<div>
				{/* form */}
				<form action='' onSubmit={handleLoanApply}>
					<div className=' md:w-[40rem]'>
						{/* payback Method */}
						<div className=''>
							<div>
								<p className='text-dark font-semibold text-lg'>
									Application Method
								</p>
							</div>
						</div>

						{/* personal */}
						<div className='mt-7 bg-greens/10  py-2 px-4 rounded-lg'>
							<div
								className='cursor-pointer flex items-center justify-between'
								onClick={toggleGuarantorForm1}>
								<p className=' text-dark '>Personal Information</p>

								{showGuarantor1 ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showGuarantor1 && (
								<div className='mt-5'>
									{/* Personal form */}

									{/* name */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Full Name:</p>
										<input
											type='text'
											placeholder=' name...'
											name='name'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* email */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Email Address</p>
										<input
											type='email'
											placeholder='Email...'
											name='email'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* phone */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Phone Number</p>
										<input
											type='text'
											placeholder='Phone number...'
											name='phone'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* dob */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Date of Birth</p>
									</div>
								</div>
							)}
						</div>

						{/* addres infor */}
						<div className='mt-7 bg-greens/10  py-2 px-4 rounded-lg'>
							<div
								className='cursor-pointer flex items-center justify-between'
								onClick={toggleGuarantorForm1}>
								<p className=' text-dark '>Adddress Information</p>

								{showGuarantor1 ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showGuarantor1 && (
								<div className='mt-5'>
									{/* address */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Home Address</p>
										<input
											type='text'
											placeholder=' address...'
											name='name'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* city */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>City</p>
										<input
											type='text'
											placeholder='ondo...'
											name='email'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* state */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>State</p>
										<input
											type='text'
											placeholder='e.g Lagos...'
											name='phone'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* postal code */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Postal Code</p>
										<input
											type='text'
											placeholder='e.g 228444...'
											name='phone'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>
								</div>
							)}
						</div>

						{/* employment */}
						<div className='mt-7 bg-greens/10  py-2 px-4 rounded-lg'>
							<div
								className='cursor-pointer flex items-center justify-between'
								onClick={toggleGuarantorForm1}>
								<p className=' text-dark '>Employment Information</p>

								{showGuarantor1 ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showGuarantor1 && (
								<div className='mt-5'>
									<Select
										size='lg'
										label='Select Verification Type'
										selected={(element) => {
											const selectedValue = element?.props.value;
											handleVerificationTypeChange(selectedValue);
											return (
												element &&
												React.cloneElement(element, {
													disabled: true,
													className:
														'flex items-center opacity-100 px-0 gap-2 pointer-events-none',
												})
											);
										}}>
										<Option
											value='Full-time'
											className='flex items-center gap-2'>
											Full-time
										</Option>
										<Option
											value='Part-time'
											className='flex items-center gap-2'>
											Part-time
										</Option>
										<Option
											value='Self-employed'
											className='flex items-center gap-2'>
											Self-employed
										</Option>
										<Option
											value='umemployed'
											className='flex items-center gap-2'>
											Unemployed
										</Option>
										<Option value='Retired' className='flex items-center gap-2'>
											Retired
										</Option>
									</Select>

									{/* job */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Job Title</p>
										<input
											type='text'
											placeholder='e.g Doctor...'
											name='email'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* income */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Monthly Income</p>
										<input
											type='text'
											placeholder='e.g 400000...'
											name='phone'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>
								</div>
							)}
						</div>

						{/* loan details */}
						<div className='mt-7 bg-greens/10  py-2 px-4 rounded-lg'>
							<div
								className='cursor-pointer flex items-center justify-between'
								onClick={toggleGuarantorForm1}>
								<p className=' text-dark '>Loan Details</p>

								{showGuarantor1 ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showGuarantor1 && (
								<div className='mt-5'>
									{/* amount */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Amount Requested</p>
										<input
											type='text'
											placeholder='e.g 20000...'
											name='email'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* uplaod */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Upload quote</p>
										<input
											type='file'
											placeholder='e.g 400000...'
											className='mt-2'
										/>
									</div>

									{/* amount */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>
											Preferred Finance Prtner
										</p>
										<input
											type='text'
											placeholder='e.g 20000...'
											name='email'
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									<Select label='Select duration'>
										{filteredPackages?.map((pkg: Package) => (
											<Option key={pkg?.package_token}>
												{pkg?.plan_digit}Months
											</Option>
										))}
									</Select>
								</div>
							)}
						</div>

						{/* collecteral */}
						<div className='mt-7 bg-greens/10  py-2 px-4 rounded-lg'>
							<div
								className='cursor-pointer flex items-center justify-between'
								onClick={toggleCollateralForm}>
								<p className=' text-dark '>Add Collateral</p>

								{showCollateralForm ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showCollateralForm && (
								<div className='mt-5'>
									{/* Collateral form */}

									{/* collateral name */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Collecteral name</p>
										<input
											type='text'
											placeholder='Collateral name...'
											name='collecteral_name'
											value={collecterals[0].collecteral_name}
											onChange={handleCollecteralChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* years of usage */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Years of usage</p>
										<input
											type='text'
											placeholder='Years of usage...'
											name='years_of_usage'
											value={collecterals[0].years_of_usage}
											onChange={handleCollecteralChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* watts */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Watts</p>
										<input
											type='text'
											placeholder='Watts of Item...'
											name='watts'
											value={collecterals[0].watts}
											onChange={handleCollecteralChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* price of item */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Price of items</p>
										<input
											type='text'
											placeholder='Price Bought...'
											name='price_bought'
											value={collecterals[0].price_bought}
											onChange={handleCollecteralChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* image evidence */}
									<div className='max-w-xl relative z-0 mt-2'>
										<p>Upload Evidence</p>
										{uploading1 && <p>Uploading image...</p>}
										<label
											// {...getRootProps2()}
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
												{img1 ? (
													<div className='flex items-center'>
														{/* <img
														src={URL.createObjectURL(file)}
														alt={file.name}
														className='w-8 h-8 object-cover rounded-full'
													/> */}
														<span className='font-medium text-gray-600'>
															{img1.name} is selected.{' '}
															<span
																className='text-blue-600 underline cursor-pointer'
																onClick={() => setImg1(null)}>
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
												{...getInputProps2()}
												type='file'
												name='file_upload'
												className='hidden'
											/>
										</label>

										{/* Display the uploaded image */}
										{imageUrl1 && (
											<div className=' w-[5rem] aspect-square overflow-hidden bg-orange-500 absolute right-5 top-5'>
												<img
													src={`https://enicom.iccflifeskills.com.ng/uploads/${imageUrl1}`}
													alt={imageUrl1}
													className='w-full h-full object-cover'
												/>
											</div>
										)}
									</div>
								</div>
							)}
						</div>

						{/* reason */}
						<div className='mt-7'>
							<p>
								Reason for Loan{' '}
								<span>(in 100 words, highlight reasons for loan)</span>
							</p>

							<textarea
								placeholder='Write here... '
								name='purpose_of_loan'
								value={formData.purpose_of_loan}
								onChange={handleChange}
								className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-3 h-[8rem]'></textarea>
						</div>
					</div>
					{/* button */}
					<div className='grid justify-end mt-20'>
						{/* submit */}
						<button
							type='submit'
							className='bg-greens text-white py-2 px-10 rounded-lg w-[10rem]'>
							Next
						</button>
					</div>
				</form>
				<ToastContainer />
			</div>
		</div>
	);
};

export default LoanForm1;
