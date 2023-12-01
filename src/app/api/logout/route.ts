// route.ts
'use client';
// Import necessary libraries and dependencies
import { useRouter } from 'next/navigation';

// Function to handle logout
export const logout = () => {
	const router = useRouter();

	// Clear user-related information from localStorage
	localStorage.removeItem('mail');
	localStorage.removeItem('fname');
	localStorage.removeItem('lname');
	// Add other user-related keys as needed

	// Redirect the user to the login page or any other desired page
	router.push('/login');
};
