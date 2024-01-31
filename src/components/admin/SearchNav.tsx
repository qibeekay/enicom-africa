import React from 'react';
import { BsBell } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

const SearchNav = () => {
	return (
		<div>
			{/* nav */}
			<div className='flex items-center justify-between w-full py-4 bg-white pl-10 pr-10 lg:pl-4'>
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
						<h1 className='hidden ms:grid text-sm'>Welcome, Jenner</h1>

						{/* image */}
						<div className='w-10 aspect-square overflow-hidden rounded-full'>
							<img className='w-full h-full object-cover' src='' alt='' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchNav;
