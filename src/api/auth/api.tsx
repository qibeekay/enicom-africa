import axios, { AxiosRequestConfig } from 'axios';

const endpoint = 'auth';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

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

// register
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
			`${API_URL}/${endpoint}/register`,
			userData,
			config
		);

		// Assuming a successful response structure with user data
		const responseData = response.data;

		// Save user details to localStorage
		if (responseData.success) {
			localStorage.setItem('mail', responseData.data.mail);
		}

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};

// login
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
			`${API_URL}/${endpoint}/login`,
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

// verify mail
export const VerifyMail = async (
	userData: {
		mail: string;
		otp: string;
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
			`${API_URL}/${endpoint}/verify-user-otp`,
			userData,
			config
		);

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to verify');
	}
};

// forgot password
export const Forgot = async (
	userData: {
		mail: string;
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
			`${API_URL}/${endpoint}/forgetPword`,
			userData,
			config
		);

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};

// update password
export const Update = async (
	userData: {
		email: string;
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
