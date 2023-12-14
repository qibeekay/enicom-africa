'use client';
import React from 'react';
interface CartDetailsProps {
	handleOpen: () => void; // Define the type of handleOpen as a function that takes no arguments and returns void.
}

const CategoryModal: React.FC<CartDetailsProps> = ({ handleOpen }) => {
	return <div>CategoryModal</div>;
};

export default CategoryModal;
