import axios from 'axios';
import { toast } from 'react-toastify';

const endpoint = 'cart';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

// add to cart
export const addToCart = async (
	bearerToken: string,
	productToken: string | null,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint}/add-to-cart`,
			{
				product_token: productToken,
				usertoken: userToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		toast.error('Error adding to cart');
		console.error('Error adding to cart:', error);
		return [];
	}
};

// fetch cart items
export const fetchCartItems = async (
	bearerToken: string,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint}/fetch-cart-items`,
			{
				usertoken: userToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		toast.error('Your cart is empty');
		console.error('Error fetching cart items:', error);
		return [];
	}
};

// increase-quantity
export const IncreaseCartItems = async (
	bearerToken: string,
	productToken: string | null,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint}/increase-quantity`,
			{
				product_token: productToken,
				usertoken: userToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		toast.error('Error fetching cart items');
		console.error('Error fetching cart items:', error);
		return [];
	}
};

// decrease quantity
export const DecreaseCartItems = async (
	bearerToken: string,
	productToken: string | null,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint}/decrease-quantity`,
			{
				product_token: productToken,
				usertoken: userToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		toast.error('Error decreasing items');
		console.error('Error decreasing items:', error);
		return [];
	}
};

// delete cart item
export const DeleteCartItems = async (
	bearerToken: string,
	productToken: string | null,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint}/delete-cart-item`,
			{
				product_token: productToken,
				usertoken: userToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		toast.error('Error decreasing items');
		console.error('Error decreasing items:', error);
		return [];
	}
};
