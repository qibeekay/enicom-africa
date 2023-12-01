'use client';
import react, { FormEvent, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VerifyMail } from '@/app/verify-mail/route';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function Verify() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [otp, setOtp] = useState(['', '', '', '', '', '']);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const [mail, setMail] = useState<string>('');

	useEffect(() => {
		// Fetch mail from localStorage when the component mounts
		const storedMail = localStorage.getItem('mail');
		if (storedMail) {
			setMail(storedMail);
		}
	}, []);

	const router = useRouter();

	const inputRefs = [
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
	];

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const value = e.target.value;
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (index < 5 && value) {
			inputRefs[index + 1]?.current?.focus();
		}
		if (index > 0 && !value) {
			inputRefs[index - 1]?.current?.focus();
		}
	};

	const handleConfirmMail = async (event: FormEvent) => {
		event.preventDefault();
		const otpValue = otp.join(''); // Combine the OTP array into a single string
		try {
			setIsLoading(true);
			const response = await VerifyMail(
				{ mail: mail, otp: otpValue },
				`$${token}`
			);

			if (response.success === false) {
				// Handle failed verification (e.g., show an error message)
				toast.error(response.message || 'Unknown error');
			} else {
				// Handle successful verification (e.g., show a success message or navigate to a new page)
				toast.success('Verification successful');
				router.push('/dashboard');
			}
		} catch (error: any) {
			toast.error(error.message || 'Unknown error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full min-h-screen bg-bgGreen'>
			<div>
				{/* header */}
				<div className='py-7 px-10'>
					<Image src={'/logo.png'} width={150} height={150} alt='logo' />
				</div>

				<div className=' px-4 sm:w-[70%] md:w-[60%] mx-auto text-center mt-10'>
					<p className='font-semibold text-2xl text-greens'>Verify Account</p>
					<p className='text-sm mt-7'>
						We have sent you a verification Email. Confirm your account on your
						mail and start enjoying the benefits with us.
					</p>
					<form
						action=' '
						className='grid items-center justify-center'
						onSubmit={handleConfirmMail}>
						<div className='flex items-center justify-end w-full gap-2 sm:gap-5 md:gap-10'>
							{otp.map((value, index) => (
								<input
									key={index}
									className='mt-2 bg-white text-dark outline-none py-2 px-2 rounded-lg w-[2.5rem] sm:w-[3.5rem] md:w-[4rem] xs:aspect-square text-center xs:text-xl'
									type='text'
									value={value}
									onChange={(e) => handleInputChange(e, index)}
									ref={inputRefs[index]}
									maxLength={1}
								/>
							))}
						</div>
						<button className='w-full xs:w-[60%] mx-auto mt-7 bg-greens  py-2 px-5 rounded-lg text-white text-center cursor-pointer'>
							{isLoading ? 'Verifying...' : 'Confirm Mail'}
						</button>
					</form>

					{/* <p className='text-center flex gap-4 items-center justify-center text-sm mt-10'>
						Not Received Mail yet?{' '}
						<Link href={'/login'} className='text-greens text-sm font-semibold'>
							Resend Mail
						</Link>
					</p> */}
				</div>
				<ToastContainer autoClose={1000} />
			</div>
		</div>
	);
}
