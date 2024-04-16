'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { searchProducts } from '@/api/products/products';
import { DasboardNav, MenuDrawer } from '@/components';

interface Product {
	// Define the structure of your product data
	product_name: string;
	product_price: string;
	product_image: string;
	product_token: string;
	// Add other properties as needed
}

const SearchPage = () => {
	const [searchResults, setSearchResults] = useState<Product[]>([]);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const [loading, setLoading] = useState(false);
	const [openRight, setOpenRight] = React.useState(false);

	// Access the search query parameter

	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('searchQuery');

	const router = useRouter();

	// send query to the api and get response
	useEffect(() => {
		const fetchSearchResults = async () => {
			setLoading(true);
			try {
				if (searchQuery && searchQuery.trim() !== '') {
					const results = await searchProducts(`$${token}`, searchQuery);
					setSearchResults(results);
				}
			} catch (error) {
				console.error('Error fetching search results:', error);
				// Handle error if needed
			} finally {
				setLoading(false);
			}
		};

		fetchSearchResults();
	}, [searchQuery]);

	// view details about a product
	const handleDetailsClick = (productToken: string | null) => {
		// Programmatically navigate to the DetailsItems page with the product token as a query parameter
		router.push(`/details?producttoken=${productToken}`);
	};

	return (
		<div>
			<DasboardNav openRight={() => setOpenRight(true)} />
			<div className='relative py-10'>
				<div className='px-[4rem]'>
					<h1 className='pb-5 text-lg font-bold'>Search Results</h1>
					{loading && <p>Loading...</p>}
					{!loading && searchResults.length === 0 && <p>No results found.</p>}
					{!loading && searchResults.length > 0 && (
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center'>
							{searchResults?.map((result, index) => (
								<div
									key={index}
									className='rounded-xl w-[11rem] hover:shadow-lg hover:bg-white cursor-pointer px-2'
									onClick={() => handleDetailsClick(result?.product_token)}>
									<div className='w-full rounded-xl overflow-hidden h-[7rem]'>
										<img
											className='w-full h-full object-cover'
											src={result?.product_image}
											alt=''
										/>
									</div>

									{/* text */}
									<div className='px-2'>
										<p className='my-2 text-dark line-clamp-3'>
											{result?.product_name}
										</p>
										<h1 className='mb-4 font-semibold text-lg text-dark'>
											N{result?.product_price}
										</h1>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />
		</div>
	);
};

export default SearchPage;
