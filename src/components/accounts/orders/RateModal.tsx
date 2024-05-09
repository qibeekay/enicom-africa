'use client';
import { getProductReview, reviewProduct } from '@/api/products/products';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { HiChevronLeft, HiOutlineStar, HiStar } from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';
interface CartDetailsProps {
	handleOpen: () => void;
	productToken: string | null;
	productName: string | undefined;
	getReviews: () => void;
}

const RateModal: React.FC<CartDetailsProps> = ({
	handleOpen,
	productToken,
	productName,
	getReviews,
}) => {
	const [rating, setRating] = useState<number>(0);
	const [review, setReview] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};

	const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setReview(event.target.value);
	};

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	// create reviews
	const createReview = async () => {
		setLoading(true);
		try {
			await reviewProduct(
				`$${token}`,
				productToken,
				productName,
				rating,
				review,
				usertoken
			);
			toast.success('Review submitted successfully');
			getReviews();
			handleOpen();
		} catch (error) {
			toast.error('Error Adding a review, Please Try Again');
			// console.error('Error fetching products:', error);
		} finally {
			setLoading(false);
		}
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
				<p className='text-center text-2xl text-dark/50 my-4'>{rating}/5</p>

				<div className='w-full'>
					<p>Comment</p>
					<textarea
						name='review'
						id=''
						value={review}
						onChange={handleReviewChange}
						className='w-full border rounded-lg px-3 py-2 border-dark/50 h-[6rem] outline-none'></textarea>
				</div>
				<div className='flex justify-end'>
					<button
						className='bg-greens text-white px-4 py-2 mt-4 rounded-md w-[10rem]'
						onClick={createReview}>
						{loading ? 'Loading...' : 'Review'}
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default RateModal;
