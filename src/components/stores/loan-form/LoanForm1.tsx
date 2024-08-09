'use client';
import React, {
	FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { FileRejection, useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import { applyLoan } from '@/api/loan/loan';
import { useTabContext } from '@/components/TabContext';
import { useLoanPackage } from '@/components/loans/loan-facility/LoanPackageContext';
import {
	Checkbox,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Option,
	Select as Selects,
	Spinner,
} from '@material-tailwind/react';
import Select, { MultiValue } from 'react-select';
import { getAllProduct } from '@/api/products/products';
import Datepicker from 'react-tailwindcss-datepicker';
import { useRouter } from 'next/navigation';

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

interface Product {
	product_name: string;
	product_price: number;
	product_image: string;
	// Add other properties as needed
}

interface ProductOption {
	[x: string]: any;
	value: string;
	label: string;
}

interface Category {
	category: string;
	products: Product[];
}

const LoanForm1 = ({ filteredPackages }: filter) => {
	const [showInfo, setShowInfo] = useState(false);
	const [showAddress, setShowAddress] = useState(false);
	const [showEmploy, setShowEmploy] = useState(false);
	const [showLoan, setShowLoan] = useState(false);
	const [status, setStatus] = useState<string>('');
	const [packageToken, setPackageToken] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const [allProducts, setAllProducts] = useState<
		{ value: string; label: string }[]
	>([]);
	const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
	const [isConsentChecked, setIsConsentChecked] = useState<boolean>(false);

	const [value, setValue] = useState({
		startDate: null,
		endDate: null,
	});

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(!open);

	const router = useRouter();

	// Access the selectPackage function from the loan package context
	const { selectedPackage, verifiedLoanData } = useLoanPackage();

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const handleHome = () => {
		router.push('/dashboard');
	};

	const toggleInfoForm = () => {
		setShowInfo(!showInfo);
	};
	const toggleAddressForm = () => {
		setShowAddress(!showAddress);
	};
	const toggleEmployForm = () => {
		setShowEmploy(!showEmploy);
	};
	const toggleLoanForm = () => {
		setShowLoan(!showLoan);
	};

	// other form data
	const [formData, setFormData] = useState({
		usertoken: usertoken,
		type: '',
		name: '',
		mail: '',
		phone: '',
		address_home: '',
		address_city: '',
		address_state: '',
		address_zip: '',
		loan_amount: '',
		loan_quote: '',
		loan_provider_token: '',
		loan_package_token: '',
		dob: '',
		employ_status: '',
		employ_title: '',
		employ_income: '',
		prod_total_amount: '',
		products: '',
		biz_type: '',
		biz_industry: '',
		biz_years: '',
		check_terms: false,
		check_process: false,
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

	const handleEmployStatus = (selectedValue: React.SetStateAction<string>) => {
		setStatus(selectedValue);
		// Additional logic if needed
	};

	const handlePackage = (selectedValue: React.SetStateAction<string>) => {
		setPackageToken(selectedValue);
		// Additional logic if needed
	};

	const handleValueChange = (newValue: any) => {
		// console.log('newValue:', newValue);
		setValue(newValue);
	};

	const [selectedProducts, setSelectedProducts] = useState<ProductOption[]>([]);

	const [totalPurchaseAmount, setTotalPurchaseAmount] = useState<number>(0);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const fetchedProducts = await getAllProduct(`$${token}`);
			const allProducts = fetchedProducts.reduce(
				(acc: ProductOption[], category: Category) => {
					const transformedProducts = category.products.map((product) => ({
						value: product.product_name,
						label: `${product.product_name} - ${product.product_price}`,
						price: product.product_price, // Keep as a number
					}));
					return [...acc, ...transformedProducts];
				},
				[]
			);
			setAllProducts(allProducts);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching products:', error);
			toast.error('Error fetching products');
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleProductChange = (selectedOptions: MultiValue<ProductOption>) => {
		// console.log('Selected options:', selectedOptions);
		const productOptions = selectedOptions.map((option) => {
			// console.log('Processing option:', option);
			return { value: option.value, label: option.label, price: option.price };
		});
		setSelectedProducts(productOptions);
		const totalAmount = productOptions.reduce(
			(acc, product) => acc + product.price,
			0
		);
		// console.log('Total amount:', totalAmount);
		setTotalPurchaseAmount(totalAmount);
	};

	const handleIndividualSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);

			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			const dob = `${value.startDate}` || '';

			const response = await applyLoan(
				{
					...formData,
					loan_amount: parseFloat(formData.loan_amount),
					prod_total_amount: totalPurchaseAmount,
					employ_status: status,
					loan_provider_token:
						filteredPackages && filteredPackages[0].provider_name,
					loan_package_token: packageToken,
					type: 'individual',
					dob: dob,
					products: [
						selectedProducts.map((product) => product.value).join(', '),
					],
					check_process: isConsentChecked,
					check_terms: isTermsChecked,
				},
				`$${token}`
			);

			if (response.success === true || response.status === true) {
				handleOpen();
			} else {
				toast.error('Failed to submit, please refresh and try again...');
			}
		} catch (error: any) {
			toast.error(error.message || 'Please try again');
		} finally {
			setIsLoading(false);
		}
	};

	const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsTermsChecked(event.target.checked);
	};

	const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsConsentChecked(event.target.checked);
	};

	const isSubmitDisabled = !isTermsChecked || !isConsentChecked;

	return (
		<div className='px-4 md:px-[5rem] py-10'>
			<div>
				{/* form */}
				<form action='' onSubmit={handleIndividualSubmit}>
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
								onClick={toggleInfoForm}>
								<p className=' text-dark '>Personal Information</p>

								{showInfo ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showInfo && (
								<div className='mt-5'>
									{/* Personal form */}

									{/* name */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Full Name:</p>
										<input
											type='text'
											placeholder=' name...'
											name='name'
											value={formData.name}
											onChange={handleChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* email */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Email Address</p>
										<input
											type='email'
											placeholder='Email...'
											name='mail'
											value={formData.mail}
											onChange={handleChange}
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
											value={formData.phone}
											onChange={handleChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* dob */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Date of Birth</p>

										<Datepicker
											useRange={false}
											asSingle={true}
											placeholder={'Start Date'}
											value={value}
											inputClassName='w-full rounded-md focus:ring-0 font-normal border border-dark px-4 py-2'
											toggleClassName='absolute bg-greens rounded-r-lg text-white right-0 h-full px-4 py-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
											onChange={handleValueChange}
											primaryColor={'green'}
											showShortcuts={false}
										/>
									</div>
								</div>
							)}
						</div>

						{/* addres infor */}
						<div className='mt-7 bg-greens/10  py-2 px-4 rounded-lg'>
							<div
								className='cursor-pointer flex items-center justify-between'
								onClick={toggleAddressForm}>
								<p className=' text-dark '>Adddress Information</p>

								{showAddress ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showAddress && (
								<div className='mt-5'>
									{/* address */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Home Address</p>
										<input
											type='text'
											placeholder=' address...'
											name='address_home'
											value={formData.address_home}
											onChange={handleChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* city */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>City</p>
										<input
											type='text'
											placeholder='ondo...'
											name='address_city'
											value={formData.address_city}
											onChange={handleChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* state */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>State</p>
										<input
											type='text'
											placeholder='e.g Lagos...'
											name='address_state'
											value={formData.address_state}
											onChange={handleChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* postal code */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Postal Code</p>
										<input
											type='text'
											placeholder='e.g 228444...'
											name='address_zip'
											value={formData.address_zip}
											onChange={handleChange}
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
								onClick={toggleEmployForm}>
								<p className=' text-dark '>Employment Information</p>

								{showEmploy ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showEmploy && (
								<div className='mt-5'>
									<Selects
										size='lg'
										label='Select Verification Type'
										selected={(element) => {
											const selectedValue = element?.props.value;
											handleEmployStatus(selectedValue);
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
									</Selects>

									{/* job */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Job Title</p>
										<input
											type='text'
											placeholder='e.g Doctor...'
											name='employ_title'
											value={formData.employ_title}
											onChange={handleChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* income */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Monthly Income</p>
										<input
											type='text'
											placeholder='e.g 400000...'
											name='employ_income'
											value={formData.employ_income}
											onChange={handleChange}
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
								onClick={toggleLoanForm}>
								<p className=' text-dark '>Loan Details</p>

								{showLoan ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showLoan && (
								<div className='mt-5'>
									{/* amount */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Amount Requested</p>
										<input
											type='text'
											placeholder='e.g 20000...'
											name='loan_amount'
											value={formData.loan_amount}
											onChange={handleChange}
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									{/* uplaod */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>Upload quote</p>
										<input
											type='file'
											name='loan_quote'
											value={formData.loan_quote}
											onChange={handleChange}
											placeholder='e.g 400000...'
											className='mt-2'
										/>
									</div>

									{/* amount */}
									<div className='mt-2'>
										<p className='text-dark font-semibold'>
											Preferred Finance Partner
										</p>
										<input
											type='text'
											value={
												filteredPackages && filteredPackages[0].provider_name
											}
											name=''
											className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
										/>
									</div>

									<div>
										<p className='text-dark font-semibold py-2'>
											Repayment Term
										</p>
										<Selects
											selected={(element) => {
												const selectedValue = element?.props.value;
												handlePackage(selectedValue);
												return (
													element &&
													React.cloneElement(element, {
														disabled: true,
														className:
															'flex items-center opacity-100 px-0 gap-2 pointer-events-none',
													})
												);
											}}
											label='Select duration'>
											{filteredPackages?.map((pkg: Package) => (
												<Option
													key={pkg?.package_token}
													value={pkg?.package_token}>
													{pkg?.plan_digit} Months
												</Option>
											))}
										</Selects>
									</div>
								</div>
							)}
						</div>

						<div className=' mt-7'>
							<Select
								closeMenuOnSelect={false}
								isMulti
								options={allProducts}
								isLoading={isLoading}
								placeholder='Select products'
								onChange={handleProductChange}
							/>

							<div className='mt-2'>
								<label htmlFor='total-purchase-amount'>
									Total Purchase Amount
								</label>
								<input
									type='number'
									id='total-purchase-amount'
									value={totalPurchaseAmount}
									readOnly
									className='w-full bg-greens/10 py-1.5 px-4 rounded-lg placeholder:text-dark/90 mt-2'
								/>
							</div>
						</div>

						<Checkbox
							name='check_terms'
							checked={isTermsChecked}
							onChange={handleTermsChange}
							crossOrigin={undefined}
							color='green'
							label={
								<p className='text-xs'>
									I agree to the terms and conditions set by the selected
									financial institution.
								</p>
							}
						/>

						<Checkbox
							name='check_process'
							checked={isConsentChecked}
							onChange={handleConsentChange}
							color='green'
							crossOrigin={undefined}
							label={
								<p className='text-xs'>
									I consent to the processing of my personal data in accordance
									with ENICOM’s privacy policy.
								</p>
							}
						/>
					</div>
					{/* button */}
					<div className='mt-10'>
						{/* submit */}
						<button
							type='submit'
							disabled={isSubmitDisabled}
							className='bg-greens text-white py-2 px-10 rounded-lg w-[10rem]'>
							{isLoading ? <Spinner className='h-4 w-4' /> : 'Submit'}
						</button>
					</div>
				</form>
				<ToastContainer autoClose={1000} />
			</div>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>
					Thank you! Your application has been successfully submitted.
				</DialogHeader>
				<DialogBody>
					<p>
						You will receive an email or phone call from us within the next 3
						business days on the status of your application.
					</p>
				</DialogBody>
				<DialogFooter>
					<button
						className='bg-greens w-fit py-2 px-5 rounded-lg text-white'
						onClick={handleHome}>
						<span>Go Home</span>
					</button>
				</DialogFooter>
			</Dialog>
		</div>
	);
};

export default LoanForm1;
