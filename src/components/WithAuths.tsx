'use client';
import { getUser } from '@/api/products/products';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function WithAuths(Component: any) {
	return function WithAuth(props: any) {
		const [roles, setRoles] = useState<string[]>([]);
		const token = process.env.NEXT_PUBLIC_AUTH_BEARER;
		const usertoken =
			typeof window !== 'undefined'
				? localStorage.getItem('usertoken') || ''
				: '';
		// getting specific user data
		const getuser = async () => {
			try {
				const getusers = await getUser(`$${token}`, `${usertoken}`);
				// console.log(getusers);
				setRoles(getusers.roles);
			} catch (error) {
				// console.error('Error fetching cart items:', error);
				console.log('error');
			}
		};

		useEffect(() => {
			getuser();
		}, []);

		useEffect(() => {
			if (roles !== null && roles.length > 0) {
				if (roles.indexOf('admin') === -1) {
					redirect('/');
				}
			}
		}, [roles]);

		if (roles !== null && roles.length > 0) {
			if (roles.indexOf('admin') === -1) {
				return null;
			}
		}

		return <Component {...props} />;
	};
}
