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
import { Option, Select as Selects } from '@material-tailwind/react';
import Select, { MultiValue } from 'react-select';
import { getAllProduct } from '@/api/products/products';

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
	product_price_th: string;
	product_image: string;
	// Add other properties as needed
}

interface ProductOption {
	value: string;
	label: string;
	price: number;
}

interface Category {
	category: string;
	products: Product[];
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
	const [allProducts, setAllProducts] = useState<
		{ value: string; label: string }[]
	>([]);

	// Access the selectPackage function from the loan package context
	const { selectedPackage, verifiedLoanData } = useLoanPackage();

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const toggleGuarantorForm1 = () => {
		setShowGuarantor1(!showGuarantor1);
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

	const [selectedProducts, setSelectedProducts] = useState<
		MultiValue<ProductOption>
	>([]);
	const [totalPurchaseAmount, setTotalPurchaseAmount] = useState<number>(0);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const fetchedProducts = await getAllProduct(`$${token}`);

			const allProducts = fetchedProducts.reduce(
				(acc: ProductOption[], category: Category) => {
					const transformedProducts = category.products.map((product) => ({
						value: product.product_name,
						label: `${product.product_name} - ${product.product_price_th}`,
						price: parseFloat(product.product_price_th), // Include price for calculation
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

	const handleProductChange = (
		selectedOptions: MultiValue<{ value: string; label: string }>
	) => {
		const productOptions = selectedOptions.map((option) => {
			const [value, label] = option.value.split(' - ');
			return { value, label, price: parseFloat(value.replace('$', '')) };
		});

		setSelectedProducts(productOptions);

		const totalAmount = productOptions.reduce(
			(acc, product) => acc + product.price,
			0
		);
		setTotalPurchaseAmount(totalAmount);
	};

	console.log(totalPurchaseAmount);

	// handle loan final applications
	// const handleLoanApply = async (e: FormEvent) => {
	// 	e.preventDefault();
	// 	try {
	// 		setIsLoading(true);

	// 		// Call the CompletePay function
	// 		const paymentResult = await applyLoan(
	// 			`$${token}`,
	// 			`${usertoken}`,
	// 			selectedPackage?.plan_token,
	// 			selectedPackage?.provider_token,
	// 			formData.amount_intended_to_borrow,
	// 			verifiedLoanData,
	// 			selectedPackage?.loan_percentage,

	// 			formData.purpose_of_loan,
	// 			formData.occupation,
	// 			guarantors,
	// 			collecterals
	// 		);

	// 		if (paymentResult.success === false) {
	// 			toast.warn(paymentResult.message);
	// 		} else {
	// 			// The toast notification should be success, not error
	// 			toast.success('Payment successfully');

	// 			// Reset form data after successful upload
	// 			setFormData({
	// 				amount_intended_to_borrow: '',
	// 				occupation: '',
	// 				purpose_of_loan: '',
	// 			});

	// 			setGuarantors([
	// 				{
	// 					name: '',
	// 					email: '',
	// 					phone: '',
	// 					address: '',
	// 					relationship: '',
	// 				},
	// 				{
	// 					name: '',
	// 					email: '',
	// 					phone: '',
	// 					address: '',
	// 					relationship: '',
	// 				},
	// 			]);

	// 			setCollecterals([
	// 				{
	// 					collecteral_name: '',
	// 					years_of_usage: '',
	// 					watts: '',
	// 					price_bought: '',
	// 					proof_of_ownership: '',
	// 				},
	// 			]);
	// 			setImg(null);
	// 			setImg1(null);
	// 			setUploadResponse(null);
	// 			setUploadResponse1(null);
	// 		}

	// 		// You can add additional logic based on the payment result, e.g., show a success message

	// 		// Optionally, close the modal or navigate to a success page
	// 	} catch (error) {
	// 		// Handle errors, e.g., show an error message
	// 		toast.error('Error processing payment:');
	// 		console.error('Error processing payment:', error);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	return (
		<div className='px-4 md:px-[5rem] py-10'>
			<div>
				{/* form */}
				<form
					action=''
					// onSubmit={handleLoanApply}
				>
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
									<Selects
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
									</Selects>

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
										<p className='text-dark font-semibold'>Repayment Term</p>
										<Selects label='Select duration'>
											{filteredPackages?.map((pkg: Package) => (
												<Option key={pkg?.package_token}>
													{pkg?.plan_digit} Months
												</Option>
											))}
										</Selects>
									</div>
								</div>
							)}
						</div>

						<div className=''>
							<Select
								closeMenuOnSelect={false}
								isMulti
								options={allProducts}
								isLoading={isLoading}
								placeholder='Select products'
								onChange={handleProductChange}
							/>

							<div>
								<label htmlFor='total-purchase-amount'>
									Total Purchase Amount
								</label>
								<input
									type='number'
									id='total-purchase-amount'
									value={totalPurchaseAmount}
									readOnly
								/>
							</div>
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
