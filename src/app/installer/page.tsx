import { Navbar } from '@/components';

export default function Installer() {
	return (
		<div className='w-full font-poppins text-dark'>
			<div className='relative'>
				{/* <div className=' absolute w-full h-screen bg-[#011D00]/60 z-0'></div> */}
				<div className='relative z-10 py-[2.5rem]'>
					{/* nav bar */}
					<Navbar />

					{/* Information */}
					<div>
						<h1 className='font-bold text-3xl my-10 px-4 md:px-[4rem]'>
							Installers
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
