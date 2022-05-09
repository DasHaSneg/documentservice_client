import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = () => {
	const { user } = useSelector(state => state.user)

	if (!user) {
		return <Outlet />
	}
	return <Navigate to="/documents" />
}