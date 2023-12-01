import React from 'react';
import { HiChevronDown } from 'react-icons/hi2';

const Tab1 = () => {
	return (
		<div className='font-poppins text-dark'>
			<div>
				<div>
					<h1>Personal Information</h1>

					<form action='' className='mt-5'>
						<div className='flex flex-col gap-6'>
							{/* fullname */}
							<div>
								<label htmlFor='amount'>Full Name</label>
								<input
									type='text'
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									placeholder='Type here'
								/>
							</div>

							{/* Email Address */}
							<div>
								<label htmlFor='amount'>Email Address</label>
								<input
									type='text'
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									placeholder='Type here'
								/>
							</div>

							{/* Home Address */}
							<div>
								<label htmlFor='amount'>Home Address</label>
								<input
									type='text'
									className='w-full outline-none border border-dark rounded-lg py-2 px-4 mt-2'
									placeholder='Type here'
								/>
							</div>

							{/* order */}
							<div>
								<label htmlFor=''>Phone Number (with country code)</label>

								<div className='border border-dark/50 bg-white text-dark flex items-center w-full rounded-lg overflow-hidden py-2 mt-2'>
									<div className='flex items-center gap-4 md:gap-7 px-6 border-r border-dark/50'>
										<div>
											<div className=' aspect-square w-7 rounded-full overflow-hidden'>
												<img
													className='w-full h-full object-cover'
													src='/hero.png'
													alt=''
												/>
											</div>
										</div>
										<HiChevronDown />
									</div>

									<div className='w-full px-6'>
										<input
											type='text'
											placeholder='+1'
											className='w-full outline-none bg-transparent placeholder:text-dark placeholder:text-[12px] md:placeholder:text-base'
										/>
									</div>
								</div>
							</div>

							{/* button */}
							<div className='mt-5'>
								<button className='bg-greens px-14 py-2 rounded-lg text-white w-fit'>
									Next
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Tab1;
