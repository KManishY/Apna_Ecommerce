import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
	const { isAuth } = useSelector(state => state.loginReducer);
	const token = localStorage.getItem("authToken");
	
	// Check both Redux state and localStorage for authentication
	if (!isAuth && !token) {
		return <Navigate to='/login' />;
	}
	return children;
};

export default PrivateRoute;
