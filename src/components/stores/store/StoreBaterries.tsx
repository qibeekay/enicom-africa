'use client';
import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Arrow } from '@/components';
import { CgQuote } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import { getAllProduct } from '@/api/products/products';

interface Product {
	// Define the structure of your product data
	product_name: string;
	product_price_th: string;
	product_image: string;
	product_token: string;
	// Add other properties as needed
}

interface Category {
	category: string;
	products: Product[];
}

// Use React.FC with the defined props
interface StoreBaterriesProps {
	category: string;
}

const StoreBaterries: React.FC<StoreBaterriesProps> = ({ category }) => {
	// 		slide: 'keen-slider__slide number-slide1',

	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [loaded, setLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [productsCategories, setProductsCategories] = useState<Category[]>([]);
	const router = useRouter();

	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
	const animation = { duration: 30000, easing: (t: number) => t };

	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
		loop: true,
		mode: 'free-snap',
		created(s) {
			setLoaded(true);
			s.moveToIdx(10, true, animation);
		},
		updated(s) {
			s.moveToIdx(s.track.details.abs + 10, true, animation);
		},
		animationEnded(s) {
			s.moveToIdx(s.track.details.abs + 10, true, animation);
		},
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
		// created() {
		// 	setLoaded(true);
		// },
	});

	const handleNavigation = () => {
		router.push('/details');
	};

	const fetchProducts = async () => {
		try {
			const fetchedProducts = await getAllProduct(`$${token}`);
			setProductsCategories(fetchedProducts);
			// setLoaded(true);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching products:', error);
			// Handle error if needed
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleDetailsClick = (productToken: string | null) => {
		// Programmatically navigate to the DetailsItems page with the product token as a query parameter
		router.push(`/details?producttoken=${productToken}`);
	};

	console.log(productsCategories);
	return (
		<div className='relative'>
			<div>
				{/* navigation wrapper */}
				<div className=' md:mx-[4rem] navigation-wrapper'>
					{/* slider ref */}
					{isLoading ? (
						<div className='flex flex-row items-center justify-center gap-2 absolute left-[50%] -translate-x-[50%]'>
							<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce'></div>
							<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce [animation-delay:-.3s]'></div>
							<div className='w-3 h-3 rounded-full bg-[#D5FFD3] animate-bounce [animation-delay:-.5s]'></div>
						</div>
					) : (
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
							{productsCategories
								.filter((cat) => cat.category === category)
								.map((cat, index) => (
									<React.Fragment key={index}>
										{cat.products.map((product, productIndex) => (
											<div
												key={productIndex}
												className={`overflow-hidden rounded-xl w-[11rem] hover:shadow-lg hover:bg-white cursor-pointer px-2 keen-slider__slide`}
												onClick={() =>
													handleDetailsClick(product.product_token)
												}>
												{/* image */}
												{loaded && (
													<div>
														<div className='w-full rounded-xl overflow-hidden h-[7rem]'>
															<img
																className='w-full h-full object-cover'
																src={product.product_image}
																alt=''
															/>
														</div>

														{/* text */}
														<div className='px-2'>
															<p className='my-2 text-dark'>
																{product.product_name}
															</p>
															<h1 className='mb-4 font-semibold text-lg text-dark'>
																{product.product_price_th}
															</h1>
														</div>
													</div>
												)}
											</div>
										))}
									</React.Fragment>
								))}
						</div>
					)}

					{/* buttons */}
					<div>
						{instanceRef?.current && (
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
