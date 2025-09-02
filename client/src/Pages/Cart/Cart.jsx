import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartData, getCartData } from "../../Redux/AppReducer/action.js";
import { Link, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Heading,
	Text,
	VStack,
	HStack,
	Flex,
	Container,
	Image,
	IconButton,
	Badge,
	Divider,
	Input,
	Icon,
	useToast,
	useColorModeValue,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Spinner,
	Center,
	Code
} from "@chakra-ui/react";
import { 
	FiTrash2, 
	FiShoppingCart, 
	FiTag, 
	FiCreditCard, 
	FiArrowRight,
	FiMinus,
	FiPlus,
	FiPackage,
	FiRefreshCw,
	FiSettings
} from "react-icons/fi";
import Checkout from "../Checkout/Checkout.jsx";
import { baseURL } from "../../apiConfig.js";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [debugInfo, setDebugInfo] = useState({});
	const cartState = useSelector((state) => state.getCartReducer);
	
	// Destructure cart state for better debugging
	const { cart, isLoading: isCartLoading, isError, errorMessage } = cartState;

	// Color mode values
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");

	// Debug logging
	console.log("Cart State:", cartState);
	console.log("Cart Data:", cart);
	console.log("Is Loading:", isCartLoading);
	console.log("Is Error:", isError);
	console.log("Error Message:", errorMessage);

	// Safely get cart data and ensure it's an array
	const safeCart = Array.isArray(cart) ? cart : [];
	const isCartError = isError || cart === "Please Login Again" || cart === "Please Login";

	// Calculate totals safely
	const total_price = safeCart.reduce((sum, item) => sum + Number(item.prod_price || 0), 0);
	const after_Discount_price = safeCart.reduce(
		(sum, item) => {
			const price = Number(item.prod_price || 0);
			const discount = Number(item.prod_discount || 0);
			return sum + (price - (price * discount / 100));
		},
		0
	);
	const discount_rupee = (total_price - after_Discount_price).toFixed(2);
	const GST = ((total_price * 8) / 100).toFixed(2);
	const finalTotal = (after_Discount_price + Number(GST)).toFixed(2);

	const handleDelete = async (itemId) => {
		setIsLoading(true);
		try {
			const query = { params: itemId };
			await dispatch(deleteCartData(query));
			await dispatch(getCartData());
			
			toast({
				title: "Item removed",
				description: "Product has been removed from your cart",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to remove item from cart",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleCheckout = () => {
		setShow(true);
	};

	const handleRefreshCart = () => {
		toast({
			title: "Refreshing cart...",
			description: "Fetching latest cart data",
			status: "info",
			duration: 2000,
			isClosable: true,
		});
		dispatch(getCartData());
	};

	const handleTestCartAPI = async () => {
		try {
			const token = localStorage.getItem("token");
			console.log(token,"token")
			const response = await fetch(baseURL + "/userDashboard/cart", {
				method: "GET",
				headers: {
					"Authorization": token,
					"Content-Type": "application/json"
				}
			});
			
			const data = await response.text();
			console.log("Raw API Response:", data);
			console.log("Response Status:", response.status);
			console.log("Response Headers:", response.headers);
			
			setDebugInfo({
				status: response.status,
				statusText: response.statusText,
				rawData: data,
				token: token ? "Present" : "Missing",
				tokenLength: token ? token.length : 0
			});
			
			toast({
				title: "API Test Complete",
				description: `Status: ${response.status} - ${response.statusText}`,
				status: response.ok ? "success" : "error",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			console.error("API Test Error:", error);
			setDebugInfo({
				error: error.message,
				token: localStorage.getItem("token") ? "Present" : "Missing"
			});
			
			toast({
				title: "API Test Failed",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	useEffect(() => {
		// Check if user is logged in
		const token = localStorage.getItem("token");
		if (!token) {
			toast({
				title: "Please login first",
				description: "You need to be logged in to view your cart",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			navigate("/login");
			return;
		}

		// Fetch cart data
		dispatch(getCartData());
	}, [dispatch, navigate, toast]);

	// Handle authentication errors
	if (isCartError) {
		return (
			<Box bg={bgColor} minH="100vh" py="8">
				<Container maxW="4xl">
					<Center py="20">
						<VStack spacing="8" textAlign="center">
							<Box
								w="32"
								h="32"
								bgGradient="linear(to-br, red.400, orange.400)"
								borderRadius="full"
								display="flex"
								alignItems="center"
								justifyContent="center"
								boxShadow="2xl"
							>
								<Icon as={FiShoppingCart} boxSize="16" color="white" />
							</Box>
							<Heading size="xl" color={textColor}>
								Cart Access Issue
							</Heading>
							<Text fontSize="lg" color="gray.500" maxW="md">
								{errorMessage || "There was an issue accessing your cart. This might be due to authentication or server issues."}
							</Text>
							
							{/* Debug Information */}
							<Box p="4" bg="gray.100" borderRadius="lg" textAlign="left" maxW="md">
								<Text fontSize="sm" fontWeight="bold" mb="2">Debug Info:</Text>
								<Text fontSize="xs" color="gray.600">Token: {localStorage.getItem("token") ? "Present" : "Missing"}</Text>
								<Text fontSize="xs" color="gray.600">Cart State: {JSON.stringify(cartState, null, 2)}</Text>
								{Object.keys(debugInfo).length > 0 && (
									<>
										<Text fontSize="xs" color="gray.600" mt="2">API Test Results:</Text>
										<Code fontSize="xs" p="2" bg="gray.200" borderRadius="md" display="block" whiteSpace="pre-wrap">
											{JSON.stringify(debugInfo, null, 2)}
										</Code>
									</>
								)}
							</Box>
							
							<VStack spacing="4">
								<Button
									onClick={handleTestCartAPI}
									size="lg"
									bgGradient="linear(to-r, orange.500, red.500)"
									color="white"
									_hover={{
										bgGradient: "linear(to-r, orange.600, red.600)",
										transform: "translateY(-2px)"
									}}
									leftIcon={<Icon as={FiSettings} />}
									borderRadius="xl"
									transition="all 0.3s ease"
								>
									Debug Cart
								</Button>
								
								<Button
									onClick={handleRefreshCart}
									size="lg"
									bgGradient="linear(to-r, blue.500, purple.500)"
									color="white"
									_hover={{
										bgGradient: "linear(to-r, blue.600, purple.600)",
										transform: "translateY(-2px)"
									}}
									leftIcon={<Icon as={FiRefreshCw} />}
									borderRadius="xl"
									transition="all 0.3s ease"
								>
									Refresh Cart
								</Button>
								
								<Button
									as={Link}
									to="/login"
									variant="outline"
									colorScheme="blue"
									borderRadius="xl"
									_hover={{
										bg: "blue.50",
										borderColor: "blue.300"
									}}
								>
									Go to Login
								</Button>
							</VStack>
						</VStack>
					</Center>
				</Container>
			</Box>
		);
	}

	// Loading state
	if (isCartLoading) {
		return (
			<Box bg={bgColor} minH="100vh" py="8">
				<Container maxW="4xl">
					<Center py="20">
						<VStack spacing="8" textAlign="center">
							<Spinner size="xl" color="blue.500" />
							<Text fontSize="lg" color="gray.500">
								Loading your cart...
							</Text>
						</VStack>
					</Center>
				</Container>
			</Box>
		);
	}

	// Empty cart state
	if (safeCart.length === 0) {
		return (
			<Box bg={bgColor} minH="100vh" py="8">
				<Container maxW="4xl">
					<Center py="20">
						<VStack spacing="8" textAlign="center">
							<Box
								w="32"
								h="32"
								bgGradient="linear(to-br, blue.400, purple.400)"
								borderRadius="full"
								display="flex"
								alignItems="center"
								justifyContent="center"
								boxShadow="2xl"
							>
								<Icon as={FiShoppingCart} boxSize="16" color="white" />
							</Box>
							<Heading size="xl" color={textColor}>
								Your cart is empty
							</Heading>
							<Text fontSize="lg" color="gray.500" maxW="md">
								Looks like you haven't added any products to your cart yet. 
								Start shopping to fill it up!
							</Text>
							<Button
								as={Link}
								to="/product"
								size="lg"
								bgGradient="linear(to-r, blue.500, purple.500)"
								color="white"
								_hover={{
									bgGradient: "linear(to-r, blue.600, purple.600)",
									transform: "translateY(-2px)"
								}}
								leftIcon={<Icon as={FiPackage} />}
								borderRadius="xl"
								transition="all 0.3s ease"
							>
								Start Shopping
							</Button>
						</VStack>
					</Center>
				</Container>
			</Box>
		);
	}

	return (
		<Box bg={bgColor} minH="100vh" py="8">
			<Container maxW="7xl">
				<Flex justify="space-between" align="center" mb="8">
					<Heading size="xl" color={textColor}>
						<Icon as={FiShoppingCart} mr="3" color="blue.500" />
						Shopping Cart ({safeCart.length} items)
					</Heading>
					
					<HStack spacing="4">
						<Button
							onClick={handleTestCartAPI}
							variant="outline"
							colorScheme="orange"
							leftIcon={<Icon as={FiSettings} />}
							borderRadius="xl"
							_hover={{
								bg: "orange.50",
								borderColor: "orange.300"
							}}
						>
							Debug
						</Button>
						
						<Button
							onClick={handleRefreshCart}
							variant="outline"
							colorScheme="blue"
							leftIcon={<Icon as={FiRefreshCw} />}
							borderRadius="xl"
							_hover={{
								bg: "blue.50",
								borderColor: "blue.300"
							}}
						>
							Refresh
						</Button>
					</HStack>
				</Flex>

				<Flex direction={{ base: "column", lg: "row" }} gap="8">
					{/* Cart Items */}
					<Box flex="1">
						<VStack spacing="4" align="stretch">
							{safeCart.map((item) => (
								<Box
									key={item._id}
									bg={cardBg}
									p="6"
									borderRadius="xl"
									boxShadow="lg"
									border="1px solid"
									borderColor={borderColor}
									_hover={{
										boxShadow: "xl",
										transform: "translateY(-2px)",
										transition: "all 0.3s ease"
									}}
									transition="all 0.3s ease"
								>
									<Flex direction={{ base: "column", md: "row" }} gap="6">
										{/* Product Image */}
										<Link to={`/singleProduct/${item.prod_id}`}>
											<Image
												src={item.prod_image}
												alt={item.prod_name}
												w="32"
												h="32"
												objectFit="cover"
												borderRadius="lg"
												_hover={{
													transform: "scale(1.05)",
													transition: "transform 0.3s ease"
												}}
												transition="transform 0.3s ease"
											/>
										</Link>

										{/* Product Details */}
										<Box flex="1">
											<VStack align="stretch" spacing="4">
												<Link to={`/singleProduct/${item.prod_id}`}>
													<Heading size="md" color={textColor} _hover={{ color: "blue.500" }}>
														{item.prod_name}
													</Heading>
												</Link>

												{/* Price and Discount */}
												<HStack justify="space-between" align="center">
													<VStack align="start" spacing="1">
														<Text fontSize="lg" fontWeight="bold" color="blue.600">
															₹{item.prod_price}
														</Text>
														{item.prod_discount > 0 && (
															<Badge colorScheme="green" variant="subtle" borderRadius="full">
																{item.prod_discount}% OFF
															</Badge>
														)}
													</VStack>

													<IconButton
														icon={<Icon as={FiTrash2} />}
														colorScheme="red"
														variant="outline"
														onClick={() => handleDelete(item.prod_id)}
														isLoading={isLoading}
														aria-label="Remove item"
														borderRadius="full"
														_hover={{
															bg: "red.50",
															borderColor: "red.300"
														}}
													/>
												</HStack>
											</VStack>
										</Box>
									</Flex>
								</Box>
							))}
						</VStack>
					</Box>

					{/* Order Summary Sidebar */}
					<Box w={{ base: "full", lg: "400px" }} flexShrink="0">
						<Box
							bg={cardBg}
							p="6"
							borderRadius="2xl"
							boxShadow="lg"
							border="1px solid"
							borderColor={borderColor}
							position={{ base: "static", lg: "sticky" }}
							top="8"
						>
							<Heading size="lg" mb="6" color={textColor}>
								<Icon as={FiCreditCard} mr="2" color="green.500" />
								Order Summary
							</Heading>

							<VStack spacing="4" align="stretch">
								{/* Price Breakdown */}
								<Box>
									<HStack justify="space-between" py="2">
										<Text color={textColor}>Subtotal</Text>
										<Text fontWeight="semibold">₹{total_price.toFixed(2)}</Text>
									</HStack>
									
									<HStack justify="space-between" py="2">
										<Text color={textColor}>Discount</Text>
										<Text color="green.500" fontWeight="semibold">
											-₹{discount_rupee}
										</Text>
									</HStack>
									
									<HStack justify="space-between" py="2">
										<Text color={textColor}>GST (8%)</Text>
										<Text color="orange.500" fontWeight="semibold">₹{GST}</Text>
									</HStack>
									
									<Divider my="3" />
									
									<HStack justify="space-between" py="2">
										<Text fontSize="lg" fontWeight="bold" color={textColor}>
											Total
										</Text>
										<Text fontSize="xl" fontWeight="bold" color="blue.600">
											₹{finalTotal}
										</Text>
									</HStack>
								</Box>

								{/* Coupon Code */}
								<Box>
									<Text fontSize="sm" color="gray.500" mb="2">
										Have a coupon code?
									</Text>
									<HStack>
										<Input
											placeholder="Enter coupon code"
											borderRadius="lg"
											border="2px solid"
											borderColor="gray.200"
											_focus={{
												borderColor: "blue.500",
												boxShadow: "0 0 0 1px blue.500"
											}}
										/>
										<Button
											colorScheme="blue"
											borderRadius="lg"
											px="6"
											_hover={{
												transform: "translateY(-1px)"
											}}
										>
											Apply
										</Button>
									</HStack>
								</Box>

								{/* Checkout Button */}
								<Button
									size="lg"
									bgGradient="linear(to-r, green.500, teal.500)"
									color="white"
									_hover={{
										bgGradient: "linear(to-r, green.600, teal.600)",
										transform: "translateY(-2px)",
										boxShadow: "lg"
									}}
									onClick={handleCheckout}
									rightIcon={<Icon as={FiArrowRight} />}
									borderRadius="xl"
									py="6"
									fontSize="lg"
									fontWeight="bold"
									transition="all 0.3s ease"
								>
									Proceed to Checkout
								</Button>

								{/* Continue Shopping */}
								<Button
									as={Link}
									to="/product"
									variant="outline"
									colorScheme="blue"
									borderRadius="xl"
									_hover={{
										bg: "blue.50",
										borderColor: "blue.300"
									}}
								>
									Continue Shopping
								</Button>
							</VStack>
						</Box>
					</Box>
				</Flex>

				{/* Checkout Modal */}
				{show && <Checkout />}
			</Container>
		</Box>
	);
};

export default Cart;
