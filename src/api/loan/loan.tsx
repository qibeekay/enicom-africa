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
	} catch (error: any) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			throw new Error(
				'Failed to create loan package444: ' + error.response.data
			);
		} else if (error.request) {
			// The request was made but no response was received
			throw new Error('No response received from the server');
		} else {
			// Something happened in setting up the request that triggered an Error
			throw new Error('Error setting up the request: ' + error.message);
		}
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

// delete loan package
export const deleteLoanPackage = async (
	packageToken: string,
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/admin/loan.providers/delete-loan-packages`,
			{
				package_token: packageToken,
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

// verify loan kyc
export const verifyLoanKyc = async (
	reniToken: string,
	bvn: string,
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/loan/verify-loan-kyc`,
			{
				renitoken: reniToken,
				bvn: bvn,
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

// apply for loan
export const applyLoan = async (
	userdata: {
		usertoken: string;
		type: string;
		name: string;
		mail: string;
		phone: string;
		address_home: string;
		address_city: string;
		address_state: string;
		address_zip: string;
		loan_amount: number;
		loan_quote: string;
		loan_provider_token: string;
		loan_package_token: string;
		dob: string;
		employ_status: string;
		employ_title: string;
		employ_income: string;
		biz_type: string;
		biz_industry: string;
		biz_years: string;
		prod_total_amount: number;
		products: [string];
		check_terms: boolean;
		check_process: boolean;
	},
	bearerToken: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/loan/apply
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
		console.error('Error initializing payment:', error);
		return [];
	}
};

// get all loan record admin
export const adminLoanRecord = async (
	bearerToken: string,
	isVerified: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/loan/geta-all-loan-records`,
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
		console.error('Error fetching request:', error);
		return [];
	}
};

// get all loan record users
export const userLoanRecord = async (
	bearerToken: string,
	userToken: string,
	isVerified: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/loan/get-user-loan-records`,
			{
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
		console.error('Error fetching request:', error);
		return [];
	}
};

// get single loan
export const getSpecificLoan = async (
	bearerToken: string,
	loanToken: string | null
) => {
	try {
		const response = await axios.post(
			`${API_URL}/loan/get-specific-loan`,
			{
				loan_token: loanToken,
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

// loan calculator
export const calculateLoan = async (
	bearerToken: string,
	planToken: string,
	providerRate: string,
	providerToken: string,
	amount: string
) => {
	try {
		const response = await axios.post(
			`${API_URL}/loan/loan.calculator`,
			{
				plan_token: planToken,
				provider_rate: providerRate,
				provider_token: providerToken,
				amount_intended_to_borrow: amount,
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
