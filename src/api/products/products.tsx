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
		toast.error('Error fetching categories');
		console.error('Error fetching categories:', error);
		return [];
	}
};

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
			toast.error('Failed to create category');
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
		product_quantity: string;
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

export const getAllProduct = async (bearerToken: string) => {
	try {
		const response = await axios.get(`${API_URL}/fetch-all-product`, {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});
		return response.data.data;
	} catch (error) {
		toast.error('Error fetching categories');
		console.error('Error fetching categories:', error);
		return [];
	}
};

// export const createBlog = async (userData: {
// 	userid: number;
// 	blog_title: string;
// 	blog_desc: string;
// 	blog_image: string;
// }): Promise<{ success: boolean; message?: string }> => {
// 	try {
// 		const config: AxiosRequestConfig = {
// 			// headers: {
// 			// 	Authorization: `Bearer ${bearerToken}`,
// 			// },
// 		};
// 		const response = await axios.post(
// 			`https://havens.iccflifeskills.com.ng/v0.1/api/admin/blog/createBlog`,
// 			userData,
// 			config
// 		);

// 		// Assuming a successful response structure with user data
// 		const responseData = response.data;

// 		// Save user details to localStorage

// 		// console.log('Registration successful', response.data);
// 		return response.data;
// 	} catch (error: any) {
// 		console.error('KYC update error:', error);
// 		throw new Error(error.response?.data?.message || 'Failed to update kyc');
// 	}
// };