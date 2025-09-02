import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddresses, addAddress } from "../../Redux/AddressReducer/action.js";
import { createOrder } from "../../Redux/OrderReducer/action.js";
import { getCartData } from "../../Redux/AppReducer/action.js";
import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	VStack,
	HStack,
	Heading,
	Text,
	Grid,
	GridItem,
	Icon,
	useToast,
	useColorModeValue,
	Divider,
	Badge,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure
} from "@chakra-ui/react";
import { 
	FiMapPin, 
	FiCreditCard, 
	FiTruck, 
	FiCheckCircle,
	FiHome,
	FiNavigation,
	FiMap,
	FiGlobe,
	FiMail,
	FiPhone,
	FiPlus,
	FiUser
} from "react-icons/fi";

const Checkout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const { isOpen, onClose } = useDisclosure();
	
	// Redux state
	const { cart } = useSelector(state => state.getCartReducer);
	const { addresses, isLoading: addressLoading } = useSelector(state => state.addressReducer);

	// Color mode values
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");

	const initialState = {
		fullName: "",
		phone: "",
		addressLine1: "",
		addressLine2: "",
		landmark: "",
		city: "",
		pinCode: "",
		state: "",
		country: "India",
		addressType: "home"
	};

	const [addressDetails, setAddressDetails] = useState(initialState);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);

	// Load addresses on component mount
	useEffect(() => {
		dispatch(getAddresses());
	}, [dispatch]);

	// Set default address when addresses are loaded
	useEffect(() => {
		if (addresses.length > 0 && !selectedAddress) {
			const defaultAddr = addresses.find(addr => addr.isDefault) || addresses[0];
			setSelectedAddress(defaultAddr);
		}
	}, [addresses, selectedAddress]);

	const handleChange = (e) => {
		setAddressDetails({
			...addressDetails,
			[e.target.name]: e.target.value
		});
	};

	const handleAddAddress = async () => {
		// Basic validation
		const requiredFields = ['fullName', 'phone', 'addressLine1', 'city', 'pinCode', 'state'];
		const missingFields = requiredFields.filter(field => !addressDetails[field]);
		
		if (missingFields.length > 0) {
			toast({
				title: "Missing Information",
				description: `Please fill in: ${missingFields.join(', ')}`,
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		try {
			await dispatch(addAddress(addressDetails));
			setAddressDetails(initialState);
			setShowAddressForm(false);
			toast({
				title: "Address Added",
				description: "New address has been added successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to add address",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleSubmit = async () => {
		if (!selectedAddress) {
			toast({
				title: "No Address Selected",
				description: "Please select a delivery address",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		if (!cart || cart.length === 0) {
			toast({
				title: "Empty Cart",
				description: "Your cart is empty",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		setIsSubmitting(true);
		
		try {
			const orderData = {
				shippingAddressId: selectedAddress._id,
				billingAddressId: selectedAddress._id, // Same as shipping for now
				paymentMethod: "cod",
				notes: ""
			};

			const result = await dispatch(createOrder(orderData));
			
			toast({
				title: "Order Placed Successfully!",
				description: `Your order ID is: ${result.data.orderId}`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});

			// Refresh cart data
			dispatch(getCartData());
			
			// Navigate to order confirmation or home
			navigate("/");
			
		} catch (error) {
			toast({
				title: "Order Failed",
				description: error.message || "Failed to place order. Please try again.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Calculate order total - handle both old and new cart structures
	const orderTotal = cart?.reduce((sum, item) => {
		if (item.totalPrice) {
			return sum + Number(item.totalPrice);
		}
		return sum + (Number(item.productPrice || item.prod_price || 0) * Number(item.count || 1));
	}, 0) || 0;

	return (
		<Box bg={bgColor} minH="100vh" py="8">
			<Container maxW="6xl">
				<Heading size="xl" mb="8" color={textColor} textAlign="center">
					<Icon as={FiCreditCard} mr="3" color="green.500" />
					Checkout
				</Heading>

				<Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap="8">
					{/* Checkout Form */}
					<GridItem>
						<Box
							bg={cardBg}
							p="8"
							borderRadius="2xl"
							boxShadow="lg"
							border="1px solid"
							borderColor={borderColor}
						>
							<Heading size="lg" mb="6" color={textColor} display="flex" alignItems="center" justifyContent="space-between">
								<HStack>
									<Icon as={FiMapPin} mr="2" color="blue.500" />
									Delivery Address
								</HStack>
								<Button
									size="sm"
									colorScheme="blue"
									variant="outline"
									leftIcon={<Icon as={FiPlus} />}
									onClick={() => setShowAddressForm(!showAddressForm)}
								>
									{showAddressForm ? "Cancel" : "Add New"}
								</Button>
							</Heading>

							{/* Address Selection */}
							{!showAddressForm && (
								<VStack spacing="4" align="stretch">
									{addresses.length > 0 ? (
										addresses.map((address) => (
											<Box
												key={address._id}
												p="4"
												border="2px solid"
												borderColor={selectedAddress?._id === address._id ? "blue.500" : borderColor}
												borderRadius="lg"
												cursor="pointer"
												onClick={() => setSelectedAddress(address)}
												_hover={{
													borderColor: "blue.300",
													transform: "translateY(-1px)",
													transition: "all 0.2s ease"
												}}
												transition="all 0.2s ease"
												bg={selectedAddress?._id === address._id ? "blue.50" : cardBg}
											>
												<HStack justify="space-between" align="start">
													<VStack align="start" spacing="2" flex="1">
														<HStack>
															<Text fontWeight="bold" color={textColor}>
																{address.fullName}
															</Text>
															{address.isDefault && (
																<Badge colorScheme="green" size="sm">Default</Badge>
															)}
															<Badge colorScheme="blue" size="sm" variant="outline">
																{address.addressType}
															</Badge>
														</HStack>
														<Text color={textColor}>
															{address.addressLine1}
															{address.addressLine2 && `, ${address.addressLine2}`}
														</Text>
														{address.landmark && (
															<Text fontSize="sm" color="gray.500">
																Near: {address.landmark}
															</Text>
														)}
														<Text color={textColor}>
															{address.city}, {address.state} - {address.pinCode}
														</Text>
														<Text color={textColor} fontSize="sm">
															<Icon as={FiPhone} mr="1" />
															{address.phone}
														</Text>
													</VStack>
													{selectedAddress?._id === address._id && (
														<Icon as={FiCheckCircle} color="blue.500" boxSize="5" />
													)}
												</HStack>
											</Box>
										))
									) : (
										<Alert status="info" borderRadius="lg">
											<AlertIcon />
											<Box>
												<AlertTitle>No addresses found!</AlertTitle>
												<AlertDescription>
													Please add a delivery address to continue.
												</AlertDescription>
											</Box>
										</Alert>
									)}
								</VStack>
							)}

							{/* Add New Address Form */}
							{showAddressForm && (
								<VStack spacing="6" align="stretch">
									<Heading size="md" color={textColor}>
										Add New Address
									</Heading>
									{/* Full Name and Phone */}
									<Grid templateColumns="1fr 1fr" gap="4">
										<FormControl isRequired>
											<FormLabel color={textColor} fontWeight="medium">
												<Icon as={FiUser} mr="2" />
												Full Name
											</FormLabel>
											<Input
												type="text"
												name="fullName"
												value={addressDetails.fullName}
												onChange={handleChange}
												placeholder="Enter full name"
												size="lg"
												borderRadius="lg"
												border="2px solid"
												borderColor="gray.200"
												_focus={{
													borderColor: "blue.500",
													boxShadow: "0 0 0 1px blue.500"
												}}
											/>
										</FormControl>
										<FormControl isRequired>
											<FormLabel color={textColor} fontWeight="medium">
												<Icon as={FiPhone} mr="2" />
												Phone Number
											</FormLabel>
											<Input
												type="tel"
												name="phone"
												value={addressDetails.phone}
												onChange={handleChange}
												placeholder="Enter phone number"
												size="lg"
												borderRadius="lg"
												border="2px solid"
												borderColor="gray.200"
												_focus={{
													borderColor: "blue.500",
													boxShadow: "0 0 0 1px blue.500"
												}}
											/>
										</FormControl>
									</Grid>

									{/* Address Line 1 */}
									<FormControl isRequired>
										<FormLabel color={textColor} fontWeight="medium">
											<Icon as={FiHome} mr="2" />
											Address Line 1
										</FormLabel>
										<Input
											type="text"
											name="addressLine1"
											value={addressDetails.addressLine1}
											onChange={handleChange}
											placeholder="Street address, apartment, suite, etc."
											size="lg"
											borderRadius="lg"
											border="2px solid"
											borderColor="gray.200"
											_focus={{
												borderColor: "blue.500",
												boxShadow: "0 0 0 1px blue.500"
											}}
										/>
									</FormControl>

								{/* Address Line 2 */}
								<FormControl>
									<FormLabel color={textColor} fontWeight="medium">
										<Icon as={FiNavigation} mr="2" />
										Address Line 2 (Optional)
									</FormLabel>
									<Input
										type="text"
										name="addressLine2"
										value={addressDetails.addressLine2}
										onChange={handleChange}
										placeholder="Apartment, suite, unit, etc."
										size="lg"
										borderRadius="lg"
										border="2px solid"
										borderColor="gray.200"
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
									/>
								</FormControl>

								{/* Landmark */}
								<FormControl>
									<FormLabel color={textColor} fontWeight="medium">
										<Icon as={FiMap} mr="2" />
										Landmark (Optional)
									</FormLabel>
									<Input
										type="text"
										name="landmark"
										value={addressDetails.landmark}
										onChange={handleChange}
										placeholder="Near hospital, school, etc."
										size="lg"
										borderRadius="lg"
										border="2px solid"
										borderColor="gray.200"
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
									/>
								</FormControl>

								{/* City and Pin Code */}
								<Grid templateColumns="1fr 1fr" gap="4">
									<FormControl isRequired>
										<FormLabel color={textColor} fontWeight="medium">
											<Icon as={FiGlobe} mr="2" />
											City
										</FormLabel>
										<Input
											type="text"
											name="city"
											value={addressDetails.city}
											onChange={handleChange}
											placeholder="Enter city name"
											size="lg"
											borderRadius="lg"
											border="2px solid"
											borderColor="gray.200"
											_focus={{
												borderColor: "blue.500",
												boxShadow: "0 0 0 1px blue.500"
											}}
										/>
									</FormControl>

									<FormControl isRequired>
										<FormLabel color={textColor} fontWeight="medium">
											<Icon as={FiMapPin} mr="2" />
											Pin Code
										</FormLabel>
										<Input
											type="text"
											name="pinCode"
											value={addressDetails.pinCode}
											onChange={handleChange}
											placeholder="Enter pin code"
											size="lg"
											borderRadius="lg"
											border="2px solid"
											borderColor="gray.200"
											_focus={{
												borderColor: "blue.500",
												boxShadow: "0 0 0 1px blue.500"
											}}
										/>
									</FormControl>
								</Grid>

								{/* State and Phone */}
								<Grid templateColumns="1fr 1fr" gap="4">
									<FormControl isRequired>
										<FormLabel color={textColor} fontWeight="medium">
											<Icon as={FiGlobe} mr="2" />
											State
										</FormLabel>
										<Input
											type="text"
											name="state"
											value={addressDetails.state}
											onChange={handleChange}
											placeholder="Enter state name"
											size="lg"
											borderRadius="lg"
											border="2px solid"
											borderColor="gray.200"
											_focus={{
												borderColor: "blue.500",
												boxShadow: "0 0 0 1px blue.500"
											}}
										/>
									</FormControl>

									<FormControl isRequired>
										<FormLabel color={textColor} fontWeight="medium">
											<Icon as={FiPhone} mr="2" />
											Phone Number
										</FormLabel>
										<Input
											type="tel"
											name="phone"
											value={addressDetails.phone}
											onChange={handleChange}
											placeholder="Enter phone number"
											size="lg"
											borderRadius="lg"
											border="2px solid"
											borderColor="gray.200"
											_focus={{
												borderColor: "blue.500",
												boxShadow: "0 0 0 1px blue.500"
											}}
										/>
									</FormControl>
								</Grid>

								{/* Email */}
								<FormControl>
									<FormLabel color={textColor} fontWeight="medium">
										<Icon as={FiMail} mr="2" />
										Email (Optional)
									</FormLabel>
									<Input
										type="email"
										name="email"
										value={addressDetails.email}
										onChange={handleChange}
										placeholder="Enter email address"
										size="lg"
										borderRadius="lg"
										border="2px solid"
										borderColor="gray.200"
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
									/>
								</FormControl>

								{/* Submit Button */}
								<Button
									colorScheme="blue"
									size="lg"
									onClick={handleAddAddress}
									isLoading={addressLoading}
									borderRadius="xl"
									_hover={{
										transform: "translateY(-1px)",
										boxShadow: "lg"
									}}
									transition="all 0.2s ease"
								>
									Add Address
								</Button>
							</VStack>
							)}
						</Box>
					</GridItem>

					{/* Order Summary */}
					<GridItem>
						<Box
							bg={cardBg}
							p="6"
							borderRadius="2xl"
							boxShadow="lg"
							border="1px solid"
							borderColor={borderColor}
							position="sticky"
							top="8"
							h="fit-content"
						>
							<Heading size="lg" mb="6" color={textColor}>
								<Icon as={FiTruck} mr="2" color="orange.500" />
								Order Summary
							</Heading>

							<VStack spacing="4" align="stretch">
								{/* Order Items */}
								<Box>
									<Text fontWeight="semibold" color={textColor} mb="3">
										Items ({cart?.length || 0})
									</Text>
									<VStack spacing="2" align="stretch">
										{cart?.map((item, index) => (
											<HStack key={index} justify="space-between">
												<VStack align="start" spacing="0" flex="1">
													<Text fontSize="sm" color="gray.600" noOfLines={1}>
														{item.productName || item.prod_name}
													</Text>
													{item.count > 1 && (
														<Text fontSize="xs" color="gray.500">
															Qty: {item.count}
														</Text>
													)}
												</VStack>
												<Text fontSize="sm" fontWeight="semibold">
													₹{item.totalPrice || (Number(item.productPrice || item.prod_price || 0) * Number(item.count || 1))}
												</Text>
											</HStack>
										))}
									</VStack>
								</Box>

								<Divider />

								{/* Total */}
								<HStack justify="space-between">
									<Text fontSize="lg" fontWeight="bold" color={textColor}>
										Total Amount
									</Text>
									<Text fontSize="xl" fontWeight="bold" color="blue.600">
										₹{orderTotal}
									</Text>
								</HStack>

								{/* Delivery Info */}
								<Box p="4" bg="blue.50" borderRadius="lg" border="1px solid" borderColor="blue.200">
									<HStack spacing="2" color="blue.700">
										<Icon as={FiTruck} />
										<Text fontSize="sm" fontWeight="medium">
											Free Delivery
										</Text>
									</HStack>
									<Text fontSize="xs" color="blue.600" mt="1">
										Estimated delivery: 3-5 business days
									</Text>
								</Box>

								{/* Place Order Button */}
								<Button
									size="lg"
									bgGradient="linear(to-r, green.500, teal.500)"
									color="white"
									onClick={handleSubmit}
									isLoading={isSubmitting}
									loadingText="Placing Order..."
									_hover={{
										bgGradient: "linear(to-r, green.600, teal.600)",
										transform: "translateY(-2px)"
									}}
									borderRadius="xl"
									py="6"
									fontSize="lg"
									fontWeight="bold"
									transition="all 0.3s ease"
								>
									<Icon as={FiCheckCircle} mr="2" />
									Place Order
								</Button>
							</VStack>
						</Box>
					</GridItem>
				</Grid>
			</Container>

			{/* Success Modal */}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent borderRadius="2xl">
					<ModalHeader textAlign="center" color="green.500">
						<Icon as={FiCheckCircle} mr="2" boxSize="6" />
						Order Confirmed!
					</ModalHeader>
					<ModalBody textAlign="center">
						<VStack spacing="4">
							<Box
								w="20"
								h="20"
								bgGradient="linear(to-br, green.400, teal.400)"
								borderRadius="full"
								display="flex"
								alignItems="center"
								justifyContent="center"
								boxShadow="xl"
							>
								<Icon as={FiCheckCircle} boxSize="10" color="white" />
							</Box>
							<Text fontSize="lg" color="gray.600">
								Your order has been successfully placed! You will receive a confirmation email shortly.
							</Text>
							<Badge colorScheme="green" variant="subtle" borderRadius="full" px="4" py="2">
								Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
							</Badge>
						</VStack>
					</ModalBody>
					<ModalFooter justifyContent="center">
						<Button
							colorScheme="blue"
							onClick={() => {
								onClose();
								navigate('/');
							}}
							borderRadius="xl"
						>
							Continue Shopping
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Checkout;
