import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

interface LoadItem {
	name: string;
	Qty: number;
	watts: number;
	hours_per_day: number;
	days_per_week: number;
	type: string;
}

export const CalculateLoad = async (bearerToken: string, load: LoadItem[]) => {
	try {
		const response = await axios.post(
			`${API_URL}/load/load
			`,
			{
				load: load,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		toast.error('Error initializing payment');
		console.error('Error initializing payment:', error);
		return [];
	}
};

// get appliances
export const getAppliances = async (bearerToken: string) => {
	try {
		const response = await axios.post(
			`${API_URL}/load/appliances`,
			{},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching appliances:', error);
		return [];
	}
};

// export const getAppliances = async (bearerToken: string) => {
// 	try {
// 		const response = await axios.post(
// 			`${API_URL}/load/appliances?token=${bearerToken}`, // Pass token as query parameter
// 			new URLSearchParams(), // Ensure request body is in x-www-form-urlencoded format
// 			{
// 				headers: {
// 					'Content-Type': 'application/x-www-form-urlencoded', // Simple content type
// 				},
// 			}
// 		);
// 		return response.data.data;
// 	} catch (error) {
// 		console.error('Error fetching appliances:', error);
// 		return [];
// 	}
// };
