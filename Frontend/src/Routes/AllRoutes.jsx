import { Route, Routes } from "react-router-dom";
import Checkout from "../Pages/Checkout/Checkout";
import Homepage from "../Pages/Homepage/Homepage";
import Products from "../Pages/Product/Products";
import Error from "../Pages/Error";
import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Login from "../Pages/Login_Signup/Login";
import Signup from "../Pages/Login_Signup/Signup.jsx";

const AllRoutes = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route exact path='/' element={<Homepage />} />
				<Route exact path='/signup' element={<Signup />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/checkout' element={<Checkout />} />
				<Route exact path='/product' element={<Products />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</div>
	);
};

export default AllRoutes;
