'use client';
import { requestInstaller } from '@/api/installer/installer';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import Datepicker from 'react-tailwindcss-datepicker';
import { getUser } from '@/api/products/products';

interface UploadResponse {
	success: boolean;
	message: string;
	data?: {
		image: string;
	};
	status_code?: number;
}
const RequestInstallerDetails = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [value1, setValue1] = useState({
		startDate: null,
		endDate: null,
	});

	const [value2, setValue2] = useState({
		startDate: null,
		endDate: null,
	});

	const handleValueChange1 = (newValue: any) => {
		// console.log('newValue:', newValue);
		setValue1(newValue);
	};

	const handleValueChange2 = (newValue1: any) => {
		// console.log('newValue1:', newValue1);
		setValue2(newValue1);
	};

	// console.log(value1, '-', value2);

	// console.log(customString);

	// auth token
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		address: '',
		phone: '',
		state: '',
		image: 'empty',
		desc: '',
		preferred_installation_date: '',
		usertoken: usertoken,
	});

	const resetForm = () => {
		setFormData({
			name: '',
			email: '',
			address: '',
			phone: '',
			state: '',
			image: 'empty',
			desc: '',
			preferred_installation_date: '',
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

	// console.log('custom string1', customString1);

	const handleRequest = async (event: FormEvent) => {
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
			const customString = `${value1.startDate} - ${value2.startDate}` || '';

			// const profileImage = imageUrl || '';

			const response = await requestInstaller(
				{
					...formData,
					// image: null,
					preferred_installation_date: customString,
					usertoken: userToken,
				},
				`$${token}`
			);

			console.log('Request response:', response);

			if (response.success === true) {
				toast.success('Request Submitted, You will be notified when Approved');
				resetForm();
				// router.push('/verify-mail');
			} else {
				toast.error(response.message || 'Failed to request');
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to request');
		} finally {
			setIsLoading(false);
		}
	};

	// const getuser = async () => {
	// 	try {
	// 		const getusers = await getUser(`$${token}`, `${usertoken}`);
	// 		// setStatus(getusers.is_verified_seller);
	// 	} catch (error) {
	// 		// console.error('Error fetching cart items:', error);
	// 		console.log('error');
	// 	}
	// };

	// useEffect(() => {
	// 	getuser();
	// }, []);

	return (
		<div className='w-full h-screen overflow-scroll text-dark no-scrollbar font-poppins'>
			<div className='bg-white w-full rounded-lg py-5 px-4 xs:px-7'>
				<form action=''>
					<div className='flex flex-col gap-6'>
						{/* fullname */}
						<div>
							<label htmlFor='name'>Full Name</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* email */}
						<div>
							<label htmlFor='email'>Email</label>
							<input
								type='text'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* phone */}
						<div>
							<label htmlFor='phone'>Phone Number</label>
							<input
								type='text'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* state */}
						<div>
							<label htmlFor='state'>State</label>
							<input
								type='text'
								name='state'
								value={formData.state}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* desc */}
						<div className='w-full'>
							<label htmlFor='desc'>Full Intallation Description</label>
							<textarea
								name='desc'
								value={formData.desc}
								onChange={handleChange}
								placeholder='Type Here...'
								className='w-full border rounded-lg px-3 py-2 border-dark/50 h-[6rem] mt-2 outline-none'></textarea>
						</div>

						{/* address */}
						<div>
							<label htmlFor='address'>Address</label>
							<input
								type='text'
								name='address'
								value={formData.address}
								onChange={handleChange}
								className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
								placeholder='Type here'
							/>
						</div>

						{/* preferred installation date */}
						<div className='flex items-center gap-2 flex-col sm:flex-row'>
							<Datepicker
								useRange={false}
								asSingle={true}
								placeholder={'Start Date'}
								value={value1}
								inputClassName='w-full rounded-md focus:ring-0 font-normal border border-dark px-4 py-2'
								toggleClassName='absolute bg-greens rounded-r-lg text-white right-0 h-full px-4 py-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
								onChange={handleValueChange1}
								primaryColor={'green'}
								showShortcuts={false}
							/>

							<Datepicker
								useRange={false}
								asSingle={true}
								placeholder={'End Date'}
								value={value2}
								inputClassName='w-full rounded-md focus:ring-0 font-normal border border-dark px-4 py-2'
								toggleClassName='absolute bg-greens rounded-r-lg text-white right-0 h-full px-4 py-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
								onChange={handleValueChange2}
								primaryColor={'green'}
								showShortcuts={false}
							/>
						</div>

						{/* button */}
						<div className='mt-5'>
							<button
								className='bg-greens px-14 py-2 rounded-lg text-white w-fit'
								onClick={handleRequest}>
								{isLoading ? 'Requesting...' : 'Request'}
							</button>
						</div>
					</div>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};

export default RequestInstallerDetails;
