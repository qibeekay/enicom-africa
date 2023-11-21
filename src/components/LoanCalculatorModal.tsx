'use client';
import { Input, Option, Select, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiChevronLeft } from 'react-icons/hi2';

interface CartDetailsProps {
	handleOpen: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
}

const LoanCalculatorModal: React.FC<CartDetailsProps> = ({ handleOpen }) => {
	const [formVisible, setFormVisible] = useState(false);

	const toggleForm = () => {
		setFormVisible(!formVisible); // Toggle the visibility of the form
	};

	return (
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-1 md:px-8 h-screen overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={handleOpen}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				{/* header */}
				<p className='text-center font-medium text-xl'>Loan Calculator</p>

				{/* form */}
				{formVisible && (
					<form action='' className='mt-7'>
						<div className='grid grid-cols-2 gap-x-20 gap-y-5'>
							<div className='w-full'>
								<Typography className='mb-1 text-dark'>Appliance</Typography>
								<Select label='Select'>
									<Option>Material Tailwind HTML</Option>
									<Option>Material Tailwind React</Option>
									<Option>Material Tailwind Vue</Option>
									<Option>Material Tailwind Angular</Option>
									<Option>Material Tailwind Svelte</Option>
								</Select>
							</div>
							<div className='w-full'>
								<Typography className='mb-1 text-dark'>Quantity</Typography>
								<Input
									size='lg'
									placeholder=''
									className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
									labelProps={{
										className: 'before:content-none after:content-none',
									}}
									crossOrigin={undefined}
								/>
							</div>
							<div className='w-full'>
								<Typography className='mb-1 text-dark'>Load</Typography>
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
									Period of Use
								</Typography>
								<Select label='Select'>
									<Option>Material Tailwind HTML</Option>
									<Option>Material Tailwind React</Option>
									<Option>Material Tailwind Vue</Option>
									<Option>Material Tailwind Angular</Option>
									<Option>Material Tailwind Svelte</Option>
								</Select>
							</div>
						</div>
					</form>
				)}

				<div
					className='w-full flex items-center gap-5 py-3 rounded-lg px-6 shadows bg-[#E4FEE3] text-lg font-medium cursor-pointer mt-10'
					onClick={toggleForm}>
					<AiOutlinePlusCircle size={25} />
					<p>Add another Appliance</p>
				</div>
			</div>
		</div>
	);
};

export default LoanCalculatorModal;
