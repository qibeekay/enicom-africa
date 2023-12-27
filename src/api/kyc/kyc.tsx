import axios, { AxiosRequestConfig } from 'axios';

const endpoint = 'reni-kyc';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

// update kyc
export const updateKyc = async (
	userData: {
		fname: string;
		bvn: string;
		occupation: string;
		renitoken: string;
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
			`${API_URL}/${endpoint}/verify-kyc`,
			userData,
			config
		);

		// Assuming a successful response structure with user data
		const responseData = response.data;

		if (responseData.success) {
			localStorage.setItem('kycStatus', 'true');
		}

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		console.error('Upload error:', error);
		throw new Error(error.response?.data?.message || 'Failed to upload');
	}
};
