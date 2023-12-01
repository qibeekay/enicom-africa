import axios, { AxiosRequestConfig } from 'axios';

const endpoint = 'auth/register';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

export const Register = async (
	userData: {
		fname: string;
		lname: string;
		mail: string;
		pword: string;
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
