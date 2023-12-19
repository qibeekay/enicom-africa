// CartContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchCartItems, addToCart as addToCartApi } from '@/api/cart/cart';
import { useSearchParams } from 'next/navigation';

interface Product {
	// Define the structure of your product data
	// ...
}

interface CartContextProps {
	cartItems: Product[];
	addToCart: (product: Product) => void;
	// Add other functions as needed
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<Product[]>([]);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const searchParams = useSearchParams();
	// Access the query parameter
	const productToken = searchParams.get('producttoken');

	const usertoken = localStorage.getItem('usertoken') || null;

	const fetchCartItem = async () => {
		try {
			const fetchedCartItem = await fetchCartItems(`$${token}`, `${usertoken}`);
			setCartItems(fetchedCartItem.products);
		} catch (error) {
			toast.error('Error fetching cart items');
			console.error('Error fetching cart items:', error);
		}
	};

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

	// Fetch cart items on component mount
	useEffect(() => {
		fetchCartItem();
	}, []);

	return (
		<CartContext.Provider value={{ cartItems, addToCart }}>
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
