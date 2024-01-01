'use client';
import { getAllProductAdmin } from '@/api/products/products';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Product {
	// Define the structure of your product data
	product_name: string;
	product_price: string;
	product_image: string;
	created_on: string;
	product_status: string;
	// Add other properties as needed
}

const OverviewTab3 = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const fetchProducts = async () => {
		try {
			const fetchedProducts = await getAllProductAdmin(`$${token}`);
			console.log('Fetched Products:', fetchedProducts);
			setProducts(fetchedProducts);
		} catch (error) {
			toast.error('Error fetching products');
			console.error('Error fetching products:', error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	console.log(products);
	return (
		<div>
			<div className='w-full overflow-scroll'>
				<table className='w-full min-w-max table-auto text-left'>
					<thead className=''>
						<tr>
							<th className='py-7 px-4'>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70'>
									Name
								</p>
							</th>
							<th className=' p-4'>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70'>
									Product
								</p>
							</th>
							<th className=' p-4'>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70'>
									Capacity
								</p>
							</th>
							<th className=' p-4'>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70 text-right'>
									Amount
								</p>
							</th>
							<th className=' p-4'>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70 text-right'>
									Status
								</p>
							</th>
							<th className=' p-4'>
								<p
									// color='blue-gray'
									className='font-normal leading-none opacity-70 text-right'>
									Time
								</p>
							</th>
						</tr>
					</thead>
					<tbody className=''>
						{products.map((product, index) => (
							<tr
								key={index}
								className='odd:bg-greens/5 hover:bg-greens hover:text-white cursor-pointer'>
								<td className='px-4 py-2'>
									<p className='font-normal'>{product.product_name}</p>
								</td>
								<td className='px-4 py-2 text-center'>
									<p className='font-normal'></p>
								</td>
								<td className='px-4 py-2 text-center'>
									<p className='font-normal'></p>
								</td>
								<td className='px-4 py-2 text-right'>
									<p className='font-normal'>{product.product_price}</p>
								</td>
								<td className='px-4 py-2 text-right'>
									<p className='font-normal'>{product.product_status}</p>
								</td>
								<td className='px-4 py-2 text-right'>
									<p className='font-normal'>{product.created_on}</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OverviewTab3;
