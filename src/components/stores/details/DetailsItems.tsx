'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCart } from 'react-icons/bs';
import { HiChevronRight, HiMiniStar, HiOutlineStar } from 'react-icons/hi2';
import {
	Select,
	Option,
	Input,
	Typography,
	Dialog,
	Spinner,
} from '@material-tailwind/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProductByToken, getProductReview } from '@/api/products/products';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '@/components/CartContext';
import { DecreaseCartItems, IncreaseCartItems } from '@/api/cart/cart';
import RateModal from '@/components/accounts/orders/RateModal';

interface Product {
	product_name: string;
	poduct_price_th: string;
	product_price: string;
	product_image: string;
	product_token: string;
	product_desc: string;
	product_type: string;
	product_owner: string;
	product_condition: string;
	product_quantity: number;
	maximum_quantity: number;
}

interface Reviews {
	review_id: number;
	reviewer_name: string;
	ratings: 1 | 2 | 3 | 4 | 5; // Assertion for ratings within the range of 1 to 5
	review: string;
	created_at: string;
}

const DetailsItems = () => {
	const [productsByToken, setProductsByToken] = useState<Product | null>(null);
	const [reviews, setReviews] = useState<Reviews[]>([]);
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { addToCart, fetchCartItem } = useCart();
	const [showAllReviews, setShowAllReviews] = useState(false);
	const searchParams = useSearchParams();
	// Access the query parameter
	const productToken = searchParams.get('producttoken');

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const handlePurchase = () => {
		router.push('/cart');
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const fetchedProducts = await getProductByToken(
				`$${token}`,
				`${productToken}`
			);
			setProductsByToken(fetchedProducts);
			setLoaded(true);
		} catch (error) {
			toast.error('Error fetching products');
			console.error('Error fetching products:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	console.log(productsByToken);

	const handleAddToCart = async () => {
		if (productsByToken) {
			addToCart(productsByToken);
		} else {
			console.error('Product data is null. Unable to add to cart.');
			// Optionally, you can provide user feedback here, such as displaying a message.
		}
	};

	// get reviews
	const getReview = async () => {
		setLoading(true);
		try {
			const reviews = await getProductReview(`$${token}`, `${productToken}`);
			setReviews(reviews);
		} catch (error) {
			// toast.error('Error fetching products');
			console.error('Error fetching products:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getReview();
	}, []);

	// Initialize an object to store the count of ratings for each value (1 to 5)
	const ratingsCount: Record<1 | 2 | 3 | 4 | 5, number> = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};

	// Calculate the count of ratings for each value
	reviews?.forEach((review) => {
		ratingsCount[review?.ratings]++;
	});

	// Initialize a variable to store the total sum of ratings
	let totalRatingsSum = 0;

	// Calculate the total sum of ratings
	reviews?.forEach((review) => {
		totalRatingsSum += review?.ratings;
	});

	// Calculate the total average of ratings
	const totalAverageRating =
		reviews?.length > 0 ? totalRatingsSum / reviews?.length : 0;

	return (
		<div className='font-poppins my-10'>
			<div className='max-w-6xl px-4 mx-auto'>
				{/* flex */}
				<div className='flex flex-col lg:flex-row gap-6'>
					{/* item */}
					<div className='w-full flex flex-col gap-y-6'>
						{/* items info */}
						<div className='bg-white shadows rounded-lg p-4 w-full'>
							<div className='flex flex-col md:flex-row gap-5'>
								{/* image */}
								<div className='sm:w-[20rem] md:w-[50%]'>
									{/* img */}
									<div className=' w-full rounded-lg h-auto overflow-hidden'>
										<img
											className='w-full'
											src={productsByToken?.product_image}
											alt=''
										/>
									</div>

									{/* Add to Cart */}
									<div className='mt-5'>
										<button
											className='py-2 bg-[#222222] w-full text-white rounded-md flex gap-4 items-center justify-center cursor-pointer'
											onClick={handleAddToCart}>
											<BsCart size='20' />
											Add to Cart
										</button>
									</div>

									{/* Add to Cart */}
									<div className='mt-5'>
										<button
											className='py-2 border bg-white border-[#222222] w-full text-dark rounded-md flex gap-4 items-center justify-center cursor-pointer'
											onClick={handleOpen}>
											{/* <BsCart size='20' /> */}
											Add Review
										</button>
									</div>
								</div>

								<div className='w-full'>
									<div>
										<p className=' text-dark'>
											{productsByToken?.product_name}
										</p>
										<p className='text-dark text-xl font-semibold '>
											{productsByToken?.product_price}
										</p>
									</div>
									<div className='my-2 text-dark text-sm md:text-base'>
										<p className='flex gap-4 text-sm md:text-base'>
											Description:
											<span>{productsByToken?.product_desc}</span>
										</p>
									</div>
									<div className='text-sm md:text-base'>
										<p className='flex gap-4 text-sm md:text-base'>
											Condition:
											<span>{productsByToken?.product_condition}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* feedbacks */}
				<div className='flex flex-col lg:flex-row gap-10 mt-6'>
					{loading ? (
						<div className='px-4'>
							<Spinner className='h-4 w-4' />
						</div>
					) : reviews?.length === 0 ? (
						<div className='px-4 mt-7'>
							No reviews available for the product currently.
						</div>
					) : (
						<div className='bg-white shadows rounded-lg p-4 w-full'>
							<div className='flex flex-col md:flex-row gap-5'>
								{/* image */}
								<div className='sm:w-[20rem] md:w-[50%]'>
									<h1 className=' font-medium text-dark'>
										Customer feedback ({reviews?.length})
									</h1>
									{/* img */}
									<div className=' w-full rounded-lg h-[9rem] bg-greens/20 grid items-center justify-center mt-2'>
										<div className='grid items-center justify-center text-center'>
											<h1 className=' text-3xl font-semibold text-[#D49901]'>
												{totalAverageRating.toFixed(1)}/5
											</h1>
											<div className='flex gap-1 py-1'>
												{Array.from({ length: 5 }, (_, index) => (
													<HiMiniStar
														key={index}
														size={20}
														className={`text-${
															index < Math.floor(totalAverageRating)
																? '[#D49901]'
																: 'gray-700'
														}`}
													/>
												))}
											</div>
											<p>{reviews?.length} Ratings</p>
										</div>
									</div>

									{/* rating */}
									<div className='mt-6 grid gap-y-2'>
										{[...Array(5)].map((_, index) => (
											<div
												key={index}
												className='flex justify-between items-center'>
												<p className='w-[50%]'>
													{5 - index} (
													{ratingsCount[(5 - index) as 1 | 2 | 3 | 4 | 5]})
												</p>
												<div className='relative w-full'>
													<div className='h-2 w-full bg-greens/20'></div>
													<div
														className={`h-2 bg-greens absolute top-0 w-full`}
														style={{
															width: `${
																(ratingsCount[
																	(5 - index) as 1 | 2 | 3 | 4 | 5
																] /
																	reviews?.length) *
																100
															}%`,
														}}></div>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className='w-full'>
									<div className='flex mb-1 flex-col sm:flex-row sm:items-center justify-between'>
										<p className='text-sm md:text-base'>
											Comments from our customers
										</p>
										<div
											className='text-greens gap-1 text-base flex items-center md:gap-3 cursor-pointer'
											onClick={() => setShowAllReviews(!showAllReviews)}>
											{showAllReviews ? 'See Less' : 'See All'}
											<HiChevronRight size='20' />
										</div>
									</div>

									{/* comment */}
									<div className='grid gap-y-3'>
										{reviews
											?.slice(0, showAllReviews ? reviews.length : 3)
											.map((review, index) => (
												<div
													key={index}
													className='mt-1 h-fit bg-greens/5 text-dark rounded-lg p-4 grid '>
													{/* c */}
													<div>
														<div className='flex items-center gap-2'>
															<p className=' font-medium'>
																{review?.ratings}/5
															</p>
															{/* Render stars dynamically based on the rating */}

															<div className='flex gap-1 py-1'>
																{Array.from({ length: 5 }, (_, index) => (
																	<HiMiniStar
																		key={index}
																		size={15}
																		className={`text-${
																			index < Math.floor(review?.ratings)
																				? '[#D49901]'
																				: 'gray-700'
																		}`}
																	/>
																))}
															</div>
														</div>
														<p className='mt-1 text-sm md:text-base'>
															{review?.review}
														</p>
													</div>

													<p className='mt-3 text-sm md:text-base text-dark/50'>
														{review?.created_at} by {review?.reviewer_name}
													</p>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					)}

					<div className='hidden md:block w-[45%]'></div>
				</div>

				<Dialog
					size='lg'
					open={open}
					handler={handleOpen}
					className='bg-transparent shadow-none text-dark'>
					<RateModal
						handleOpen={handleOpen}
						productToken={productToken}
						productName={productsByToken?.product_name}
						getReviews={getReview}
					/>
				</Dialog>
				<ToastContainer />
			</div>
		</div>
	);
};

export default DetailsItems;
