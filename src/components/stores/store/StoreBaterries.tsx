'use client';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Arrow } from '@/components';
import { CgQuote } from 'react-icons/cg';
import { useRouter } from 'next/navigation';

const StoreBaterries = () => {
	const Batteries = [
		{
			slide: 'keen-slider__slide number-slide1',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide2',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide3',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide4',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide5',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide6',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide7',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide8',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide9',
			img: '/exterior2.jpg',
		},
		{
			slide: 'keen-slider__slide number-slide10',
			img: '/exterior2.jpg',
		},
	];
	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [loaded, setLoaded] = useState(false);
	const router = useRouter();

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		mode: 'free-snap',
		slides: {
			// origin: 'center',
			perView: 2.5,
			spacing: 2,
		},
		breakpoints: {
			'(min-width: 500px)': {
				slides: {
					// origin: 'center',
					perView: 3.5,
					spacing: 2,
				},
			},
			'(min-width: 768px)': {
				slides: {
					// origin: 'center',
					perView: 5,
					spacing: 2,
				},
			},
			'(min-width: 976px)': {
				slides: {
					// origin: 'center',
					perView: 6,
					spacing: 2,
				},
			},
			'(min-width: 1400px)': {
				slides: {
					// origin: 'center',
					perView: 7,
					spacing: 2,
				},
			},
		},

		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	});

	const handleNavigation = () => {
		router.push('/details');
	};
	return (
		<div className='relative'>
			<div>
				{/* navigation wrapper */}
				<div className=' md:mx-[4rem] navigation-wrapper'>
					{/* slider ref */}

					<div ref={sliderRef} className='keen-slider py-10 relative'>
						{/* testimonial */}
						{/* loading message */}
						{!loaded && (
							<div className='flex flex-row items-center justify-center gap-2 absolute left-[50%] -translate-x-[50%]'>
								<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce'></div>
								<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce [animation-delay:-.3s]'></div>
								<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce [animation-delay:-.5s]'></div>
							</div>
						)}
						{/* keen-slider__slide number-slide1 */}
						{Batteries.map((battery, index) => (
							<div
								key={index}
								className={`overflow-hidden rounded-xl w-[11rem] hover:shadow-lg hover:bg-white cursor-pointer px-2 ${battery.slide}`}
								onClick={handleNavigation}>
								{/* image */}
								{loaded && (
									<div>
										<div className='w-full rounded-xl overflow-hidden h-[7rem]'>
											<img
												className='w-full h-full object-cover'
												src={battery.img}
												alt=''
											/>
										</div>

										{/* text */}
										<div className='px-2'>
											<p className='my-2 text-dark'>Hvac Capacity</p>
											<h1 className='mb-4 font-semibold text-lg text-dark'>
												N200,000
											</h1>
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					{/* buttons */}
					<div>
						{instanceRef.current && (
							<div className=''>
								<div className='hidden absolute left-0 top-[50%] -translate-y-[50%] bg-greens w-10 aspect-square md:grid items-center justify-center'>
									<Arrow
										left
										onClick={(e: any) =>
											e.stopPropagation() || instanceRef.current?.prev()
										}
										disabled={currentSlide === 0}
									/>
								</div>

								<div className='hidden absolute right-0 top-[50%] -translate-y-[50%] bg-greens w-10 aspect-square md:grid items-center justify-center'>
									<Arrow
										onClick={(e: any) =>
											e.stopPropagation() || instanceRef.current?.next()
										}
										disabled={
											currentSlide ===
											instanceRef.current.track.details?.slides.length - 1
										}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoreBaterries;
