'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCart } from 'react-icons/bs';
import { HiChevronRight, HiMiniStar, HiOutlineStar } from 'react-icons/hi2';
import { Select, Option, Input, Typography } from '@material-tailwind/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProductByToken } from '@/api/products/products';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from '@/api/cart/cart';
import { useCart } from '@/components/CartContext';

interface Product {
	// Define the structure of your product data
	product_name: string;
	product_price: string;
	product_image: string;
	product_token: string;
	product_desc: string;
	// Add other properties as needed
}

const DetailsItems = () => {
	const [productsByToken, setProductsByToken] = useState<Product | null>(null);
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { addToCart } = useCart();
	const searchParams = useSearchParams();
	// Access the query parameter
	const productToken = searchParams.get('producttoken');
	const usertoken = localStorage.getItem('usertoken');

	const handlePurchase = () => {
		router.push('/cart');
	};

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
									<div className=' w-full rounded-lg h-[9rem] overflow-hidden'>
										<img
											className='w-full h-full object-cover'
											src={productsByToken?.product_image}
											alt=''
										/>
									</div>

									{/* increment */}
									<div className='flex justify-between items-center my-4'>
										{/* - */}
										<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl'>
											<p>-</p>
										</div>

										{/* 1 */}
										<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white'>
											<p>1</p>
										</div>

										{/* + */}
										<div className='bg-greens rounded w-[2rem] h-[2rem] grid items-center justify-center text-white text-2xl'>
											<p>+</p>
										</div>
									</div>

									{/* purchase */}
									<div className='mt-6'>
										<button
											className='py-2 bg-greens w-full text-white rounded-md'
											onClick={handlePurchase}>
											Purchase
										</button>
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
										<p>By Sdelaide Ventures</p>
										<p className='flex gap-4 my-3'>
											Capacity:{' '}
											<span>
												Lorem ipsum dolor sit amet consectetur, adipisicing
												elit. Voluptatum ullam nobis fugit consectetur debitis
												similique.
											</span>
										</p>

										<p>Delivery: 10 - 15 days after request</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* buttons */}
					<div className=' sm:w-[20rem] md:w-[45%] bg-white shadows rounded-lg h-fit p-4'>
						<p className=' text-lg font-medium'>Deliveries</p>

						<form action='' className='mt-2'>
							<div className='grid gap-y-2'>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>State</Typography>
									<Select label='Select'>
										<Option>Material Tailwind HTML</Option>
										<Option>Material Tailwind React</Option>
										<Option>Material Tailwind Vue</Option>
										<Option>Material Tailwind Angular</Option>
										<Option>Material Tailwind Svelte</Option>
									</Select>
								</div>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>
										Local Government
									</Typography>
									<Select label='Select'>
										<Option>Material Tailwind HTML</Option>
										<Option>Material Tailwind React</Option>
										<Option>Material Tailwind Vue</Option>
										<Option>Material Tailwind Angular</Option>
										<Option>Material Tailwind Svelte</Option>
									</Select>
								</div>
								<div className='w-full'>
									<Typography className='mb-1 text-dark'>Address</Typography>
									<Input
										size='lg'
										placeholder='name@mail.com'
										className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
										labelProps={{
											className: 'before:content-none after:content-none',
										}}
										crossOrigin={undefined}
									/>
								</div>
							</div>
						</form>

						<div className='flex items-center gap-5 text-dark mt-4 mb-2'>
							<p>Delivery</p>
							<p className='font-semibold text-lg'>N10,000</p>
						</div>
					</div>
				</div>

				{/* feedbacks */}
				<div className='flex flex-col lg:flex-row gap-10 mt-6'>
					<div className='bg-white shadows rounded-lg p-4 w-full'>
						<div className='flex flex-col md:flex-row gap-5'>
							{/* image */}
							<div className='sm:w-[20rem] md:w-[50%]'>
								<h1 className=' font-medium text-dark'>
									Customer feedback (500)
								</h1>
								{/* img */}
								<div className=' w-full rounded-lg h-[9rem] bg-greens/20 grid items-center justify-center mt-2'>
									<div className='grid items-center justify-center text-center'>
										<h1 className=' text-3xl font-semibold text-[#D49901]'>
											5/5
										</h1>
										<div className='flex gap-1 text-[#D49901] py-1'>
											<HiMiniStar />
											<HiMiniStar />
											<HiMiniStar />
											<HiMiniStar />
											<HiMiniStar />
										</div>
										<p>500 Ratings</p>
									</div>
								</div>

								{/* rating */}
								<div className='mt-6 grid gap-y-2'>
									{/* 5/5 */}
									<div className=' flex justify-between items-center'>
										<p className='w-[50%]'>5 (500)</p>
										<div className='relative w-full'>
											<div className='h-2 w-full bg-greens/20'></div>
											<div className='h-2 w-full bg-greens absolute top-0'></div>
										</div>
									</div>

									{/* 4/5 */}
									<div className=' flex justify-between items-center'>
										<p className='w-[50%]'>4 (0)</p>
										<div className='relative w-full'>
											<div className='h-2 w-full bg-greens/20'></div>
											<div className='h-2 w-[70%] bg-greens absolute top-0'></div>
										</div>
									</div>

									{/* 3/5 */}
									<div className=' flex justify-between items-center'>
										<p className='w-[50%]'>3 (0)</p>
										<div className='relative w-full'>
											<div className='h-2 w-full bg-greens/20'></div>
											<div className='h-2 w-[20%] bg-greens absolute top-0'></div>
										</div>
									</div>

									{/* 2/5 */}
									<div className=' flex justify-between items-center'>
										<p className='w-[50%]'>2 (0)</p>
										<div className='relative w-full'>
											<div className='h-2 w-full bg-greens/20'></div>
											<div className='h-2 w-0 bg-greens absolute top-0'></div>
										</div>
									</div>

									{/* 1/5 */}
									<div className=' flex justify-between items-center'>
										<p className='w-[50%]'>1 (0)</p>
										<div className='relative w-full'>
											<div className='h-2 w-full bg-greens/20'></div>
											<div className='h-2 w-0 bg-greens absolute top-0'></div>
										</div>
									</div>
								</div>
							</div>

							<div className='w-full'>
								<div className='flex mb-1 flex-col sm:flex-row sm:items-center justify-between'>
									<p className='text-sm md:text-base'>
										Comments from our customers
									</p>
									<Link
										href={''}
										className='text-greens gap-1 text-base flex items-center md:gap-3'>
										See More
										<HiChevronRight size='20' />
									</Link>
								</div>

								{/* comment */}
								<div className='grid gap-y-3'>
									<div className='mt-1 h-fit bg-greens/5 text-dark rounded-lg p-4 grid '>
										{/* c */}
										<div>
											<div className='flex items-center gap-2'>
												<p className=' font-medium'>5/5</p>
												<div className='flex gap-1 text-[#D49901] py-1'>
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
												</div>
											</div>
											<p className='mt-1 text-sm md:text-base'>
												I enjoyed the product very much, and the installation
												was top notch
											</p>
										</div>

										<p className='mt-3 text-sm md:text-base text-dark/50'>
											01-11-2022 by Timothy
										</p>
									</div>

									{/* comment-2 */}
									<div className='mt-2 h-fit bg-greens/5 text-dark rounded-lg p-4 grid '>
										{/* c */}
										<div>
											<div className='flex items-center gap-2'>
												<p className=' font-medium'>5/5</p>
												<div className='flex gap-1 text-[#D49901] py-1'>
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
												</div>
											</div>
											<p className='mt-1 text-sm md:text-base'>
												I enjoyed the product very much, and the installation
												was top notch
											</p>
										</div>

										<p className='mt-3 text-sm md:text-base text-dark/50'>
											01-11-2022 by Timothy
										</p>
									</div>

									{/* comment-3 */}
									<div className='mt-2 h-fit bg-greens/5 text-dark rounded-lg p-4 grid '>
										{/* c */}
										<div>
											<div className='flex items-center gap-2'>
												<p className=' font-medium'>5/5</p>
												<div className='flex gap-1 text-[#D49901] py-1'>
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
													<HiMiniStar />
												</div>
											</div>
											<p className='mt-1 text-sm md:text-base'>
												I enjoyed the product very much, and the installation
												was top notch
											</p>
										</div>

										<p className='mt-3 text-sm md:text-base text-dark/50'>
											01-11-2022 by Timothy
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='hidden md:block w-[45%]'></div>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
};

export default DetailsItems;
