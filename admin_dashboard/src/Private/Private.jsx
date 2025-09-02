import React from "react";
import { Navigate } from "react-router-dom";




const token = localStorage.getItem("authToken");
const PrivateRoute = ({ children }) => {
	if (!token) {
		return <Navigate to='/login' />;
	}
	return children;
};

export default PrivateRoute;
