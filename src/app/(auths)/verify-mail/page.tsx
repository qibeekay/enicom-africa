import Image from 'next/image';
import Link from 'next/link';

export default function Verify() {
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
					<div className='w-full xs:w-[60%] mx-auto mt-7 bg-greens  py-2 px-5 rounded-lg text-white text-center cursor-pointer'>
						<p>Confirm Mail</p>
					</div>

					<p className='text-center flex gap-4 items-center justify-center text-sm mt-10'>
						Not Received Mail yet?{' '}
						<Link href={'/login'} className='text-greens text-sm font-semibold'>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
