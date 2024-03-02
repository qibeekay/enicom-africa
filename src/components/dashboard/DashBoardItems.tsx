'use client';
import { getAllOrders } from '@/api/products/products';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { LiaSearchSolid } from 'react-icons/lia';

interface Order {
	product_name: string;
	product_price: string;
	product_quantity: string;
	product_token: string;
	order_status: string;
	order_token: string;
	product_image: string;
	date_purchased: string;
}
const DashBoardItems = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const fetchOrders = async () => {
		try {
			const fetchedOrders = await getAllOrders(
				`$${token}`,
				selectedFilter,
				usertoken
			);
			// console.log('Fetched Sellers:', fetchedOrders);
			setOrders(fetchedOrders);
		} catch (error) {
			// toast.error('Error fetching products');
			console.error('Error fetching sellers:', error);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, [selectedFilter]); // Call fetchSellers whenever selectedFilter changes

	// console.log(orders);

	return (
		<div className='mt-4 text-dark'>
			<div>
				{/* Orders on delivery */}
				<div className='flex gap-x-7 items-center py-5 flex-wrap font-medium md:text-lg text-dark/60'>
					<button
						onClick={() => setSelectedFilter(null)}
						className={`cursor-pointer ${
							selectedFilter === null ? 'text-greens' : 'text-dark'
						}`}>
						All Orders
					</button>
					<button
						onClick={() => setSelectedFilter('0')}
						className={`cursor-pointer ${
							selectedFilter === '0' ? 'text-greens' : 'text-dark'
						}`}>
						Pending Orders
					</button>
					<button
						onClick={() => setSelectedFilter('1')}
						className={`cursor-pointer ${
							selectedFilter === '1' ? 'text-greens' : 'text-dark'
						}`}>
						Delivered Orders
					</button>
				</div>

				{/* search */}
				<div className='flex flex-col md:flex-row md:items-center gap-4'>
					{/* order */}
					<div className='border border-dark/50 bg-white text-dark flex items-center w-full rounded-lg overflow-hidden'>
						<div className='flex items-center gap-4 md:gap-7 px-3 border-r border-dark/50'>
							<p>Order</p>
							<HiChevronDown />
						</div>

						<div className='w-full px-3'>
							<input
								type='text'
								placeholder='Order ID, Product or Store Name'
								className='w-full outline-none bg-transparent placeholder:text-dark placeholder:text-[12px] md:placeholder:text-base'
							/>
						</div>
						<div className='text-white bg-greens h-full py-2 w-[5.5rem] grid items-center justify-center'>
							<LiaSearchSolid size={32} />
						</div>
					</div>

					{/* last day */}
					<Link
						href={'/request-installer'}
						className='bg-greens/5 hover:bg-greens hover:text-white ease-in-out duration-300 w-[30%] grid items-center justify-center py-3 rounded-lg'>
						Request Installer
					</Link>
				</div>
				{/* grid container*/}
				<div className='grid gap-y-5 mt-4'>
					{/* items */}
					{orders.length === 0 ? (
						<p>No current orders</p>
					) : (
						orders.map((order, index) => (
							<div key={index}>
								<p className='flex items-center gap-4 text-dark'>
									{order?.date_purchased}
								</p>

								<div className='mt-2'>
									<div className='flex flex-col md:flex-row gap-4 bg-greens/5 text-dark p-4 rounded-xl'>
										{/* image */}
										<div>
											<div className='overflow-hidden w-[10rem] aspect-[2/1.5] rounded-xl'>
												<img
													className='w-full h-full object-cover'
													src={order.product_image}
													alt={order.product_name}
												/>
											</div>
										</div>

										{/* text */}
										<div className='w-full'>
											{/* name / order id*/}
											<div className='flex flex-col-reverse sm:flex-row justify-between'>
												{/* name */}
												<p>{order.product_name}</p>
												{/* order id */}
												<p>Order ID: {order.order_token}</p>
											</div>

											{/* price */}
											<h1 className='text-xl font-semibold'>
												N{order.product_price}
											</h1>

											{/* delivery status */}
											<p className=' text-lg font-medium text-[#FD0F0F] mt-4'>
												{order.order_status}
											</p>

											{/* due date / details */}
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default DashBoardItems;
