'use client';
import {
	Card,
	Input,
	Option,
	Select,
	Typography,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiChevronLeft, HiMiniStar } from 'react-icons/hi2';

interface CartDetailsProps {
	handleOpen: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
}

const CartModal: React.FC<CartDetailsProps> = ({ handleOpen }) => {
	const TABLE_HEAD = ['Name', 'Phone Number', 'Installation Price', 'Rating'];
	const TABLE_ROWS = [
		{
			name: 'Senator oooo',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator ooo',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator oo',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator o',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator oooo0',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator oooo1',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator ooo2',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator oo3',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator o4',
			phone: '09087646577',
			price: '50,000',
		},
		{
			name: 'Senator oooo05',
			phone: '09087646577',
			price: '50,000',
		},
	];

	const router = useRouter();

	const handlepage = () => {
		router.push('/purchase');
	};
	return (
		<div className='w-full'>
			<div className='bg-white rounded-lg shadows py-4 px-1 md:px-8 h-screen overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={handleOpen}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				{/* header */}
				<p className='text-center font-medium text-xl'>Our Engineers</p>

				{/* form */}
				<div className='w-full mt-5'>
					<p className='px-4'>Type of Installation Location</p>
					<form action='' className='w-full px-4 mt-2'>
						<div className='flex flex-col lg:flex-row lg:items-center gap-5 w-full'>
							{/* state */}
							<div className=''>
								<Select
									label='State'
									className='bg-greens/5 border-greens/5 text-dark w-full'
									labelProps={{
										// className: 'before:content-none after:content-none',
										className: '!text-dark',
									}}>
									<Option>Material Tailwind HTML</Option>
									<Option>Material Tailwind React</Option>
									<Option>Material Tailwind Vue</Option>
									<Option>Material Tailwind Angular</Option>
									<Option>Material Tailwind Svelte</Option>
								</Select>
							</div>

							{/* Local Government */}
							<div className=' lg:w-full'>
								<Select
									label='Local Government'
									className='bg-greens/5 border-greens/5 text-dark w-full'
									labelProps={{
										// className: 'before:content-none after:content-none',
										className: '!text-dark',
									}}>
									<Option>Material Tailwind HTML</Option>
									<Option>Material Tailwind React</Option>
									<Option>Material Tailwind Vue</Option>
									<Option>Material Tailwind Angular</Option>
									<Option>Material Tailwind Svelte</Option>
								</Select>
							</div>

							{/* Address */}
							<div className='lg:w-full'>
								<Input
									size='md'
									label='Type Address'
									// placeholder='name@mail.com'
									className='  focus:!border-t-greens/5 !bg-greens/5 !border-greens/5 !text-dark w-full'
									labelProps={{
										// className: 'before:content-none after:content-none',
										className: '!text-dark',
									}}
									crossOrigin={undefined}
								/>
							</div>

							{/* search */}
							<div className='bg-greens/5 text-dark rounded-lg p-1.5 w-fit'>
								<AiOutlineSearch size='30' />
							</div>
						</div>
					</form>
				</div>

				{/* engineer list */}
				<div className='w-full overflow-scroll '>
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
										Phone Number
									</p>
								</th>
								<th className=' p-4'>
									<p
										// color='blue-gray'
										className='font-normal leading-none opacity-70'>
										Installation Price
									</p>
								</th>
								<th className=' p-4'>
									<p
										// color='blue-gray'
										className='font-normal leading-none opacity-70 text-right'>
										Rating
									</p>
								</th>
							</tr>
						</thead>
						<tbody className=''>
							{TABLE_ROWS.map(({ name, phone, price }, index) => (
								<tr
									key={index}
									className='odd:bg-greens/5 hover:bg-greens hover:text-white cursor-pointer'
									onClick={handlepage}>
									<td className='px-4 py-2 flex items-center gap-4'>
										<div className=' w-[2rem] aspect-square overflow-hidden rounded-full'>
											<img
												className='w-full h-full object-cover object-center'
												src='/img.png'
												alt=''
											/>
										</div>
										<p className='font-normal'>{name}</p>
									</td>
									<td className='px-4 py-2'>
										<p className='font-normal'>{phone}</p>
									</td>
									<td className='px-4 py-2 text-center'>
										<p className='font-normal'>{price}</p>
									</td>
									<td className='px-4 py-2 grid justify-end'>
										<div className='flex gap-1 text-[#D49901] py-1'>
											<HiMiniStar />
											<HiMiniStar />
											<HiMiniStar />
											<HiMiniStar />
											<HiMiniStar />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
