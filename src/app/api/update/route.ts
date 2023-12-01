import axios, { AxiosRequestConfig } from 'axios';

const endpoint = 'auth/updatePword';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;
export const UpdatePword = async (
	userData: {
		usertoken: string;
		fpword: string;
		npword: string;
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
			`${API_URL}/${endpoint}`,
			userData,
			config
		);

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};
