'use client';
import {
	createCategory,
	getAllCategories,
	getUser,
	uploadProduct,
} from '@/api/products/products';
import { Combobox, Transition } from '@headlessui/react';
import {
	Button,
	Dialog,
	DialogHeader,
	Option,
	Select,
	Typography,
} from '@material-tailwind/react';
import React, {
	FormEvent,
	Fragment,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaChevronDown } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useTabContext } from '../TabContext';

interface UploadResponse {
	success: boolean;
	message: string;
	data?: {
		image: string;
	};
	status_code?: number;
}

interface Category {
	cat_id: string;
	cat_name: string;
	// Add other properties if needed
}
const Tab3 = () => {
	const [file, setFile] = useState<File | null>(null);
	const [showCategoryForm, setShowCategoryForm] = useState(false);
	const [newCategory, setNewCategory] = useState('');
	const [categories, setCategories] = useState<Category[]>([]);
	const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(
		null
	);

	const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
	const [query, setQuery] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [uploading, setUploading] = useState(false);
	const { setTab } = useTabContext();
	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	const handleOpen1 = () => setOpen1((cur) => !cur);
	const handleOpen = () => {
		setOpen((cur) => !cur);
	};

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const selectedFile = acceptedFiles[0];

			// Set loading state to true when upload starts
			setUploading(true);

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
					setUploading(false);
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
		accept: ['image/*'] as any, // Specify the accepted file types
		maxFiles: 1, // Limit the number of files to 1
	});

	const handleAddCategory = () => {
		setShowCategoryForm(true);
	};

	const fetchCategories = async () => {
		const fetchedCategories = (await getAllCategories(`$${token}`)) || [];
		setCategories(fetchedCategories);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleSaveCategory = async () => {
		const success = await createCategory(newCategory, `$${token}`);

		if (success) {
			// Refresh the list of categories after adding a new one
			fetchCategories();
			toast.success('Categories Updated');
			// Reset the state and hide the input field
			setNewCategory('');
		}
	};

	const uploadedImageUrl = uploadResponse?.data?.image;
	console.log(uploadedImageUrl);
	console.log('Categories:', categories);

	const router = useRouter();

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// console.log(usertoken);

	// uplaod product
	const [formData, setFormData] = useState({
		product_name: '',
		product_price: '',
		product_image: '',
		product_desc: '',
		product_condition: '',
		product_voltage: '',
		product_unit: '',
		product_watts: '',
		product_rating: '',
		product_capacity: '',
		product_quantity: '',
		delivery_fee: '',
		usertoken: usertoken,
		product_category: [] as string[],
	});

	// Function to reset the form state
	const resetForm = () => {
		setFormData({
			product_name: '',
			product_price: '',
			product_image: '',
			product_desc: '',
			product_condition: '',
			product_voltage: '',
			product_unit: '',
			product_watts: '',
			product_rating: '',
			product_capacity: '',
			product_quantity: '',
			delivery_fee: '',
			usertoken: usertoken,
			product_category: [] as string[],
		});
		setFile(null);
		setSelectedCategories([]);
		setUploadResponse(null);
		setNewCategory('');
	};

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

	const handleUpload = async (event: FormEvent) => {
		event.preventDefault();
		try {
			setIsLoading(true);

			// Check if the token is defined before using it
			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			// Fetch user data to check is_verified_seller
			const getusers = await getUser(`$${token}`, `${usertoken}`);

			// Check if the user is not verified as a seller
			if (getusers.is_verified_seller === false) {
				// Show a dialog to prompt the user to register as a seller
				setOpen(true);
				return; // Do not proceed with the upload
			}

			// Ensure that product_image is a string and not undefined
			const productImage = uploadedImageUrl || '';
			// Ensure that usertoken is a string and not null
			const userToken = formData.usertoken || '';

			// Convert product_category to an array of strings
			const productCategory = selectedCategories.map(
				(category) => category.cat_id
			);

			const response = await uploadProduct(
				{
					...formData,
					product_image: productImage,
					product_category: productCategory,
					usertoken: userToken,
				},
				`$${token}`
			);

			console.log('Upload response:', response);

			if (response.success === true) {
				toast.success('Product upload Successful');
				resetForm();
				// router.push('/verify-mail');
			} else {
				toast.error(response.message || 'Failed to upload');
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to upload');
		} finally {
			setIsLoading(false);
		}
	};

	// api to get user data
	const getuser = async () => {
		try {
			const getusers = await getUser(`$${token}`, `${usertoken}`);
			// Check if the user is not verified
			if (getusers.is_verified_seller === false) {
				// Show a dialog to prompt the user to register as a seller
				setOpen(true);
			}
		} catch (error) {
			// console.error('Error fetching cart items:', error);
			console.log('error');
		}
	};

	useEffect(() => {
		getuser();
	}, []);

	const handleBusiness = () => {
		localStorage.setItem('bussiness_type', 'Bussiness');
		// router.push('/sellers');
		setTab('1');
		handleOpen1();
	};

	const handleIndividual = () => {
		// Save the word "individual" to local storage
		localStorage.setItem('bussiness_type', 'Individual');
		// router.push('/sellers');
		setTab('1');
		handleOpen1();
	};

	return (
		<div>
			<div className='font-poppins text-dark'>
				<div>
					<div>
						<h1>Upload Products</h1>

						<form action='' className='mt-5' onSubmit={handleUpload}>
							<div className='flex flex-col gap-6'>
								{/* product name */}
								<div>
									<label htmlFor='amount'>Product Name</label>
									<input
										type='text'
										name='product_name'
										value={formData.product_name}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>

								{/* product price */}
								<div>
									<label htmlFor='amount'>Product Price</label>
									<input
										type='text'
										name='product_price'
										value={formData.product_price}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>

								{/* product capacity */}
								<div>
									<label htmlFor='amount'>Product Capacity</label>
									<input
										type='text'
										name='product_capacity'
										value={formData.product_capacity}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>

								{/* product voltage */}
								<div>
									<label htmlFor='amount'>Product Voltage</label>
									<input
										type='text'
										name='product_voltage'
										value={formData.product_voltage}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>

								{/* product amps */}
								<div>
									<label htmlFor='amount'>Product Unit</label>
									<input
										type='text'
										name='product_unit'
										value={formData.product_unit}
										onChange={handleChange}
										placeholder='eg. Amps'
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>

								{/* product watt */}
								<div>
									<label htmlFor='amount'>Product Watts</label>
									<input
										type='text'
										name='product_watts'
										value={formData.product_watts}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>

								{/* product rating */}
								<div>
									<label htmlFor='amount'>Product Rating</label>
									<input
										type='text'
										name='product_rating'
										value={formData.product_rating}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>

								{/* product condition */}
								<div>
									<label htmlFor='amount'>Product Condition</label>
									<input
										type='text'
										name='product_condition'
										value={formData.product_condition}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>

								{/* product category */}
								<div className='w-full relative z-10'>
									<Typography className='mb-1 text-dark'>
										Product category
									</Typography>

									<Combobox
										value={selectedCategories}
										onChange={(selected) => setSelectedCategories(selected)}
										multiple>
										<div className='relative z-30 mt-1'>
											<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
												<Combobox.Input
													className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
													displayValue={() =>
														selectedCategories.length > 0
															? selectedCategories
																	.map((category) => category.cat_name)
																	.join(', ')
															: 'Select Category'
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
													{categories.length === 0 && query !== '' ? (
														<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
															Nothing found.
														</div>
													) : (
														categories.map((category) => (
															<Combobox.Option
																key={category.cat_id}
																value={category}
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
																			{category.cat_name}
																		</span>
																		{selected ? (
																			<span
																				className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																					active
																						? 'text-white'
																						: 'text-teal-600'
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
									{showCategoryForm ? (
										<div className='flex gap-4 items-center mt-5'>
											<input
												type='text'
												placeholder='Enter Category Name'
												className='w-full outline-none border py-2 border-dark rounded-lg px-4'
												value={newCategory}
												onChange={(e) => setNewCategory(e.target.value)}
											/>
											<div className=''>
												<div
													className='bg-greens rounded-lg text-white py-2 px-4 cursor-pointer'
													onClick={handleSaveCategory}>
													<p>Add</p>
												</div>
											</div>
										</div>
									) : (
										<div className='cursor-pointer mt-2'>
											<p className='text-greens' onClick={handleAddCategory}>
												Add Category
											</p>
										</div>
									)}
								</div>

								{/* product quantity */}
								<div>
									<label htmlFor='amount'>Product quantity</label>
									<input
										type='text'
										name='product_quantity'
										value={formData.product_quantity}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									/>
								</div>
								<div>
									<label htmlFor='amount'>Delivery Fee</label>
									<input
										type='text'
										name='delivery_fee'
										value={formData.delivery_fee}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
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
													{/* <img
														src={URL.createObjectURL(file)}
														alt={file.name}
														className='w-8 h-8 object-cover rounded-full'
													/> */}
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
										/>
									</label>

									{/* Display the uploaded image */}
									{uploadedImageUrl && (
										<div className=' w-[5rem] aspect-square overflow-hidden absolute right-5 top-5'>
											<img
												src={`https://enicom.iccflifeskills.com.ng/uploads/${uploadedImageUrl}`}
												alt={uploadedImageUrl}
												className='w-full h-full object-cover'
											/>
										</div>
									)}

									{uploading && <p>Uploading image...</p>}
								</div>

								{/* product description */}
								<div>
									<label htmlFor='Product description'>
										Info About product
									</label>
									<textarea
										name='product_desc'
										value={formData.product_desc}
										onChange={handleChange}
										className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2 h-[7rem]'></textarea>
								</div>

								{/* button */}
								<div className='mt-5'>
									<button className='bg-greens px-14 py-2 rounded-lg text-white w-fit'>
										{isLoading ? 'Loading...' : 'Upload'}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<ToastContainer />
				<Dialog
					size='xs'
					open={open}
					handler={handleOpen}
					className='bg-white shadow-none text-dark p-6'>
					<DialogHeader>Register as a Seller</DialogHeader>
					<div className='grid mt-4'>
						<Typography className='text-gray-700'>
							To upload products, you need to register as a seller. Becoming a
							verified seller allows you to showcase your products to a wider
							audience. Take the first step towards growing your business!
						</Typography>
						<div className='mt-6'>
							<Button variant='filled' color='green' onClick={handleOpen1}>
								Register as Seller
							</Button>
						</div>
					</div>
				</Dialog>
				<Dialog
					size='xs'
					open={open1}
					handler={handleOpen1}
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
				</Dialog>
			</div>
		</div>
	);
};

export default Tab3;
