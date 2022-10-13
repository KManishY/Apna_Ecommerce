import { Route, Routes } from "react-router-dom";
import Checkout from "../Pages/Checkout/Checkout";
import Homepage from "../Pages/Homepage/Homepage";
import Products from "../Pages/Product/Products";
import Error from "../Pages/Error";
import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Login from "../Pages/Login_Signup/Login";
import Signup from "../Pages/Login_Signup/Signup.jsx";
import Cart from "../Pages/Cart/Cart.jsx";
import SinglePage from "../Pages/SinglePage/SinglePage.jsx";
import styled from "./route.module.css";
const AllRoutes = () => {
	return (
		<div>
			<Navbar />
			<div className={styled.screenSize}>
				<Routes>
					<Route exact path='/' element={<Homepage />} />
					<Route exact path='/signup' element={<Signup />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='/checkout' element={<Checkout />} />
					<Route exact path='/product' element={<Products />} />
					<Route
						exact
						path='/singleProduct/:id'
						element={<SinglePage />}
					/>
					<Route exact path='/cart' element={<Cart />} />
					<Route path='*' element={<Error />} />
				</Routes>
			</div>
		</div>
	);
};

export default AllRoutes;
