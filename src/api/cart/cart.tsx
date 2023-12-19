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
		toast.error('Error fetching cart items');
		console.error('Error fetching cart items:', error);
		return [];
	}
};
