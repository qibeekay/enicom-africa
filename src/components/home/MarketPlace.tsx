'use client';
import React, { useEffect, useState } from 'react';
import { Categories, StoreBaterries } from '..';
import { useRouter } from 'next/navigation';
import { getAllProduct } from '@/api/products/products';

// Define types for your data
interface Product {
	product_name: string;
	product_price_th: string;
	product_image: string;
	// Add other properties as needed
}

interface Category {
	category: string;
	products: Product[];
}

const MarketPlace = () => {
	const router = useRouter();

	const handleStore = () => {
		router.push('/store');
	};
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const fetchedCategories = (await getAllProduct(`$${token}`)) || [];
			setCategories(fetchedCategories);
		};

		fetchCategories();
	}, [token]);
	return (
		<div className='pt-[50rem] ms:pt-[33rem] mss:pt-[15rem] text-dark font-poppins'>
			<div>
				<div>
					<h1 className='text-center text-4xl font-semibold mb-4'>
						Our Marketplace
					</h1>
					<p className='text-center'>
						Our bank partners help create various plans for credit facilities to
						ease your financial burdens
					</p>

					<div className='bg-white ms:px-[4rem] shadow my-10'>
						<Categories />
					</div>

					<div className='px-4 lg:px-[4rem]'>
						{/* Render sliders for all available categories */}
						{categories.map((category, index) => (
							<div key={index} className='max-w-6xl mx-auto px-4'>
								{/* <h1 className='text-xl font-medium'>{category.category}</h1> */}
								<StoreBaterries category={category.category} />
							</div>
						))}
					</div>

					<div className='grid items-center justify-center'>
						<div
							className='bg-greens text-white w-[10rem] grid items-center justify-center py-2 rounded cursor-pointer'
							onClick={handleStore}>
							<p>Start Shopping</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MarketPlace;
