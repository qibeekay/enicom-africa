import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

export const Installer = async (
	userdata: {
		fname: string;
		lname: string;
		mail: string;
		phone: string;
		address: string;
		company: string;
		city: string;
		state: string;
		company_reg_year: string;
		specialty: string;
		services: string;
	},
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/agent/getStarted
			`,
			userdata,
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error getting started', error);
		return [];
	}
};

export const FinanceSellers = async (
	userdata: {
		fname: string;
		lname: string;
		mail: string;
		phone: string;
		address: string;
		company: string;
		city: string;
		state: string;
		company_reg_year: string;
		location: string;
		services: string;
	},
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/seller.getStarted
			`,
			userdata,
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error getting started', error);
		return [];
	}
};

export const Contact = async (
	userdata: {
		fullname: string;
		mail: string;
		phone: string;
		country: string;
		location: string;
		message: string;
	},
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/contactUs
			`,
			userdata,
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error getting started', error);
		return [];
	}
};

export const Countries = async (bearerToken: string) => {
	try {
		const response = await axios.get(`${API_URL}/countries`, {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});
		return response.data.data;
	} catch (error) {
		// toast.error('Error fetching categories');
		console.error('Error fetching countries:', error);
		return [];
	}
};
export const states = async (
	bearerToken: string,
	country: string | undefined
) => {
	try {
		const response = await axios.post(
			`${API_URL}/states`,
			{
				country: country,
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
		console.error('Error fetching state:', error);
		return [];
	}
};

export const cities = async (
	bearerToken: string,
	state: string | undefined
) => {
	try {
		const response = await axios.post(
			`${API_URL}/city`,
			{
				state: state,
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
		console.error('Error fetching cities:', error);
		return [];
	}
};
