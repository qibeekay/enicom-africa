/* eslint-disable */
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_ENV_VARIABLE;
const key = process.env.NEXT_PUBLIC_FLUT_KEY;

export const useFlutterwavePayment = (onSuccess) => {
	const [loading, setLoading] = useState(false);
	const [fname, setFname] = useState('');
	const [mail, setMail] = useState('');
	const [lname, setLname] = useState('');
	const [usertoken, setUsertoken] = useState('');
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	useEffect(() => {
		const userData = localStorage.getItem('userResponse');
		if (userData) {
			const userObject = JSON.parse(userData);
			setFname(userObject.fname || '');
			setLname(userObject.lname || '');
			setMail(userObject.mail || '');
			setUsertoken(userObject.usertoken || '');
		}
	}, []);

	const config = (amount) => ({
		public_key: key,
		tx_ref: Date.now(),
		amount,
		currency: 'NGN',
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: mail,
			name: `${fname} ${lname}`,
		},
		customizations: {
			title: 'Enicom Wallet Funding',
			description: 'Funding my wallet',
			logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
		},
	});

	const initiatePayment = (amount) => {
		const handleFlutterPayment = useFlutterwave(config(amount));
		handleFlutterPayment({
			callback: async (response) => {
				setLoading(true);
				if (response.status === 'successful') {
					// Make a POST request to the /wallet/fund endpoint
					fetch(`${API_URL}/wallet/fund`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer $${token}`,
						},
						body: JSON.stringify({
							usertoken: usertoken,
							amount: response.amount,
							trx_ref: response.tx_ref,
						}),
					})
						.then((response) => response.json())
						.then((data) => console.log(data))
						.catch((error) => console.error(error))
						.finally(() => setLoading(false));
				}
				closePaymentModal();
			},
			onClose: () => {},
		});
	};

	return { initiatePayment, loading };
};
