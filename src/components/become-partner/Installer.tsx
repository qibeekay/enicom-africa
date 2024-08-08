'use client';
import { FormProps, Navbar } from '..';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Option,
	Select,
} from '@material-tailwind/react';
import { Installer } from '@/api/finance/finance';

const FinanceInstaller = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [phone, setPhone] = useState('');
	const [value1, setValue1] = useState<string>('');
	const [value2, setValue2] = useState<string>('');
	const [open, setOpen] = React.useState(false);
	const router = useRouter();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		mail: '',
		phone: '',
		address: '',
		company: '',
		city: '',
		state: '',
		company_reg_year: '',
		specialty: '',
		services: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		// Remove any non-numeric characters
		const newValue = inputValue.replace(/\D/g, '');
		setPhone(newValue);
	};

	const handleQuestion = (selectedValue: React.SetStateAction<string>) => {
		setValue1(selectedValue);
	};

	const handleQuestion1 = (selectedValue: React.SetStateAction<string>) => {
		setValue2(selectedValue);
	};

	const handleHome = () => {
		router.push('/');
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		for (const field in formData) {
			if (formData[field as keyof typeof formData] === '') {
				if (
					field !== 'phone' &&
					field !== 'services' &&
					field !== 'specialty'
				) {
					toast.error(`${field} cannot be empty`);
					return;
				}
			}
		}

		try {
			setIsLoading(true);

			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			const response = await Installer(
				{ ...formData, phone, specialty: value1, services: value2 },
				`$${token}`
			);
			console.log('response:', response);

			if (response.success === true) {
				handleOpen();
			} else {
				toast.error('Failed to submit, please refresh and try again...');
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to register');
		} finally {
			setIsLoading(false);
		}
	};

	const handleOpen = () => setOpen(!open);

	return (
		<div className='bg-bgGreen'>
			<Navbar />
			<div className=' px-4 lg:px-[4rem] mt-4rem]'>
				<div className='lg:w-[80%] xl:w-[60%]'>
					<h1 className='font-medium text-2xl'>Installer</h1>
					<p className='font-medium py-4'>
						Gain access to a broad customer base through our Solar Marketplace
						by partnering with us.
					</p>
					<p className='font-medium'>
						Complete this form to become an Enicom Installer, get verified and
						grow your business.
					</p>
				</div>
			</div>
			<div className='w-full min-h-screen bg-bgGreen py-10 flex flex-col items-center justify-center'>
				<div className='bg-white w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%] py-7 px-4 sm:p-7 rounded-3xl mx-auto text-dark'>
					{/* form-container */}
					<div>
						{/* header */}
						<div className='flex justify-between'>
							{/* logo */}
							<div
								className=' h-5 w-20 xs:h-6 xs:w-25 sm:w-28 cursor-pointer'
								onClick={() => router.push('/')}>
								<Image
									src={'/logo.png'}
									width={100}
									height={100}
									className='h-full w-full'
									alt='logo'
								/>
							</div>

							{/* text */}
							<div className='text-right'>
								<p className='text-greens text-sm sm:text-base font-semibold'>
									Get Started
								</p>
							</div>
						</div>

						<div className='mt-7'>
							<form className='grid gap-3' onSubmit={handleSubmit}>
								{/* first/last name */}
								<div className='flex flex-col sm:flex-row gap-y-3 gap-x-7 items-center'>
									{/* firstname */}
									<FormProps
										label='First Name'
										id='firstName'
										name='fname'
										labelId='firstNameLabel'
										type='text'
										value={formData.fname}
										onChange={handleChange}
									/>
									<FormProps
										label='Last Name'
										id='lastName'
										name='lname'
										labelId='lastNameLabel'
										type='text'
										value={formData.lname}
										onChange={handleChange}
									/>
								</div>

								<div className='flex flex-col sm:flex-row gap-y-3 gap-x-7 items-center'>
									<FormProps
										label='Email Address'
										name='mail'
										id='email'
										labelId='emailLabel'
										type='email'
										value={formData.mail}
										onChange={handleChange}
									/>
									<FormProps
										label='Phone number'
										name='phone'
										id='phone'
										labelId='phoneLabel'
										type='text'
										value={phone}
										onChange={handleInputChange}
									/>
								</div>

								<div className='flex flex-col sm:flex-row gap-y-3 gap-x-7 items-center'>
									<FormProps
										label='Address'
										name='address'
										id='address'
										labelId='addressLabel'
										type='text'
										value={formData.address}
										onChange={handleChange}
									/>
									<FormProps
										label='City'
										name='city'
										id='city'
										labelId='cityLabel'
										type='text'
										value={formData.city}
										onChange={handleChange}
									/>
								</div>

								<div className='flex flex-col sm:flex-row gap-y-3 gap-x-7 items-center'>
									<FormProps
										label='State'
										name='state'
										id='state'
										labelId='stateLabel'
										type='text'
										value={formData.state}
										onChange={handleChange}
									/>
									<FormProps
										label='Company Name'
										name='company'
										id='company'
										labelId='companyLabel'
										type='text'
										value={formData.company}
										onChange={handleChange}
									/>
								</div>

								<FormProps
									label='Company registration year'
									name='company_reg_year'
									id='company_reg_year'
									labelId='companyRegYearLabel'
									type='text'
									value={formData.company_reg_year}
									onChange={handleChange}
								/>

								<div className='mt-2'>
									<Select
										size='lg'
										label='What type of solar systems do you specialize in'
										selected={(element) => {
											const selectedValue = element?.props.value;
											handleQuestion(selectedValue);
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
											value='Residential'
											className='flex items-center gap-2'>
											Residential
										</Option>
										<Option
											value='Commercial'
											className='flex items-center gap-2'>
											Commercial
										</Option>
									</Select>
								</div>
								<div className='mt-2'>
									<Select
										size='lg'
										label='What type of Solar service do you offer'
										selected={(element) => {
											const selectedValue = element?.props.value;
											handleQuestion1(selectedValue);
											return (
												element &&
												React.cloneElement(element, {
													disabled: true,
													className:
														'flex items-center opacity-100 px-0 gap-2 pointer-events-none',
												})
											);
										}}>
										<Option value='Design' className='flex items-center gap-2'>
											Design
										</Option>
										<Option
											value='Installation'
											className='flex items-center gap-2'>
											Installation
										</Option>
										<Option
											value='Operations and Maintenance'
											className='flex items-center gap-2'>
											Operations and Maintenance
										</Option>
										<Option value='Roofing' className='flex items-center gap-2'>
											Roofing
										</Option>
										<Option
											value='Electrical'
											className='flex items-center gap-2'>
											Electrical
										</Option>
									</Select>
								</div>

								<div className='w-full xs:w-[70%] mx-auto mt-5'>
									<button className=' bg-greens w-full py-2 px-5 rounded-lg text-white'>
										{isLoading ? 'Submitting...' : 'Submit'}
									</button>
								</div>
							</form>
						</div>
					</div>
					<ToastContainer autoClose={1000} />
				</div>
				<Dialog open={open} handler={handleOpen}>
					<DialogHeader>
						Thank you for your interest in partnering with Enicom! Your
						application has been successfully submitted.
					</DialogHeader>
					<DialogBody>
						<p>
							Our team will review your information and get back to you within
							48hrs.
						</p>
						<p>
							If you have any questions in the meantime, please don't hesitate
							to contact us at enicom.africa@yahoo.com/0810000000
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
		</div>
	);
};

export default FinanceInstaller;
