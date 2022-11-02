import { Flex } from "@chakra-ui/react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Login from "../pages/Login/Login.jsx";
import Order from "../pages/Orders/Order.jsx";
import AddProduct from "../pages/Products/AddProduct.jsx";
import EditProduct from "../pages/Products/EditProduct.jsx";
import Product from "../pages/Products/Product.jsx";
import User from "../pages/Users/User.jsx";
import PrivateRoute from "../Private/Private.jsx";

const AllRoute = () => {
	return (
		<div>
			<Flex>
				<Sidebar />
				<div style={{ width: "100%" }}>
					{" "}<Routes>
						<Route
							exact
							path="/"
							element={
								<PrivateRoute>
									<Product />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/order"
							element={
								<PrivateRoute>
									<Order />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/addProduct"
							element={
								<PrivateRoute>
									<AddProduct />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/user"
							element={
								<PrivateRoute>
									<User />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/editproduct/:id"
							element={
								<PrivateRoute>
									<EditProduct />
								</PrivateRoute>
							}
						/>
						<Route exact path="/login" element={<Login />} />
					</Routes>
				</div>
			</Flex>
		</div>
	);
};

export default AllRoute;
