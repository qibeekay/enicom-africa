'use client';
import { getUser } from '@/api/products/products';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function WithUserAuths(Component: any) {
	return function WithUserAuth(props: any) {
		const [roles, setRoles] = useState<string[]>([]);
		const router = useRouter();
		const token = process.env.NEXT_PUBLIC_AUTH_BEARER || '';
		const usertoken =
			typeof window !== 'undefined'
				? localStorage.getItem('usertoken') || ''
				: '';

		const getuser = async () => {
			try {
				const getusers = await getUser(token, usertoken);
				setRoles(getusers.roles);
			} catch (error) {
				console.error('Error fetching user data:', error);
				router.push('/login'); // Redirect to login on error
			}
		};

		useEffect(() => {
			if (!usertoken) {
				router.push('/login');
			} else {
				getuser();
			}
		}, [usertoken, router]);

		useEffect(() => {
			if (roles.length === 0) {
				router.push('/login');
			}
		}, [roles, router]);

		if (roles.length === 0) {
			return null;
		}

		return <Component {...props} />;
	};
}
