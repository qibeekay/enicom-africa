import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

const endpoint = 'admin/category';
const endpoint1 = 'admin/product';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

// get all category
export const getAllCategories = async (bearerToken: string) => {
	try {
		const response = await axios.get(
			`${API_URL}/${endpoint}/get-all-categories`,
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		// toast.error('Error fetching categories');
		console.error('Error fetching categories:', error);
		return [];
	}
};

// create categories for products
export const createCategory = async (
	categoryName: string,
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint}/create-category`,
			{
				cat_name: categoryName,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);

		if (response.status === 201) {
			// console.log('Category added successfully');
			toast.success('Category added successfully');
			return true;
		} else {
			// toast.error('Failed to create category');
			console.error('Failed to create category');
			return false;
		}
	} catch (error) {
		toast.error('Error creating category');

		console.error('Error creating category:', error);
		return false;
	}
};

// upload products
export const uploadProduct = async (
	userData: {
		product_name: string;
		product_price: string;
		product_image: string;
		product_desc: string;
		product_condition: string;
		product_capacity: string;
		product_voltage: string;
		product_unit: string;
		product_watts: string;
		product_rating: string;
		product_quantity: string;
		delivery_fee: string;
		product_category: string[];
		usertoken: string;
	},
	bearerToken: string
): Promise<{ success: boolean; message?: string }> => {
	try {
		const config: AxiosRequestConfig = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		};
		const response = await axios.post(
			`${API_URL}/${endpoint1}/upload_product`,
			userData,
			config
		);

		// Assuming a successful response structure with user data
		const responseData = response.data;

		// Save user details to localStorage
		console.log('image Upload successfull');

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		console.error('Upload error:', error);
		throw new Error(error.response?.data?.message || 'Failed to upload');
	}
};

// get all products users
export const getAllProduct = async (bearerToken: string) => {
	try {
		const response = await axios.get(`${API_URL}/fetch-all-product`, {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});
		return response.data.data;
	} catch (error) {
		// toast.error('Error fetching categories');
		console.error('Error fetching categories:', error);
		return [];
	}
};

// get all products admin
export const getAllProductAdmin = async (bearerToken: string) => {
	try {
		const response = await axios.get(
			`${API_URL}/admin/service-request/get-requested-product`,
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		// toast.error('Error fetching products');
		console.error('Error fetching products:', error);
		return [];
	}
};

// get all products sellers
export const getAllApprovedProduct = async (
	bearerToken: string,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/service-request/get-user-product`,
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
		// toast.error('Error fetching products');
		console.error('Error fetching products:', error);
		return [];
	}
};

// get product by token
export const getProductByToken = async (
	bearerToken: string,
	productToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/product/get-product-by-token`,
			{
				producttoken: productToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		// toast.error('Error fetching product');
		console.error('Error fetching product:', error);
		return [];
	}
};

// get users
export const getUser = async (
	bearerToken: string,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/profile/getUserData`,
			{
				identifier: userToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		// Store the entire response in local storage
		localStorage.setItem('userResponse', JSON.stringify(response.data.data));
		return response.data.data;
	} catch (error) {
		console.error('Error fetching product:', error);
		return [];
	}
};

// get admin products by token
export const getAdminProductByToken = async (
	bearerToken: string,
	productToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/service-request/view-requested-product`,
			{
				product_token: productToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		// toast.error('Error fetching product');
		console.error('Error fetching product:', error);
		return [];
	}
};

// admin disapprove product
export const disapproveProduct = async (
	bearerToken: string,
	productToken: string | null,
	productName: string,
	reason: string,
	productCondition: string,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/service-request/disapprove-product`,
			{
				product_token: productToken,
				product_name: productName,
				product_condition: productCondition,
				reason: reason,
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
		// toast.error('Error fetching cart items');
		console.error('Error fetching cart items:', error);
		return [];
	}
};

// admin approve product
export const approveProduct = async (
	bearerToken: string,
	productToken: string | null,
	productName: string,
	productCondition: string,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/service-request/approve-product`,
			{
				product_token: productToken,
				product_name: productName,
				product_condition: productCondition,
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
		// toast.error('Error fetching cart items');
		console.error('Error fetching cart items:', error);
		return [];
	}
};

// get all orders
export const getAllOrders = async (
	bearerToken: string,
	order_status: string | null,
	userToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/buyer.orders/get-all-orders`,
			{
				order_status: order_status,
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
		console.error('Error fetching orders:', error);
		return [];
	}
};

// search products
export const searchProducts = async (bearerToken: string, search: string) => {
	try {
		const response = await axios.post(
			`${API_URL}/search-product`,
			{
				search: search,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		// toast.error('Error fetching product');
		console.error('Error fetching product:', error);
		return [];
	}
};

// review a product
export const reviewProduct = async (
	bearerToken: string,
	productToken: string | null,
	productName: string | undefined,
	ratings: number,
	reviews: string,
	userToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/review/create-review`,
			{
				producttoken: productToken,
				product_name: productName,
				ratings: ratings,
				review: reviews,
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
		// toast.error('Error fetching cart items');
		console.error('Error fetching cart items:', error);
		return [];
	}
};

// get a specific products reviews
export const getProductReview = async (
	bearerToken: string,
	productToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/review/get-reviews`,
			{
				producttoken: productToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		// toast.error('Error fetching product');
		console.error('Error fetching product:', error);
		return [];
	}
};
