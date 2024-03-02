import axios, { AxiosRequestConfig } from 'axios';

// const endpoint = 'reni-kyc';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

// users request for installer
export const requestInstaller = async (
	userData: {
		name: string;
		email: string;
		address: string;
		phone: string;
		state: string;
		image: string;
		desc: string;
		preferred_installation_date: string;
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
			`${API_URL}/agent/send-proposal-to-agent`,
			userData,
			config
		);

		// Assuming a successful response structure with user data
		const responseData = response.data;

		// if (responseData.success) {
		// 	localStorage.setItem('kycStatus', 'true');
		// }

		// console.log('Registration successful', response.data);
		return response.data;
	} catch (error: any) {
		console.error('Upload error:', error);
		throw new Error(error.response?.data?.message || 'Failed to request');
	}
};

// get all installation request
export const getAllSellersRequest = async (
	bearerToken: string,
	isAssigned: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/agent/agent-requests`,
			{
				is_assigned: isAssigned,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching request:', error);
		return [];
	}
};

// get request by token
export const getSellersRequestByToken = async (
	bearerToken: string,
	requestToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/agent/agent-request-by-token`,
			{
				request_bidding_token: requestToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching request:', error);
		return [];
	}
};

// agents initiate bid
export const initiateBid = async (
	userData: {
		name: string;
		price: string;
		description: string;
		preferred_installation_date: string;
		request_bidding_token: string;
		buyer_token: string;
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
			`${API_URL}/agent/agent-bid-on-request`,
			userData,
			config
		);

		// Assuming a successful response structure with user data
		const responseData = response.data;
		return response.data;
	} catch (error: any) {
		console.error('Upload error:', error);
		throw new Error(error.response?.data?.message || 'Failed to request');
	}
};

// users gets bid
export const userGetBid = async (
	bearerToken: string,
	isOngoing: string | null,
	buyerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/agent/get-user-request-agent`,
			{
				is_ongoing: isOngoing,
				buyer_token: buyerToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching request:', error);
		return [];
	}
};

// get bids by request
export const getBids = async (
	bearerToken: string,
	requestToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/agent/view-bids-per-request`,
			{
				request_bidding_token: requestToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching request:', error);
		return [];
	}
};

// hire installer
export const hireInstaller = async (
	bearerToken: string,
	requestToken: string | null,
	buyerToken: string,
	agentToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/agent/hire-agent`,
			{
				request_bidding_token: requestToken,
				buyer_token: buyerToken,
				agent_token: agentToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching request:', error);
		return [];
	}
};
