import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { BsBell } from 'react-icons/bs';

const OverviewMain = () => {
	return (
		<div className=''>
			<div className=''>
				{/* nav */}
				<div className='flex items-center justify-between w-full py-4 bg-white pr-10 pl-4'>
					{/* search */}
					<div className='flex items-center gap-4 bg-greens/5 rounded px-4 py-2 w-[50%]'>
						{/* icon */}
						<FiSearch />
						{/* input */}
						<input
							type='text'
							className='border-none outline-none bg-transparent'
							placeholder='Search anything'
						/>
					</div>

					{/* profile */}
					<div className='flex items-center gap-10'>
						{/* notify */}
						<div className='text-greens relative'>
							<BsBell size={25} />
							{/* div */}
							<div className='w-2 aspect-square rounded-full bg-red-700 absolute bottom-0 right-0'></div>
						</div>

						{/* user */}
						<div className='flex items-center gap-4'>
							<h1>Welcome, Jenner</h1>

							{/* image */}
							<div className='w-10 aspect-square overflow-hidden rounded-full'>
								<img className='w-full h-full object-cover' src='' alt='' />
							</div>
						</div>
					</div>
				</div>

				<div className=' bg-[#eeeeee] w-full pr-10 pl-4'>
					{/* overview */}
					<div>
						<div className='flex items-center justify-between py-2'>
							<h1>Quick Overview</h1>

							<div className='bg-white flex items-center gap-4 py-1 px-3 rounded-lg'>
								<div className='w-4 aspect-square'>
									<img className='w-full h-full' src='/filter.png' alt='' />
								</div>
								<h1>Filter by Date</h1>
							</div>
						</div>

						<div className='flex gap-5 items-center justify-center flex-wrap'>
							{/* total Customer */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/users.png' alt='' />
									</div>

									{/* icon 2 */}
									<div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div>
								</div>
								{/* text */}
								<p className='pt-1 pb-2'>Total Customers</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#3592FF] font-semibold'>
									1,000,000
								</h1>
							</div>

							{/* Total Disbursement */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/bag.png' alt='' />
									</div>

									{/* icon 2 */}
									<div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div>
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Disbursement</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#BB07FA] font-semibold'>
									$1,000,000
								</h1>
							</div>

							{/* Total Inflow */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/down.png' alt='' />
									</div>

									{/* icon 2 */}
									<div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div>
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Inflow</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#04C223] font-semibold'>
									$1,000,000
								</h1>
							</div>

							{/* Total Outflow */}
							<div className='bg-white shadows rounded-lg px-4 py-2 w-[14rem]'>
								{/* icon */}
								<div className='flex justify-between items-center'>
									{/* icon 1 */}
									<div className='w-7 aspect-square'>
										<img className='w-full h-full' src='/up.png' alt='' />
									</div>

									{/* icon 2 */}
									<div className='w-4 aspect-square'>
										<img className='w-full h-full' src='/hide.png' alt='' />
									</div>
								</div>
								{/* text */}
								<p className='pt-1 pb-2'> Total Outflow</p>

								{/* numbers */}
								<h1 className=' text-2xl text-[#FF4040] font-semibold'>
									$1,000,000
								</h1>
							</div>
						</div>
					</div>

					{/* table */}
				</div>
			</div>
		</div>
	);
};

export default OverviewMain;
