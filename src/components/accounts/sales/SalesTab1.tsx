'use client';
import { getAllApprovedProduct } from '@/api/products/products';
import { Spinner } from '@material-tailwind/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Product {
	// Define the structure of your product data
	product_name: string;
	product_price: string;
	product_image: string;
	created_on: string;
	// Add other properties as needed
}

const SalesTab1 = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(true);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	// Fetch mail from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const fetchedProducts = await getAllApprovedProduct(
				`$${token}`,
				`${usertoken}`
			);
			console.log('Fetched Products:', fetchedProducts);
			setProducts(fetchedProducts);
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

	// console.log(products);
	// console.log(usertoken);
	return (
		<div>
			{/* product */}
			<div className=' w-full rounded-lg'>
				{/* order id */}
				<div className='w-full flex justify-between'>
					<p className='text-lg font-semibold'>Approved Products</p>
				</div>
				{loading && <Spinner className='h-4 w-4' />}
				<div className='mt-2 flex flex-col gap-7'>
					{products.map((product, index) => (
						<div
							key={index}
							className='bg-white py-5 px-4 xs:px-7 flex flex-col sm:flex-row gap-4 text-dark rounded-xl'>
							{/* image */}
							<div>
								<div className='overflow-hidden w-[10rem] aspect-[2/1.5] rounded-xl'>
									<img
										className='w-full h-full object-cover'
										src={product.product_image}
										alt=''
									/>
								</div>
							</div>

							{/* text */}
							<div className='w-full'>
								{/* name / order id*/}
								<div className='flex justify-between'>
									{/* name */}
									<p>{product.product_name}</p>
								</div>

								{/* price */}
								<div className='flex flex-col md:flex-row md:items-center justify-between'>
									<h1 className='text-xl font-semibold'>
										{product.product_price}
									</h1>
									<div>
										<Link href={''} className='underline text-dark'>
											Rate Product
										</Link>
									</div>
								</div>

								{/* delivery status */}
								<p className=' text-lg font-medium text-greens mt-4'>Sold</p>

								{/* due date / details */}
								<div className='flex flex-col md:flex-row justify-between md:items-center'>
									<p className='text-sm font-medium text-dark/60'>
										{product.created_on}
									</p>

									{/* View Details */}
									<div>
										<Link href={''} className='underline text-dark'>
											View Details
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SalesTab1;
