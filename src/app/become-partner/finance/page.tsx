import { Footer, Navbar } from '@/components';
import Link from 'next/link';

export default function FinancePartner() {
	return (
		<div>
			<Navbar />
			<div className='py-[4rem] px-4 lg:px-[4rem]'>
				<h1 className='text-2xl font-medium'>Finance Partner</h1>
				<p className='py-4 font-medium'>
					Thank you for your interest in partnering with Enicom to provide
					financing solutions for solar energy projects. We are excited about
					the possibility of collaborating with you.
				</p>
				<p>Please contact us our Finance Relations Team:</p>
				<div>
					<p className='text-lg font-medium'>Finance Relations Contact</p>
					<p>Eniola Benson</p>
					<p>Head of Finance Relations, Enicom</p>
					<p className='flex items-center gap-4'>
						Email:{' '}
						<Link
							href={'mailTo:enicom.africa@yahoo.com'}
							className='text-greens'>
							enicom.africa@yahoo.com
						</Link>
					</p>
				</div>
			</div>

			<Footer />
		</div>
	);
}
