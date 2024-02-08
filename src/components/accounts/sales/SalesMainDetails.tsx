'use client';
import React, { FormEvent, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { LiaSearchSolid } from 'react-icons/lia';
import SalesTab1 from './SalesTab1';
import SalesTab2 from './SalesTab2';
import SalesTab3 from './SalesTab3';
import Link from 'next/link';
import { useTabContext } from '@/components/TabContext';
import { useRouter } from 'next/navigation';

const SalesMainDetails = () => {
	const { setTab } = useTabContext();
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('1');
	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const upload = (e: FormEvent) => {
		e.preventDefault();
		router.push('/sellers');
	};

	return (
		<div className='w-full h-screen overflow-scroll text-dark no-scrollbar font-poppins'>
			<div className='flex flex-col gap-y-7'>
				{/* delivery search */}
				<div className='bg-white w-full rounded-lg py-5 px-4 xs:px-7'>
					{/* list */}
					<div className='flex justify-between sm:items-center flex-col sm:flex-row'>
						<div className='flex gap-4 flex-wrap md:gap-x-16 items-center'>
							<button
								onClick={() => handleTabClick('1')}
								className={` ${
									activeTab === '1' ? 'font-semibold text-lg' : ''
								}`}>
								All
							</button>
							<button
								onClick={() => handleTabClick('2')}
								className={` ${
									activeTab === '2' ? 'font-semibold text-lg' : ''
								}`}>
								Sold <span>(1)</span>
							</button>
							<button
								onClick={() => handleTabClick('3')}
								className={` ${
									activeTab === '3' ? 'font-semibold text-lg' : ''
								}`}>
								Posted <span>(1)</span>
							</button>
						</div>

						<div className='mt-4 sm:mt-0'>
							<button
								className='bg-greens w-full rounded-lg text-white py-3 px-5 text-center text-sm'
								onClick={upload}>
								Upload Product
							</button>
						</div>
					</div>

					{/* search */}
					<div className='w-full xl:w-[70%] mt-9 mb-4'>
						{/* order */}
						<div className='border border-dark/50 bg-white text-dark flex items-center w-full rounded-lg overflow-hidden'>
							<div className='flex items-center sm:gap-7 px-3 border-r border-dark/50'>
								<p className='text-[10px] sm:text-base'>Sales</p>
								<HiChevronDown />
							</div>

							<div className='w-full px-3'>
								<input
									type='text'
									placeholder='Order ID, Product or Store Name'
									className='w-full outline-none bg-transparent placeholder:text-dark placeholder:text-[10px] sm:placeholder:text-base'
								/>
							</div>
							<div className='text-white bg-greens h-full py-2 w-[5.5rem] grid items-center justify-center'>
								<LiaSearchSolid size={32} />
							</div>
						</div>
					</div>
				</div>

				<div className=' w-full'>
					{activeTab === '1' && <SalesTab1 />}
					{activeTab === '2' && <SalesTab2 />}
					{activeTab === '3' && <SalesTab3 />}
				</div>
			</div>
		</div>
	);
};

export default SalesMainDetails;
