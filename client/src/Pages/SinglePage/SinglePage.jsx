import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
	Box,
	Button,
	Container,
	VStack,
	HStack,
	Heading,
	Text,
	Image,
	Badge,
	Icon,
	useToast,
	useColorModeValue,
	Divider,
	SimpleGrid,
	Flex,
	Spinner,
	Center,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton
} from "@chakra-ui/react";
import { 
	FiArrowLeft, 
	FiShoppingCart, 
	FiHeart, 
	FiStar, 
	FiTag, 
	FiPackage,
	FiTruck,
	FiShield,
	FiCheckCircle,
	FiShare2
} from "react-icons/fi";
import { postCartData, getCartData } from "../../Redux/AppReducer/action.js";

const SinglePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data } = useSelector(state => state.productReducer);
	const [quantity, setQuantity] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	// Color mode values
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");

	// Find product by ID
	const product = data?.find(el => el._id === id);

	// Handle add to cart
	const handleAddToCart = async () => {
		const token = localStorage.getItem("token");
		
		if (!token) {
			toast({
				title: "Please login first",
				description: "You need to be logged in to add items to cart",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		setIsLoading(true);
		try {
			const payload = { token: token, data: product };
			await dispatch(postCartData(payload));
			await dispatch(getCartData());
			
			toast({
				title: "Added to cart!",
				description: `${product.prod_name} has been added to your cart`,
				status: "success",
				duration: 2000,
				isClosable: true,
			});
			
			onOpen(); // Show success modal
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to add item to cart",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Handle buy now
	const handleBuyNow = () => {
		const token = localStorage.getItem("token");
		
		if (!token) {
			toast({
				title: "Please login first",
				description: "You need to be logged in to purchase",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		// Add to cart first, then navigate to checkout
		handleAddToCart();
		setTimeout(() => {
			navigate('/checkout');
		}, 1000);
	};

	// Loading state
	if (!product) {
		return (
			<Box bg={bgColor} minH="100vh" py="8">
				<Container maxW="6xl">
					<Center py="20">
						<Spinner size="xl" color="blue.500" />
					</Center>
				</Container>
			</Box>
		);
	}

	// Calculate discounted price
	const discountedPrice = product.prod_price - (product.prod_price * product.prod_discount / 100);

	return (
		<Box bg={bgColor} minH="100vh" py="8">
			<Container maxW="7xl">
				{/* Back Button */}
				<Button
					leftIcon={<Icon as={FiArrowLeft} />}
					variant="ghost"
					colorScheme="blue"
					mb="6"
					onClick={() => navigate(-1)}
					_hover={{ bg: "blue.50" }}
					borderRadius="lg"
				>
					Back
				</Button>

				{/* Product Details */}
				<Box
					bg={cardBg}
					borderRadius="2xl"
					boxShadow="lg"
					border="1px solid"
					borderColor={borderColor}
					overflow="hidden"
				>
					<SimpleGrid columns={{ base: 1, lg: 2 }} spacing="0">
						{/* Product Image */}
						<Box p="8" bg="gray.50">
							<Image
								src={product.prod_image}
								alt={product.prod_name}
								w="full"
								h="96"
								objectFit="cover"
								borderRadius="xl"
								_hover={{
									transform: "scale(1.02)",
									transition: "transform 0.3s ease"
								}}
								transition="transform 0.3s ease"
							/>
						</Box>

						{/* Product Information */}
						<Box p="8">
							<VStack align="stretch" spacing="6">
								{/* Product Header */}
								<Box>
									<HStack spacing="3" mb="3">
										{product.prod_discount > 0 && (
											<Badge
												colorScheme="red"
												variant="solid"
												borderRadius="full"
												px="3"
												py="1"
												fontSize="sm"
												bgGradient="linear(to-r, red.500, pink.500)"
											>
												{product.prod_discount}% OFF
											</Badge>
										)}
										<Badge
											colorScheme="blue"
											variant="subtle"
											borderRadius="full"
											px="3"
											py="1"
											fontSize="sm"
										>
											<Icon as={FiTag} mr="1" />
											{product.prod_cat}
										</Badge>
									</HStack>

									<Heading size="xl" color={textColor} mb="3" lineHeight="1.2">
										{product.prod_name}
									</Heading>

									<HStack spacing="4" mb="4">
										<HStack spacing="1">
											<Icon as={FiStar} color="yellow.400" />
											<Text fontWeight="semibold" color="gray.600">
												{product.prod_rating}
											</Text>
										</HStack>
										<Text color="gray.500">•</Text>
										<Text color="gray.500">Category: {product.prod_cat}</Text>
									</HStack>
								</Box>

								{/* Price Section */}
								<Box>
									<HStack spacing="4" align="baseline">
										<Text fontSize="3xl" fontWeight="bold" color="blue.600">
											₹{discountedPrice.toFixed(2)}
										</Text>
										{product.prod_discount > 0 && (
											<Text fontSize="lg" color="gray.500" textDecoration="line-through">
												₹{product.prod_price}
											</Text>
										)}
									</HStack>
									{product.prod_discount > 0 && (
										<Text color="green.500" fontWeight="medium">
											You save ₹{(product.prod_price - discountedPrice).toFixed(2)}!
										</Text>
									)}
								</Box>

								<Divider />

								{/* Product Description */}
								<Box>
									<Heading size="md" color={textColor} mb="3">
										Description
									</Heading>
									<Text color="gray.600" lineHeight="1.6">
										{product.prod_desc}
									</Text>
								</Box>

								{/* Quantity Selector */}
								<Box>
									<Text fontWeight="medium" color={textColor} mb="3">
										Quantity
									</Text>
									<NumberInput
										value={quantity}
										onChange={(valueString) => setQuantity(parseInt(valueString) || 1)}
										min={1}
										max={99}
										size="lg"
									>
										<NumberInputField borderRadius="lg" />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Box>

								{/* Action Buttons */}
								<VStack spacing="4" align="stretch">
									<Button
										size="lg"
										bgGradient="linear(to-r, blue.500, purple.500)"
										color="white"
										onClick={handleAddToCart}
										isLoading={isLoading}
										loadingText="Adding to Cart..."
										leftIcon={<Icon as={FiShoppingCart} />}
										borderRadius="xl"
										py="6"
										fontSize="lg"
										fontWeight="bold"
										_hover={{
											bgGradient: "linear(to-r, blue.600, purple.600)",
											transform: "translateY(-2px)"
										}}
										transition="all 0.3s ease"
									>
										Add to Cart
									</Button>

									<Button
										size="lg"
										bgGradient="linear(to-r, green.500, teal.500)"
										color="white"
										onClick={handleBuyNow}
										isLoading={isLoading}
										loadingText="Processing..."
										leftIcon={<Icon as={FiCheckCircle} />}
										borderRadius="xl"
										py="6"
										fontSize="lg"
										fontWeight="bold"
										_hover={{
											bgGradient: "linear(to-r, green.600, teal.600)",
											transform: "translateY(-2px)"
										}}
										transition="all 0.3s ease"
									>
										Buy Now
									</Button>

									<HStack spacing="4">
										<Button
											variant="outline"
											colorScheme="red"
											leftIcon={<Icon as={FiHeart} />}
											borderRadius="xl"
											flex="1"
											_hover={{
												bg: "red.50",
												borderColor: "red.300"
											}}
										>
											Wishlist
										</Button>
										<Button
											variant="outline"
											colorScheme="blue"
											leftIcon={<Icon as={FiShare2} />}
											borderRadius="xl"
											flex="1"
											_hover={{
												bg: "blue.50",
												borderColor: "blue.300"
											}}
										>
											Share
										</Button>
									</HStack>
								</VStack>

								<Divider />

								{/* Product Features */}
								<Box>
									<Heading size="md" color={textColor} mb="4">
										Product Features
									</Heading>
									<SimpleGrid columns={2} spacing="4">
										<HStack spacing="3">
											<Icon as={FiPackage} color="blue.500" />
											<Text fontSize="sm" color="gray.600">
												Category: {product.prod_cat}
											</Text>
										</HStack>
										<HStack spacing="3">
											<Icon as={FiStar} color="yellow.500" />
											<Text fontSize="sm" color="gray.600">
												Rating: {product.prod_rating}/5
											</Text>
										</HStack>
										<HStack spacing="3">
											<Icon as={FiTruck} color="green.500" />
											<Text fontSize="sm" color="gray.600">
												Free Shipping
											</Text>
										</HStack>
										<HStack spacing="3">
											<Icon as={FiShield} color="purple.500" />
											<Text fontSize="sm" color="gray.600">
												Secure Payment
											</Text>
										</HStack>
									</SimpleGrid>
								</Box>
							</VStack>
						</Box>
					</SimpleGrid>
				</Box>
			</Container>

			{/* Success Modal */}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent borderRadius="2xl">
					<ModalHeader textAlign="center" color="green.500">
						<Icon as={FiCheckCircle} mr="2" boxSize="6" />
						Added to Cart!
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
								{product.prod_name} has been successfully added to your cart!
							</Text>
						</VStack>
					</ModalBody>
					<ModalFooter justifyContent="center">
						<Button
							colorScheme="blue"
							onClick={() => {
								onClose();
								navigate('/cart');
							}}
							borderRadius="xl"
							mr="3"
						>
							View Cart
						</Button>
						<Button
							variant="outline"
							onClick={onClose}
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

export default SinglePage;
