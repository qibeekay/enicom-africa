import axios, { AxiosRequestConfig } from 'axios';

const endpoint = 'admin/plan';
const endpoint1 = 'admin/loan.providers';
const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;

// create plan
export const createPlan = async (
	planName: string,
	planDigit: number,
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint}/create-plan`,
			{
				plan_name: planName,
				plan_digit: planDigit,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error('Error creating plan:', error);
		return false;
	}
};

// get all plans
export const getAllPlans = async (bearerToken: string) => {
	try {
		const response = await axios.get(`${API_URL}/${endpoint}/get-all-plans`, {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});
		return response.data.data;
	} catch (error) {
		console.error('Error fetching plan:', error);
		return [];
	}
};

// create provider
export const createLoanProvider = async (
	providerName: string,
	providerImage: string,
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint1}/create-provider`,
			{
				provider_name: providerName,
				provider_image: providerImage,
			},
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error('Error creating provider:', error);
		return false;
	}
};

// get loan providers
export const getAllProviders = async (bearerToken: string) => {
	try {
		const response = await axios.get(
			`${API_URL}/${endpoint1}/get-loan-provider`,
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching plan:', error);
		return [];
	}
};

// create loan packages
export const createLoanPackages = async (
	loanData: {
		plan_token: string;
		provider_token: string;
		amount: number;
		percentage: string;
		package_desc: string;
	},
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/${endpoint1}/create-loan-packages
`,
			loanData,
			{
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error('Error creating provider:', error);
		return false;
	}
};

// get loan packages
export const getLoanPackages = async (bearerToken: string) => {
	try {
		const response = await axios.get(`${API_URL}/loan/get-loan-packages`, {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});
		return response.data.data;
	} catch (error) {
		console.error('Error fetching packages:', error);
		return [];
	}
};
