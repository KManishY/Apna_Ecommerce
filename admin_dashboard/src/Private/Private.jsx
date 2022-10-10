import React from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext.jsx";
const token = localStorage.getItem("authToken");
const PrivateRoute = ({ children }) => {
	if (!token) {
		return <Navigate to='/login' />;
	}
	console.log("hi");
	return children;
};

export default PrivateRoute;
