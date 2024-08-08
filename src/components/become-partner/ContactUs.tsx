'use client';
import { FormProps, Navbar } from '..';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
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
import { Contact, Countries } from '@/api/finance/finance';

const ContactPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [phone, setPhone] = useState('');
	const [open, setOpen] = React.useState(false);
	const router = useRouter();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const [formData, setFormData] = useState({
		fullname: '',
		phone: '',
		mail: '',
		country: '',
		location: '',
		message: '',
	});

	const [countries, setCountries] = useState<{ name: string; code: string }[]>(
		[]
	);
	const [country, setCountry] = useState('');

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = event.target;

		if (type === 'text') {
			setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
		} else if (type === 'textarea') {
			setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		// Remove any non-numeric characters
		const newValue = inputValue.replace(/\D/g, '');
		setPhone(newValue);
	};

	const handleHome = () => {
		router.push('/');
	};

	console.log(country);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);

			if (!token) {
				toast.error('Authentication token is undefined');
				return;
			}

			const response = await Contact(
				{ ...formData, phone, country: country },
				`$${token}`
			);
			console.log('response:', response);

			if (response.status === true) {
				handleOpen();
			} else {
				toast.error('Failed to submit, please refresh and try again...');
			}
		} catch (error: any) {
		} finally {
			setIsLoading(false);
		}
	};

	const handleOpen = () => setOpen(!open);

	const fetchCountries = async () => {
		try {
			const fetchedCountries = await Countries(`$${token}`);
			console.log(fetchedCountries);
			setCountries(fetchedCountries);
		} catch (error) {
			console.log('error');
		}
	};

	useEffect(() => {
		fetchCountries();
	}, []);

	return (
		<div className='bg-bgGreen'>
			<Navbar />
			<div className=' px-4 lg:px-[4rem] mt-4rem]'>
				<div className='lg:w-[80%] xl:w-[60%]'>
					<h1 className='font-medium text-2xl'>Contact Us</h1>
					<p className='font-medium py-4'>
						Complete our contact us form to connect with one of our team to
						discuss your solar energy need.
					</p>
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

							<div className='mt-4'>
								<p className='text-dark/60 text-xs md:text-sm font-medium mt-1'>
									Gain access to a broad customer base through our Solar
									Marketplace by partnering with us.
								</p>
								<p className='text-dark/60 text-xs md:text-sm font-medium mt-2'>
									Complete this form to become an Enicom Installer, get verified
									and grow your business.
								</p>
							</div>

							<div className='mt-7'>
								<form className='grid gap-3' onSubmit={handleSubmit}>
									{/* first/last name */}
									<div className='flex flex-col sm:flex-row gap-y-3 gap-x-7 items-center'>
										{/* firstname */}
										<FormProps
											label='Full Name'
											id='fullname'
											name='fullname'
											labelId='fullNameLabel'
											type='text'
											value={formData.fullname}
											onChange={handleChange}
										/>
										<FormProps
											label='Email Address'
											name='mail'
											id='mail'
											labelId='emailLabel'
											type='mail'
											value={formData.mail}
											onChange={handleChange}
										/>
									</div>

									<div className='flex flex-col sm:flex-row gap-y-3 gap-x-7 items-center'>
										<FormProps
											label='Phone number'
											name='phone'
											id='phone'
											labelId='phoneLabel'
											type='text'
											value={phone}
											onChange={handleInputChange}
										/>
										<FormProps
											label='Location'
											name='location'
											id='location'
											labelId='locationLabel'
											type='text'
											value={formData.location}
											onChange={handleChange}
										/>
									</div>

									<div className='mt-2'>
										<Select label='Select Country'>
											{countries.map((country) => (
												<Option
													key={country.code}
													onClick={() => setCountry(country.name)}
													value={country.code}>
													{country.name}
												</Option>
											))}
										</Select>
									</div>

									<div className='w-full'>
										<p>Comment</p>
										<textarea
											name='message'
											id=''
											value={formData.message}
											onChange={handleChange}
											className='w-full border rounded-lg px-3 py-2 border-dark/50 h-[6rem] outline-none'></textarea>
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
				</div>
				<Dialog open={open} handler={handleOpen}>
					<DialogHeader>Thank you for contacting us</DialogHeader>
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

export default ContactPage;
