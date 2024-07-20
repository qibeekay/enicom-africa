'use client';
import { verifyBusiness, verifyIndividual } from '@/api/kyc/kyc';
import { Option, Select } from '@material-tailwind/react';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { HiChevronDown } from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';

interface UploadResponse {
	success: boolean;
	message: string;
	data?: {
		image: string;
	};
	status_code?: number;
}

const BussinessVerify = () => {
	const [img, setImg] = useState<File | null>(null);
	const [img1, setImg1] = useState<File | null>(null);
	const [img2, setImg2] = useState<File | null>(null);
	const [bussinessType, setBussinessType] = useState<string>('');
	const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(
		null
	);
	const [uploadResponse1, setUploadResponse1] = useState<UploadResponse | null>(
		null
	);
	const [uploadResponse2, setUploadResponse2] = useState<UploadResponse | null>(
		null
	);
	const [verificationType, setVerificationType] = useState<string>('');
	const [uploading, setUploading] = useState(false);
	const [uploading1, setUploading1] = useState(false);
	const [uploading2, setUploading2] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

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
					setUploading(false);
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
					toast.success('Image uploaded');
				} catch (error) {
					// console.error('Image upload failed:', error);
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

	const onDrop3 = useCallback(
		async (acceptedFiles: File[]) => {
			const selectedFile = acceptedFiles[0];

			// Set loading state to true when upload starts
			setUploading2(true);

			// Validate MIME type and file extension
			const validFileTypes = ['image/jpeg', 'image/png'];
			if (
				selectedFile &&
				(validFileTypes.includes(selectedFile.type) ||
					/\.(jpg|jpeg|png)$/i.test(selectedFile.name))
			) {
				setImg2(selectedFile);

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
					setUploadResponse2(result);
					toast.success('Image uploaded');
				} catch (error) {
					// console.error('Image upload failed:', error);
					toast.error('Image upload failed');
					setUploadResponse2({
						success: false,
						message: 'Image upload failed',
					});
				}
			} else {
				console.warn('Invalid file format or extension');
				toast.warn('Invalid file format or extension');
			}
			// Set loading state back to false when upload completes
			setUploading2(false);
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

	const { getRootProps: getRootProps3, getInputProps: getInputProps3 } =
		useDropzone({
			onDrop: onDrop3,
			accept: ['image/*'] as any,
			maxFiles: 1,
		});

	const imageUrl = uploadResponse?.data?.image;
	const imageUrl1 = uploadResponse1?.data?.image;
	const imageUrl2 = uploadResponse2?.data?.image;
	console.log(imageUrl);
	console.log(imageUrl1);

	// Check if user is logged in based on your authentication mechanism
	useEffect(() => {
		// Retrieve kyc_status from local storage
		const storedBussinessType = localStorage.getItem('bussiness_type');
		setBussinessType(storedBussinessType || '');
	}, []);

	console.log(bussinessType);

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// uplaod product
	const [formData, setFormData] = useState({
		fname: '',
		mail: '',
		address: '',
		state: '',
		phone_number: '',
		profile_image: '',
		bussiness_type: '',
		bussiness_name: '',
		verification_type: '',
		verification_number: '',
		cac_number: '',
		utility_bill: '',
		current_production_capacity: '',
		fast_supply_deliveries: '',
		effective_support_process: '',
		error_margin_expect: '',
		customer_support_staff: '',
		greater_demand: '',
		product_catalogue: '',
		usertoken: usertoken,
	});

	const resetForm = () => {
		setFormData({
			fname: '',
			mail: '',
			address: '',
			state: '',
			phone_number: '',
			profile_image: '',
			bussiness_type: '',
			bussiness_name: '',
			verification_type: '',
			verification_number: '',
			cac_number: '',
			utility_bill: '',
			current_production_capacity: '',
			fast_supply_deliveries: '',
			effective_support_process: '',
			error_margin_expect: '',
			customer_support_staff: '',
			greater_demand: '',
			product_catalogue: '',
			usertoken: usertoken,
		});
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

		// Check if the changed field is the verification type
	};

	const handleVerificationTypeChange = (
		selectedValue: React.SetStateAction<string>
	) => {
		setVerificationType(selectedValue);
		// Additional logic if needed
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

			// Ensure that usertoken is a string and not null
			const userToken = formData.usertoken || '';
			const profileImage = imageUrl || '';
			const utilityBill = imageUrl1 || '';
			const catalogueImage = imageUrl1 || '';

			const response = await verifyBusiness(
				{
					...formData,
					profile_image: profileImage,
					bussiness_type: bussinessType,
					utility_bill: utilityBill,
					verification_type: verificationType,
					product_catalogue: catalogueImage,
					usertoken: userToken,
				},
				`$${token}`
			);

			console.log('Verification response:', response);

			if (response.success === true) {
				toast.success('Submitted, You will be notified when Approved');
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

	return (
		<div>
			<div>
				<h1>Business Information</h1>

				<form action='' className='mt-5'>
					<div className='flex flex-col gap-6'>
						{/* fullname */}
						<div>
							<label htmlFor='amount'>Full Name</label>
							<input
								type='text'
								name='fname'
								value={formData.fname}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* Email Address */}
						<div>
							<label htmlFor='amount'>Email Address</label>
							<input
								type='text'
								name='mail'
								value={formData.mail}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* Home Address */}
						<div>
							<label htmlFor='amount'>Home Address</label>
							<input
								type='text'
								name='address'
								value={formData.address}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* State */}
						<div>
							<label htmlFor='amount'>State (e.g Lagos)</label>
							<input
								type='text'
								name='state'
								value={formData.state}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* phone number */}
						<div>
							<label htmlFor='amount'>Phone Number</label>
							<input
								type='text'
								name='phone_number'
								value={formData.phone_number}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* image upload */}
						<div className='max-w-xl relative z-0'>
							<p>Upload your Picture</p>
							<label
								// {...getRootProps1()}
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
									{img ? (
										<div className='flex items-center'>
											{/* <img
														src={URL.createObjectURL(file)}
														alt={file.name}
														className='w-8 h-8 object-cover rounded-full'
													/> */}
											<span className='font-medium text-gray-600'>
												{img.name} is selected.{' '}
												<span
													className='text-blue-600 underline cursor-pointer'
													onClick={() => setImg(null)}>
													Remove
												</span>
											</span>
										</div>
									) : (
										<span className='font-medium text-gray-600'>
											Drop files to Attach, or{' '}
											<span className='text-blue-600 underline'>browse</span>
										</span>
									)}
								</span>
								<input
									{...getInputProps1()}
									type='file'
									name='file_upload'
									className='hidden'
								/>
							</label>

							{/* Display the uploaded image */}
							{imageUrl && (
								<div className=' w-[5rem] aspect-square overflow-hidden bg-orange-500 absolute right-5 top-5'>
									<img
										src={`https://enicom.iccflifeskills.com.ng/uploads/${imageUrl}`}
										alt={imageUrl}
										className='w-full h-full object-cover'
									/>
								</div>
							)}

							{uploading && <p>Uploading image...</p>}
						</div>

						{/* Verification type */}
						<div>
							<label htmlFor='verificationType'>Verification Type</label>
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
								<Option value='bvn' className='flex items-center gap-2'>
									BVN
								</Option>
								<Option value='nin' className='flex items-center gap-2'>
									NIN
								</Option>
							</Select>
						</div>

						{/* Verification Number */}
						<div>
							<label htmlFor='am'>Verification Number</label>
							<input
								type='text'
								name='verification_number'
								value={formData.verification_number}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* Business Name */}
						<div>
							<label htmlFor='businessName'>Business Name</label>
							<input
								type='text'
								name='bussiness_name'
								value={formData.bussiness_name}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* CAC Number */}
						<div>
							<label htmlFor='vNumber'>
								Corporate Affairs Commission (CAC) Number
							</label>
							<input
								type='text'
								name='cac_number'
								value={formData.cac_number}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* utility bill upload */}
						<div className='max-w-xl relative z-0'>
							<p>Upload your Utility Bill</p>
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
											<span className='text-blue-600 underline'>browse</span>
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

							{uploading1 && <p>Uploading image...</p>}
						</div>

						{/* production capacity */}
						<div>
							<label htmlFor='amount'>Current Production Capacity</label>
							<input
								type='text'
								name='current_production_capacity'
								value={formData.current_production_capacity}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* fast supply deliveries */}
						<div>
							<label htmlFor='amount'>Delivery Speed</label>
							<input
								type='text'
								name='fast_supply_deliveries'
								value={formData.fast_supply_deliveries}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='How fast do you supply deliveries'
							/>
						</div>

						{/* Effective support */}
						<div>
							<label htmlFor='amount'>Support Process</label>
							<input
								type='text'
								name='effective_support_process'
								value={formData.effective_support_process}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='How effective is your support process'
							/>
						</div>

						{/* error margin */}
						<div>
							<label htmlFor='amount'>Expected Error Margin</label>
							<input
								type='text'
								name='error_margin_expect'
								value={formData.error_margin_expect}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='What is your expected error margin'
							/>
						</div>

						{/* customer support */}
						<div>
							<label htmlFor='amount'>Customer Staff Details</label>
							<input
								type='text'
								name='customer_support_staff'
								value={formData.customer_support_staff}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Customer support statff we can contact'
							/>
						</div>

						{/* greater demands */}
						<div>
							<label htmlFor='amount'>Price Adjustment</label>
							<input
								type='text'
								name='greater_demand'
								value={formData.greater_demand}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='When there is greater demands, How do you adjust your price'
							/>
						</div>

						{/* upload product catalogue*/}
						<div className='max-w-xl relative z-0'>
							<p>Upload your Product Catalogue</p>
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
									{img2 ? (
										<div className='flex items-center'>
											{/* <img
														src={URL.createObjectURL(file)}
														alt={file.name}
														className='w-8 h-8 object-cover rounded-full'
													/> */}
											<span className='font-medium text-gray-600'>
												{img2.name} is selected.{' '}
												<span
													className='text-blue-600 underline cursor-pointer'
													onClick={() => setImg2(null)}>
													Remove
												</span>
											</span>
										</div>
									) : (
										<span className='font-medium text-gray-600'>
											Drop files to Attach, or{' '}
											<span className='text-blue-600 underline'>browse</span>
										</span>
									)}
								</span>
								<input
									{...getInputProps3()}
									type='file'
									name='file_upload'
									className='hidden'
								/>
							</label>

							{/* Display the uploaded image */}
							{imageUrl2 && (
								<div className=' w-[5rem] aspect-square overflow-hidden bg-orange-500 absolute right-5 top-5'>
									<img
										src={`https://enicom.iccflifeskills.com.ng/uploads/${imageUrl2}`}
										alt={imageUrl2}
										className='w-full h-full object-cover'
									/>
								</div>
							)}

							{uploading2 && <p>Uploading image...</p>}
						</div>

						{/* button */}
						<div className='mt-5'>
							<button
								className='bg-greens px-14 py-2 rounded-lg text-white w-fit'
								onClick={handleUpload}>
								{isLoading ? 'Loading...' : 'Verify'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BussinessVerify;
