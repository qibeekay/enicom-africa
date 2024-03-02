'use client';
import { getBids } from '@/api/installer/installer';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface OverviewModalProps {
	handleOpen: (productToken: string) => void;
	bidsToken: string;
	fetchRequests: () => void;
}

interface Bids {
	buyer_token: string;
	state: string;
	address: string;
	name: string;
	description: string;
	has_accepted_agent: boolean;
	is_assigned_installer_status: string;
	on_going: boolean;
	preferred_installation_date: string;
	image: string;
	request_bidding_token: string;
	requested_date: string;
}

const AllBidsModal: React.FC<OverviewModalProps> = ({
	handleOpen,
	fetchRequests,
	bidsToken,
}) => {
	const [bidsByToken, setBidsByToken] = useState<Bids | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showBidForm, setShowBidForm] = useState<boolean>(false);
	const token = process.env.NEXT_PUBLIC_AUTH_BEARER;

	const usertoken =
		typeof window !== 'undefined'
			? localStorage.getItem('usertoken') || ''
			: '';

	const fetchSingleRequest = async () => {
		try {
			const fetchedSingleRequest = await getBids(`$${token}`, `${bidsToken}`);
			setBidsByToken(fetchedSingleRequest);
		} catch (error) {
			toast.error('Error fetching bids');
			console.error('Error fetching bids:', error);
		}
	};

	useEffect(() => {
		fetchSingleRequest();
	}, []);
	return <div>AllBidsModal</div>;
};

export default AllBidsModal;
