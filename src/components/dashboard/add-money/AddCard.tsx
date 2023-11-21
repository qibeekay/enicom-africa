import React from 'react';
import { IoIosCopy } from 'react-icons/io';

const AddCard = () => {
	return (
		<div className='w-full'>
			{/* form */}
			<div className='w-full'>
				<form action='' className='grid gap-y-10 mt-10 w-full'>
					{/* amount */}
					<div className='flex flex-col sm:w-[22rem] w-full'>
						<label htmlFor='account' className='font-medium'>
							Account Number
						</label>
						<div className='mt-2 font-medium bg-greens/10 text-greens outline-none py-2 px-5 rounded-lg w-full'>
							<p>7678765445</p>
						</div>
					</div>

					<div className='w-full sm:w-[11rem]'>
						{/* submit */}
						<div className='bg-greens text-white py-2 px-10 rounded-lg w-full flex gap-4 items-center justify-center text-lg font-medium'>
							<IoIosCopy size='20' />
							<p>Copy</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCard;
