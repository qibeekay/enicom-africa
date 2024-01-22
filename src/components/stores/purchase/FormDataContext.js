// FormDataContext.js
import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }) => {
	const [formData, setFormData] = useState({
		state: '',
		local_govt: '',
		address: '',
	});

	const updateFormData = (newData) => {
		setFormData((prevData) => ({
			...prevData,
			...newData,
		}));
	};

	return (
		<FormDataContext.Provider value={{ formData, updateFormData }}>
			{children}
		</FormDataContext.Provider>
	);
};
