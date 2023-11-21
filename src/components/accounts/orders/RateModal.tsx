'use client';
import React, { useState } from 'react';
import { HiChevronLeft, HiOutlineStar, HiStar } from 'react-icons/hi2';
interface CartDetailsProps {
	handleOpen: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
}
const RateModal: React.FC<CartDetailsProps> = ({ handleOpen }) => {
	const [rating, setRating] = useState<number>(0);

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};
	return (
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-1 md:px-8 h-auto overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={handleOpen}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				{/* header */}
				<p className='text-center font-medium text-xl'>Rate</p>
				<div className='flex items-center justify-between px-5'>
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							onClick={() => handleRatingChange(star)}
							className={`cursor-pointer ${
								star <= rating ? 'text-[#D49901]' : 'text-dark'
							}`}>
							{star <= rating ? (
								<HiStar size={45} />
							) : (
								<HiOutlineStar size={45} />
							)}
						</span>
					))}
				</div>
				<p className='text-center text-2xl text-dark/50 my-4'>0/5</p>

				<div className='w-full'>
					<p>Comment</p>
					<textarea
						name=''
						id=''
						className='w-full border rounded-lg px-3 py-2 border-dark/50 h-[6rem] outline-none'></textarea>
				</div>
				<div className='flex justify-end'>
					<button
						className='bg-greens text-white px-4 py-2 mt-4 rounded-md w-[10rem]'
						onClick={handleOpen}>
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default RateModal;
