'use client';
import {
	Button,
	Input,
	Option,
	Select,
	Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiChevronLeft, HiMiniStar } from 'react-icons/hi2';

interface CartDetailsProps {
	handleOpen: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
}

const appliances = [
	'Refrigerator',
	'Television',
	'Washing Machine',
	'Light Bulbs (LED)',
	'Laptop',
	'Air Conditioner',
	'Pressing Iron',
	'Standing Fan',
	'Pumping Machine',
	'Water Dispenser',
	'Home Theater',
	'Electric Heaters',
	'Water Heaters',
];

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
									{appliances.map((appliance, index) => (
										<Option key={index} value={appliance}>
											{appliance}
										</Option>
									))}
								</Select>
							</div>
							<div className='w-full'>
								<Typography className='mb-1 text-dark'>Quantity</Typography>
								<Input
									size='lg'
									placeholder=''
									type='number'
									className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
									labelProps={{
										className: 'before:content-none after:content-none',
									}}
									crossOrigin={undefined}
								/>
							</div>
							<div className='w-full'>
								<Typography className='mb-1 text-dark'>
									Loads in watts
								</Typography>
								<Input
									size='lg'
									type='number'
									placeholder=''
									className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
									labelProps={{
										className: 'before:content-none after:content-none',
									}}
									crossOrigin={undefined}
								/>
							</div>
							<div className='w-full'>
								<Typography className='mb-1 text-dark'>
									Period of use per day (in hours)
								</Typography>
								<Input
									size='lg'
									type='number'
									placeholder=''
									className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
									labelProps={{
										className: 'before:content-none after:content-none',
									}}
									crossOrigin={undefined}
								/>
							</div>

							<div className='w-full'>
								<Typography className='mb-1 text-dark'>
									Period of use per week (in days)
								</Typography>
								<Input
									size='lg'
									type='number'
									placeholder=''
									className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
									labelProps={{
										className: 'before:content-none after:content-none',
									}}
									crossOrigin={undefined}
								/>
							</div>

							<div className='w-full'>
								<Typography className='mb-1 text-dark'>Load type</Typography>
								<Select label='Select'>
									<Option>DC</Option>
									<Option>AC</Option>
								</Select>
							</div>
						</div>
						<div className='grid items-center justify-end mt-4'>
							<Button type='submit' color='green'>
								Add Appliance
							</Button>
						</div>
					</form>
				)}

				<div
					className='w-full flex items-center gap-5 py-3 rounded-lg px-6 shadows bg-[#E4FEE3] text-lg font-medium cursor-pointer mt-10'
					onClick={toggleForm}>
					<AiOutlinePlusCircle size={25} />
					<p>Add another Appliance</p>
				</div>

				{/* table */}
				<div className='w-full overflow-scroll '>
					<table className='w-full min-w-max table-auto text-left mt-7'>
						<thead className=''>
							<tr className='bg-greens/5'>
								<th className='py-5 px-4'>
									<p
										// color='blue-gray'
										className='font-normal leading-none opacity-70'>
										Appliances
									</p>
								</th>
								<th className=' p-4 text-center'>
									<p
										// color='blue-gray'
										className='font-normal leading-none opacity-70'>
										Load (watts)
									</p>
								</th>
								<th className=' text-center'>
									<p
										// color='blue-gray'
										className='font-normal leading-none opacity-70'>
										Quantity
									</p>
								</th>
								<th className=' p-4'>
									<p
										// color='blue-gray'
										className='font-normal leading-none opacity-70 text-center'>
										Usage (hr)
									</p>
								</th>
							</tr>
						</thead>
						<tbody className=''>
							<tr className='py-5'>
								<td className='px-4 py-2 flex items-center gap-4'>
									<p className='font-normal'>Laptop</p>
								</td>
								<td className='px-4 py-2 text-center'>
									<p className='font-normal'>40</p>
								</td>
								<td className='px-4 py-2 text-center'>
									<p className='font-normal'>1</p>
								</td>
								<td className='px-4 py-2 text-center'>
									<p className='font-normal'>7</p>
								</td>
							</tr>
						</tbody>
					</table>
					<div className=' grid items-center justify-end py-5 bg-greens/5 '>
						<p>Total Watt Hours Daily:</p>
					</div>
				</div>

				<div className='flex items-center justify-end mt-4 gap-4'>
					<Button type='submit' color='green'>
						Calculate
					</Button>
					<Button type='submit' variant='outlined' color='green'>
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoanCalculatorModal;
