import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/Layout/AdminLayout";
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Order from "../pages/Orders/Order.jsx";
import AddProduct from "../pages/Products/AddProduct.jsx";
import EditProduct from "../pages/Products/EditProduct.jsx";
import Product from "../pages/Products/Product.jsx";
import User from "../pages/Users/User.jsx";
import PrivateRoute from "../Private/Private.jsx";

const AllRoute = () => {
	return (
		<Routes>
			<Route exact path="/login" element={<Login />} />
			
			{/* Protected Routes with Admin Layout */}
			<Route
				path="/*"
				element={
					<PrivateRoute>
						<AdminLayout>
							<Routes>
								<Route exact path="/" element={<Dashboard />} />
								<Route exact path="/products" element={<Product />} />
								<Route exact path="/order" element={<Order />} />
								<Route exact path="/addProduct" element={<AddProduct />} />
								<Route exact path="/user" element={<User />} />
								<Route exact path="/editproduct/:id" element={<EditProduct />} />
							</Routes>
						</AdminLayout>
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default AllRoute;
