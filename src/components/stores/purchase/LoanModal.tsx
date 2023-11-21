import Link from 'next/link';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiChevronLeft } from 'react-icons/hi2';

interface CartDetailsProps {
	handleOpen1: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
}

const LoanModal: React.FC<CartDetailsProps> = ({ handleOpen1 }) => {
	return (
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-1 md:px-8 h-screen overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={handleOpen1}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				{/* search */}
				<div className='flex items-center gap-4  border py-2 px-10 rounded-lg my-7'>
					<AiOutlineSearch />
					<input
						type='text'
						placeholder='Search Bank'
						className='w-full outline-none'
					/>
				</div>

				<div className='grid md:grid-cols-2 gap-x-[10rem] gap-y-5 ml-10'>
					{/* grid */}
					<Link href={'/loan-plan'} className='flex  items-center gap-4 '>
						{/* img */}
						<div className='w-[2rem] aspect-square'>
							<img
								className='w-full h-full overflow-hidden'
								src='/img.png'
								alt=''
							/>
						</div>

						<p>Guaranty Trust Bank</p>
					</Link>
					<div className='flex  items-center gap-4 '>
						{/* img */}
						<div className='w-[2rem] aspect-square'>
							<img
								className='w-full h-full overflow-hidden'
								src='/img.png'
								alt=''
							/>
						</div>

						<p>Guaranty Trust Bank</p>
					</div>
					<div className='flex  items-center gap-4 '>
						{/* img */}
						<div className='w-[2rem] aspect-square'>
							<img
								className='w-full h-full overflow-hidden'
								src='/img.png'
								alt=''
							/>
						</div>

						<p>Guaranty Trust Bank</p>
					</div>
					<div className='flex  items-center gap-4 '>
						{/* img */}
						<div className='w-[2rem] aspect-square'>
							<img
								className='w-full h-full overflow-hidden'
								src='/img.png'
								alt=''
							/>
						</div>

						<p>Guaranty Trust Bank</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanModal;
