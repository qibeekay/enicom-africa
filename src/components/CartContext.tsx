// CartContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchCartItems, addToCart as addToCartApi } from '@/api/cart/cart';
import { useSearchParams } from 'next/navigation';

interface Product {
	product_name: string;
	poduct_price_th: string;
	product_price: string;
	product_image: string;
	product_token: string;
	product_desc: string;
	product_type: string;
	product_owner: string;
	product_quantity: number;
	maximum_quantity: number;
}

interface CartContextProps {
	cartItems: Product[];
	addToCart: (product: Product) => void;
	fetchCartItem: () => void;
	total_price_th: string; // Add total_price_th to the interface
	total_price: number; // Add total_price to the interface
	// Add other functions as needed
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<Product[]>([]);
	const [totalPriceTh, setTotalPriceTh] = useState<string>('');
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const searchParams = useSearchParams();
	// Access the query parameter
	const productToken = searchParams.get('producttoken');

	// Fetch usertoken from localStorage when the component mounts
	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const fetchCartItem = async () => {
		try {
			const fetchedCartItem = await fetchCartItems(`$${token}`, `${usertoken}`);
			setCartItems(fetchedCartItem.products);
			setTotalPriceTh(fetchedCartItem.total_price_th);
			setTotalPrice(fetchedCartItem.total_price);
			setCartItems(fetchedCartItem.products);
		} catch (error) {
			// console.error('Error fetching cart items:', error);
		}
	};

	useEffect(() => {
		fetchCartItem();
	}, []);

	const addToCart = async (product: Product) => {
		try {
			// Modify the API parameters accordingly
			const response = await addToCartApi(
				`$${token}`,
				`${productToken}`,
				`${usertoken}`
			);
			if (response.success === true) {
				toast.success('Product added to cart');
				fetchCartItem(); // Fetch updated cart items after adding
			} else {
				toast.error(response.message || 'Failed to add');
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to upload');
		}
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				fetchCartItem,
				total_price_th: totalPriceTh,
				total_price: totalPrice,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
