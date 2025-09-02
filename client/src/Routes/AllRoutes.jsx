import { Route, Routes, useLocation } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Navbar from "../Components/Navbar.jsx";
import {
	Box,
	Center,
	Spinner,
	Text,
	VStack,
	useColorModeValue
} from "@chakra-ui/react";

// Lazy load all page components
const Checkout = lazy(() => import("../Pages/Checkout/Checkout"));
const Homepage = lazy(() => import("../Pages/Homepage/Homepage"));
const Products = lazy(() => import("../Pages/Product/Products"));
const Error = lazy(() => import("../Pages/Error"));
const Login = lazy(() => import("../Pages/Login_Signup/Login"));
const Signup = lazy(() => import("../Pages/Login_Signup/Signup.jsx"));
const Cart = lazy(() => import("../Pages/Cart/Cart.jsx"));
const SinglePage = lazy(() => import("../Pages/SinglePage/SinglePage.jsx"));

// Modern loading component with Chakra UI
const LoadingSpinner = () => {
	const textColor = useColorModeValue("gray.600", "gray.300");
	
	return (
		<Center h="50vh">
			<VStack spacing="4">
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
				<Text fontSize="lg" color={textColor} fontWeight="medium">
					Loading...
				</Text>
			</VStack>
		</Center>
	);
};

const AllRoutes = () => {
	const location = useLocation();
	
	// Routes where navbar should be hidden
	const hideNavbarRoutes = ['/login', '/signup', '/error'];
	
	// Check if current route should hide navbar
	const shouldHideNavbar = hideNavbarRoutes.some(route => 
		location.pathname === route || location.pathname.startsWith('/error')
	);

	return (
		<Box>
			{/* Conditionally render navbar */}
			{!shouldHideNavbar && <Navbar />}
			
			{/* Main content area */}
			<Box>
				<Suspense fallback={<LoadingSpinner />}>
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
				</Suspense>
			</Box>
		</Box>
	);
};

export default AllRoutes;
