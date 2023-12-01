import axios, { AxiosRequestConfig } from 'axios';

interface SuccessfulLoginResponse {
	success: true;
	message: string;
	data: {
		is_verified: boolean;
	};
}

// Type for a generic login response
type LoginResponse =
	| SuccessfulLoginResponse
	| { success: false; message?: string; status_code: number };

const endpoint = 'auth/login';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

export const Login = async (
	userData: {
		mail: string;
		pword: string;
	},
	bearerToken: string
): Promise<LoginResponse> => {
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

		// Assuming a successful response structure with user data
		const responseData = response.data;

		// Save user details to localStorage
		if (responseData.success) {
			localStorage.setItem('fname', responseData.data.fname);
			localStorage.setItem('lname', responseData.data.lname);
			localStorage.setItem('mail', responseData.data.mail);
		}

		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to login');
	}
};
