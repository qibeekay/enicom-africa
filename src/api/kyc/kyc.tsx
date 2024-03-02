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

// verification for individual
export const verifyIndividual = async (
	userData: {
		fname: string;
		mail: string;
		address: string;
		state: string;
		phone_number: string;
		profile_image: string;
		bussiness_type: string;
		verification_type: string;
		verification_number: string;
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
			`${API_URL}/service-request/verify-seller-individual`,
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
		throw new Error(error.response?.data?.message || 'Failed to upload');
	}
};

// verification for businesss
export const verifyBusiness = async (
	userData: {
		fname: string;
		mail: string;
		address: string;
		phone_number: string;
		state: string;
		profile_image: string;
		bussiness_type: string;
		bussiness_name: string;
		verification_type: string;
		verification_number: string;
		cac_number: string;
		utility_bill: string;
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
			`${API_URL}/service-request/verify-seller-bussiness`,
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
		throw new Error(error.response?.data?.message || 'Failed to upload');
	}
};

// verification for agents
export const verifyAgent = async (
	userData: {
		fname: string;
		mail: string;
		address: string;
		phone_number: string;
		state: string;
		profile_image: string;
		// bussiness_type: string;
		// bussiness_name: string;
		verification_type: string;
		verification_number: string;
		cac_digit: string;
		utility_bill: string;
		certifications: string;
		education_bg: string;
		experiences: string;
		tax_id_number: string;
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
			`${API_URL}/agent/verify-agent`,
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
		throw new Error(error.response?.data?.message || 'Failed to upload');
	}
};

// getting all sellers
export const getAllSellers = async (
	bearerToken: string,
	isVerified: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/service-request/get-all-sellers`,
			{
				is_verified: isVerified,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching sellers:', error);
		return [];
	}
};

// getting all agents
export const getAllAgents = async (
	bearerToken: string,
	isVerified: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/agent/get-all-agent`,
			{
				is_verified: isVerified,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching sellers:', error);
		return [];
	}
};

// getting a specific seller
export const getSellersByToken = async (
	bearerToken: string,
	sellerToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/service-request/get-seller-by-token`,
			{
				seller_profile_token: sellerToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching sellers:', error);
		return [];
	}
};

// getting a specific agent
export const getAgentsByToken = async (
	bearerToken: string,
	agentToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/agent/get-agent-by-token`,
			{
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
		console.error('Error fetching sellers:', error);
		return [];
	}
};

// approve or disapprove seller
export const changeSellersStatus = async (
	bearerToken: string,
	sellerToken: string | null,
	isVerified: number,
	reason: string | null,
	userToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/service-request/manage_seller_status`,
			{
				seller_profile_token: sellerToken,
				reason: reason,
				is_verified: isVerified,
				usertoken: userToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error approving:', error);
		return [];
	}
};

// approve or disapprove agents
export const changeAgentsStatus = async (
	bearerToken: string,
	agentToken: string | null,
	isVerified: number,
	reason: string | null,
	userToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/agent/manage-agent-status`,
			{
				agent_token: agentToken,
				reason: reason,
				is_verified: isVerified,
				usertoken: userToken,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error approving:', error);
		return [];
	}
};

// admin restricts agent
export const restrictInstaller = async (
	bearerToken: string,
	restrictToken: string | null,
	userToken: string,
	agentToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/agent/manage-agent-restriction`,
			{
				restrict_bidding: restrictToken,
				usertoken: userToken,
				agent_profile_token: agentToken,
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
