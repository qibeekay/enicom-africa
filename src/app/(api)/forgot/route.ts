import axios, { AxiosRequestConfig } from 'axios';

const endpoint = 'auth/forgetPword';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

export async function Forgot(
	userData: {
		mail: string;
	},
	bearerToken: string
): Promise<{ success: boolean; message?: string }> {
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
}
