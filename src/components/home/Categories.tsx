'use client';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Arrow } from '@/components';
import Arrow2 from '../Arrow2';

const Categories = () => {
	const categories = [
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide1',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide2',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide3',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide4',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide5',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide6',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide7',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide8',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide9',
		},
		{
			text: 'Batteries',
			slide: 'keen-slider__slide number-slide10',
		},
	];
	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		mode: 'free-snap',
		slides: {
			// origin: 'center',
			perView: 2.5,
			// spacing: 2,
		},
		breakpoints: {
			'(min-width: 500px)': {
				slides: {
					// origin: 'center',
					perView: 3.5,
					// spacing: 2,
				},
			},
			'(min-width: 768px)': {
				slides: {
					// origin: 'center',
					perView: 5,
					// spacing: 2,
				},
			},
			'(min-width: 976px)': {
				slides: {
					// origin: 'center',
					perView: 8,
					// spacing: 2,
				},
			},
			'(min-width: 1400px)': {
				slides: {
					// origin: 'center',
					perView: 9,
					// spacing: 2,
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
	return (
		<div className='w-full'>
			<div className='navigation-wrapper'>
				<div ref={sliderRef} className='keen-slider relative'>
					{/* loading message */}
					{!loaded && (
						<div className='flex flex-row items-center justify-center gap-2 absolute left-[50%] -translate-x-[50%]'>
							<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce'></div>
							<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce [animation-delay:-.3s]'></div>
							<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce [animation-delay:-.5s]'></div>
						</div>
					)}
					{/* keen-slider__slide number-slide1 */}
					{categories.map((category, index) => (
						<div
							key={index}
							className={`overflow-hidden rounded-xl grid items-center justify-center hover:bg-greens hover:text-white py-3 cursor-pointer px-2 ${category.slide}`}>
							{/* image */}
							{loaded && (
								<div>
									{/* text */}
									<div className='px-2'>
										<p className='my-2'>{category.text}</p>
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
							<div className='hidden absolute left-7 mss:left-10 top-[34.3%] mss:top-[28.8%] w-10 aspect-square md:grid items-center justify-center'>
								<Arrow2
									left
									onClick={(e: any) =>
										e.stopPropagation() || instanceRef.current?.prev()
									}
									disabled={currentSlide === 0}
								/>
							</div>

							<div className='hidden absolute right-7 mss:right-10 top-[34.3%] mss:top-[28.8%] w-10 aspect-square md:grid items-center justify-center'>
								<Arrow2
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
	);
};

export default Categories;
