'use client';
import React, { createContext, useContext, useState } from 'react';

// Create a context to store the selected loan package data
const LoanPackageContext = createContext();

// Create a custom hook to use the loan package context
export const useLoanPackage = () => useContext(LoanPackageContext);

// Create a provider component to wrap your application
export const LoanPackageProvider = ({ children }) => {
	// State to store the selected loan package data
	const [selectedPackage, setSelectedPackage] = useState(null);

	// Function to set the selected loan package data
	const selectPackage = (packageData) => {
		setSelectedPackage(packageData);
	};

	// State to store the response data from verifyLoanKyc
	const [verifiedLoanData, setVerifiedLoanData] = useState(null);

	return (
		<LoanPackageContext.Provider
			value={{
				selectedPackage,
				selectPackage,
				verifiedLoanData,
				setVerifiedLoanData,
			}}>
			{children}
		</LoanPackageContext.Provider>
	);
};
