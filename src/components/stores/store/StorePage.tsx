'use client';
import { getAllProduct, getUser } from '@/api/products/products';
import { DasboardNav, MenuDrawer, StoreBaterries } from '@/components';
import LoanCalculatorModal from '@/components/LoanCalculatorModal';
import React, { useEffect, useState } from 'react';
import { IoIosCalculator } from 'react-icons/io';
import { MdLiveHelp } from 'react-icons/md';
import { Dialog } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

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

const StorePage = () => {
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const fetchedCategories = (await getAllProduct(`$${token}`)) || [];
			setCategories(fetchedCategories);
		};

		fetchCategories();
	}, [token]);

	const [openRight, setOpenRight] = React.useState(false);

	const router = useRouter();

	const [open1, setOpen1] = React.useState(false);
	const handleOpen1 = () => setOpen1((cur) => !cur);

	return (
		<React.Fragment>
			<DasboardNav openRight={() => setOpenRight(true)} />

			{/* calculate load */}
			<div className='max-w-6xl mx-auto px-4 my-5'>
				<div className='flex flex-col sm:flex-row sm:items-center'>
					<h1 className='text-left text-2xl font-medium'>Store</h1>

					<div className='w-full grid items-center justify-center'>
						<div
							className='bg-greens rounded flex items-center justify-center text-white w-full px-10 md:w-[30rem] lg:w-[40rem] py-1 gap-5 cursor-pointer'
							onClick={handleOpen1}>
							<IoIosCalculator size={45} />
							<p>Calculate your load</p>
						</div>
					</div>
				</div>
			</div>

			{/* Render sliders for all available categories */}
			{categories.map((category, index) => (
				<div key={index} className='max-w-6xl mx-auto px-4'>
					<h1 className='text-xl font-medium'>{category.category}</h1>
					<StoreBaterries category={category.category} />
				</div>
			))}

			{/* absolute */}
			<div className='fixed right-10 z-50 bottom-10 cursor-pointer text-greens '>
				<MdLiveHelp size={45} />
			</div>

			<MenuDrawer openRight={openRight} setOpenRight={setOpenRight} />

			<Dialog
				size='lg'
				open={open1}
				handler={handleOpen1}
				className='bg-transparent shadow-none text-dark'>
				<LoanCalculatorModal handleOpen={handleOpen1} />
			</Dialog>
		</React.Fragment>
	);
};

export default StorePage;
