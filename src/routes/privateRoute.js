import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';
import { getUserProfile } from '../redux/reducers/user';

export const PrivateRoute = () => {
    const dispatch = useDispatch()
	const { user, profile } = useSelector(state => state.user)

	useEffect(() => {
		if (user && !profile) dispatch(getUserProfile(user));
	}, [])
    
    if (!user) {
        return <Navigate to="/login"/>
    }

    return <Outlet />
};