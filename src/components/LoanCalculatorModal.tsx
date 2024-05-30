'use client';
import { CalculateLoad } from '@/api/load/load';
import {
	Button,
	Input,
	Option,
	Select,
	Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
	HiChevronDown,
	HiChevronLeft,
	HiChevronUp,
	HiMiniStar,
} from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';

interface Appliance {
	name: string;
	watts: number;
	Qty: number;
	hours_per_day: number;
	days_per_week: number;
	type: string;
}
interface Response {
	inverterSize: number;
	inverterSize_th: string;
	inverter_unit: string;
	chargeControllerSize: number;
	chargeController_unit: string;
	numbersOfBatteriesInSeries: number;
	numbersOfBatteryInParallel: number;
	numbersOfControllerRequired: number;
	totalNumberOfPvModules: number;
	totalNumberOfBatteries: number;
	totalWeeklyLoad: number;
	totalWeeklyLoad_th: string;
	BatterySize: number;
	BatterySize_th: string;
	battery_unit: string;
	numberOfPvModules: number;
	recommendedPvModules: number;
	recommendedProducts: [
		{
			product_name: string;
			product_image: string;
			product_price: string;
			product_quantity: number;
			product_size: number;
		}
	];
	recommendedPV: {
		size: number;
		totalPv: number;
		min_calculateNumberOfModuleInParallel: number;
		min_calculateNumberOfModuleInSeries: number;
		calculateModuleCurrentInAmps: number;
	};
	PVRecommendations: [
		{
			size: number;
			totalPV: number;
			calculateNumberOfModuleInParallel: number;
			calculateNumberOfModuleInSeries: number;
			calculateModuleCurrentInAmps: number;
		}
	];
}

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
	const [loadItems, setLoadItems] = useState<Appliance[]>([]);
	const [response, setResponse] = useState<Response | null>(null);
	const [selectedName, setSelectedName] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [quantity, setQuantity] = useState<number>(0);
	const [watts, setWatts] = useState<number>(0);
	const [hoursPerDay, setHoursPerDay] = useState<number>(0);
	const [daysPerWeek, setDaysPerWeek] = useState<number>(0);
	const [showProduct, setShowProduct] = useState(false);
	const [showPv, setShowPv] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const toggleForm = () => {
		setFormVisible(!formVisible); // Toggle the visibility of the form
	};

	const togglePlan = () => {
		setShowProduct(!showProduct);
	};
	const togglePv = () => {
		setShowPv(!showPv);
	};

	const addAppliance = () => {
		// Add your validation logic if needed
		const newAppliance: Appliance = {
			name: selectedName,
			watts: watts,
			Qty: quantity,
			hours_per_day: hoursPerDay,
			days_per_week: daysPerWeek,
			type: type,
		};
		setLoadItems([...loadItems, newAppliance]);
		toggleForm(); // Close the form after adding an appliance
	};

	const resetForm = () => {
		setSelectedName('');
		setQuantity(0);
		setWatts(0);
		setHoursPerDay(0);
		setDaysPerWeek(0);
		setLoadItems([]);
	};

	// calculate loan
	const calculateLoad = async () => {
		setIsLoading(true);
		try {
			const responses = await CalculateLoad(`$${token}`, loadItems);
			// setLoansByToken(fetchedLoans);
			setResponse(responses.data);
			console.log(responses.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error('Error fetching products');
			console.error('Error fetching products:', error);
		}
	};

	return (
		<div className='w-full font-poppins text-dark'>
			<div className='bg-white rounded-lg shadows py-4 px-4 md:px-8 h-screen overflow-y-scroll'>
				{/* back */}
				<button
					className='flex items-center gap-4 cursor-pointer'
					onClick={handleOpen}>
					<HiChevronLeft />
					<p>Back</p>
				</button>

				{/* header */}
				<p className='text-center font-medium text-xl'>Load Calculator</p>

				{/* form */}
				{formVisible && (
					<form action='' className='mt-7'>
						<div className='grid grid-cols-2 gap-x-20 gap-y-5'>
							<div className='w-full'>
								<Typography className='mb-1 text-dark'>Appliance</Typography>
								<Select
									label='Select'
									value={selectedName}
									onChange={(e) => setSelectedName(e || '')}>
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
									onChange={(e) => setQuantity(parseInt(e.target.value))}
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
									onChange={(e) => setWatts(parseInt(e.target.value))}
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
									onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
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
									onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
								/>
							</div>

							<div className='w-full'>
								<Typography className='mb-1 text-dark'>Load type</Typography>
								<Select
									label='Select'
									value={type}
									onChange={(e) => setType(e || '')}>
									<Option value='DC'>DC</Option>
									<Option value='AC'>AC</Option>
								</Select>
							</div>
						</div>
						<div className='grid items-center justify-end mt-4'>
							<Button type='button' color='green' onClick={addAppliance}>
								Add Appliance
							</Button>
						</div>
					</form>
				)}

				<div
					className='w-full flex items-center gap-5 py-3 rounded-lg px-6 shadows bg-[#E4FEE3] text-lg font-medium cursor-pointer mt-10'
					onClick={toggleForm}>
					<AiOutlinePlusCircle size={25} />
					<p>
						{loadItems?.length === 0
							? 'Add Appliance'
							: 'Add Another Appliance'}
					</p>
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
							{loadItems?.map((item, index) => (
								<tr className='py-5' key={index}>
									<td className='px-4 py-2 flex items-center gap-4'>
										<p className='font-normal'>{item.name}</p>
									</td>
									<td className='px-4 py-2 text-center'>
										<p className='font-normal'>{item.watts}</p>
									</td>
									<td className='px-4 py-2 text-center'>
										<p className='font-normal'>{item.Qty}</p>
									</td>
									<td className='px-4 py-2 text-center'>
										<p className='font-normal'>{item.hours_per_day}</p>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='flex items-center justify-end mt-4 gap-4'>
					<Button type='submit' color='green' onClick={calculateLoad}>
						{isLoading ? 'Calculating...' : 'Calculate'}
					</Button>
					<Button
						type='submit'
						variant='outlined'
						color='green'
						onClick={resetForm}>
						Reset
					</Button>
				</div>

				{/* results displayed */}
				<div className='mt-10'>
					<div className='flex flex-col md:flex-row justify-between w-full bg-bgGreen text-dark p-4 rounded-lg'>
						<div className=''>
							{/* weekly load */}
							<div className='flex flex-col xs:flex-row xs:items-center gap-3'>
								{/* text */}
								<h1 className='font-semibold'>Total weekly load:</h1>

								{/* box */}
								<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
									<p>{response?.totalWeeklyLoad_th || '0'}W</p>
								</div>
							</div>

							{/* battery size */}
							<div className='flex flex-col xs:flex-row xs:items-center gap-3 mt-7'>
								{/* text */}
								<h1 className='text-sm sm:text-base font-semibold'>
									Battery Size:
								</h1>

								{/* box */}
								<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
									<p>
										{response?.BatterySize_th || '0'}
										{response?.battery_unit}
									</p>
								</div>
							</div>

							{/* battery number */}
							<div className='flex flex-col xs:flex-row xs:items-center gap-3 mt-7'>
								{/* text */}
								<h1 className='text-sm sm:text-base font-semibold'>
									Battery Number:
								</h1>

								{/* box */}
								<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
									<p>{response?.totalNumberOfBatteries || '0'}</p>
								</div>
							</div>

							{/* battery in series */}
							<div className='flex flex-col xs:flex-row xs:items-center gap-3 mt-7'>
								{/* text */}
								<h1 className='text-sm sm:text-base font-semibold'>
									Battery in Series:
								</h1>

								{/* box */}
								<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
									<p>{response?.numbersOfBatteriesInSeries || '0'}</p>
								</div>
							</div>
						</div>

						<div className=' '>
							{/* inverter size */}
							<div className='flex flex-col xs:flex-row xs:items-center mt-7 md:mt-0 md:justify-end gap-3'>
								{/* text */}
								<h1 className='text-sm sm:text-base font-semibold'>
									Inverter Size:
								</h1>

								{/* box */}
								<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
									<p>
										{response?.inverterSize_th || '0'}
										{response?.inverter_unit}
									</p>
								</div>
							</div>

							<div className='flex flex-col xs:flex-row xs:items-center md:justify-end gap-3 mt-7'>
								{/* text */}
								<h1 className='text-sm sm:text-base font-semibold'>
									Charge Controller:
								</h1>

								{/* box */}
								<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
									<p>
										{response?.chargeControllerSize || '0'}
										{response?.chargeController_unit}
									</p>
								</div>
							</div>

							{/* battery in parallel */}
							<div className='flex flex-col xs:flex-row xs:items-center md:justify-end gap-3 mt-7'>
								{/* text */}
								<h1 className='text-sm sm:text-base font-semibold'>
									Battery in parallel:
								</h1>

								{/* box */}
								<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
									<p>{response?.numbersOfBatteryInParallel || '0'}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='bg-bgGreen my-5 py-4 rounded-lg'>
						<p className='text-dark text-sm xs:text-base sm:text-lg font-semibold px-4'>
							Recommended PV
						</p>
						<div className='flex flex-col md:flex-row justify-between w-full text-dark p-4'>
							<div className=''>
								<div className='flex flex-col xs:flex-row xs:items-center md:mt-0 md:justify-start gap-3'>
									{/* text */}
									<h1 className='text-sm sm:text-base font-semibold'>
										Total PV:
									</h1>

									{/* box */}
									<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
										<p>{response?.recommendedPV?.totalPv || '0'}</p>
									</div>
								</div>

								<div className='mt-7'>
									<div className='flex flex-col xs:flex-row xs:items-center md:mt-0 md:justify-end gap-3'>
										{/* text */}
										<h1 className='text-sm sm:text-base font-semibold'>
											PV No's in parallel:
										</h1>

										{/* box */}
										<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
											<p>
												{response?.recommendedPV
													?.min_calculateNumberOfModuleInParallel || '0'}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className=''>
								<div className='flex flex-col xs:flex-row xs:items-center mt-7 md:mt-0 md:justify-end gap-3'>
									{/* text */}
									<h1 className='text-sm sm:text-base font-semibold'>
										PV Size:
									</h1>

									{/* box */}
									<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
										<p>{response?.recommendedPV?.size || '0'}</p>
									</div>
								</div>

								<div className='flex flex-col xs:flex-row xs:items-center mt-7 md:mt-7 md:justify-end gap-3'>
									{/* text */}
									<h1 className='text-sm sm:text-base font-semibold'>
										PV No's in series:
									</h1>

									{/* box */}
									<div className='text-dark bg-white grid items-center w-full xs:w-[5rem] py-1 px-3'>
										<p>
											{response?.recommendedPV
												?.min_calculateNumberOfModuleInSeries || '0'}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='mb-10'>
						{/* recommended pvs */}
						<div className='bg-bgGreen py-2 px-4 mt-5 rounded-lg'>
							<div
								className='cursor-pointer flex items-center justify-between'
								onClick={togglePv}>
								<p className=' text-dark text-sm xs:text-base sm:text-lg font-semibold'>
									PV Recommendations
								</p>

								{showPv ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showPv && (
								<div className='w-full mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7'>
									{response?.PVRecommendations?.map((pv, index) => (
										<div
											key={index}
											className='w-full flex flex-col items-center justify-center'>
											{/* img */}

											{/* name details */}
											<div className='flex gap-7'>
												<div className='flex flex-col'>
													<span className='font-semibold text-xs xs:text-sm'>
														Size:{' '}
													</span>
													<span className='font-semibold text-xs xs:text-sm'>
														Total PV:{' '}
													</span>
													<span className='font-semibold text-xs xs:text-sm'>
														Module Current:{' '}
													</span>
													<span className='font-semibold text-xs xs:text-sm'>
														PV No's in series
													</span>
													<span className='font-semibold text-xs xs:text-sm'>
														PV No's in parallel
													</span>
												</div>
												<div className='flex flex-col'>
													<p className=' text-dark text-xs xs:text-sm line-clamp-1 md:line-clamp-none'>
														{pv?.size}
													</p>
													<p className='text-dark text-xs xs:text-sm'>
														{pv?.totalPV}
													</p>
													<p className='text-dark text-xs xs:text-sm'>
														{pv?.calculateModuleCurrentInAmps}Amps
													</p>
													<p className='text-dark text-xs xs:text-sm'>
														{pv?.calculateNumberOfModuleInSeries}
													</p>
													<p className='text-dark text-xs xs:text-sm'>
														{pv?.calculateNumberOfModuleInParallel}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
						{/* recommended products */}
						<div className='bg-bgGreen py-2 px-4 rounded-lg my-5'>
							<div
								className='cursor-pointer flex items-center justify-between'
								onClick={togglePlan}>
								<p className=' text-dark text-sm xs:text-base sm:text-lg font-semibold'>
									View Recommended Products
								</p>

								{showProduct ? <HiChevronUp /> : <HiChevronDown />}
							</div>
							{showProduct && (
								<div className='mt-5'>
									{response?.recommendedProducts?.map((product, index) => (
										<div
											key={index}
											className='flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0'>
											{/* img */}
											<div className=' w-[7rem] aspect-square rounded-full overflow-hidden'>
												<img
													className='w-full h-full'
													src={product?.product_image}
													alt=''
												/>
											</div>

											{/* name details */}
											<div className='flex gap-7'>
												<div className='flex flex-col'>
													<span className='font-semibold text-sm'>Name: </span>
													<span className='font-semibold text-sm'>Price: </span>
													<span className='font-semibold text-sm'>
														Quantity:{' '}
													</span>
													<span className='font-semibold text-sm'>Size: </span>
												</div>
												<div className='flex flex-col'>
													<p className=' text-dark text-sm line-clamp-1 md:line-clamp-none'>
														{product?.product_name}
													</p>
													<p className='text-dark text-sm'>
														{product?.product_price}
													</p>
													<p className='text-dark text-sm'>
														{product?.product_quantity}
													</p>
													<p className='text-dark text-sm'>
														{product?.product_size}W
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
};

export default LoanCalculatorModal;
