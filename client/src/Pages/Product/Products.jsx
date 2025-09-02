import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../Components/Filter.jsx";
import {
	getCartData,
	getData,
	postCartData
} from "../../Redux/AppReducer/action.js";
import {
	Box,
	Button,
	Flex,
	Input,
	Text,
	Container,
	SimpleGrid,
	Badge,
	Icon,
	VStack,
	HStack,
	Heading,
	useToast,
	Spinner,
	Center,
	Image,
	Stack,
	Divider,
	useColorModeValue
} from "@chakra-ui/react";
import { BsCartPlusFill } from "react-icons/bs";
import { FiStar, FiSearch, FiTrendingUp, FiZap, FiRefreshCw } from "react-icons/fi";
import PaginationComp from "../../Components/Pagination.jsx";

const Products = () => {
	const dispatch = useDispatch();
	const { data, isLoading, isError, errorMessage } = useSelector((state) => state.productReducer);
	const [globalData, setGlobalData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [searchParams] = useSearchParams();
	const [loadingStates, setLoadingStates] = useState({}); // Individual loading states for each product
	const token = localStorage.getItem("token");
	const toast = useToast();

	// Color mode values
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	// Update globalData when data changes
	useEffect(() => {
		if (data && Array.isArray(data) && data.length > 0) {
			setGlobalData(data);
			setFilterData(data); // Initialize filterData with all data
		}
	}, [data]);

	// Fetch initial data when component mounts
	useEffect(() => {
		dispatch(getData());
	}, [dispatch]);

	// Add to cart function
	const handleClick = async (item) => {
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

		// Set loading state for this specific product
		setLoadingStates(prev => ({ ...prev, [item._id]: true }));
		
		try {
			const payload = { data: item }; // Remove token from payload as it's not needed
			await dispatch(postCartData(payload));
			
			toast({
				title: "Added to cart!",
				description: `${item.prod_name} has been added to your cart`,
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		} catch (error) {
			console.error("Error adding to cart:", error);
			toast({
				title: "Error",
				description: error.message || "Failed to add item to cart",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			// Clear loading state for this specific product
			setLoadingStates(prev => ({ ...prev, [item._id]: false }));
		}
	};

	// Handle input change for filtering data
	const handleInputChange = (e) => {
		const searchText = e.target.value.toLowerCase();
		
		const filteredData = globalData.filter((item) =>
			item.prod_name.toLowerCase().includes(searchText)
		);
		setFilterData(filteredData);
	};

	// Filter data based on search params
	useEffect(() => {
		const category = searchParams.get("category");
		const sort = searchParams.get("sort");
		
		let filtered = globalData;
		
		// Apply category filter
		if (category && category !== "all") {
			filtered = filtered.filter((item) => item.prod_cat === category);
		}
		
		// Apply sorting
		if (sort) {
			switch (sort) {
				case "low":
					filtered = [...filtered].sort((a, b) => a.prod_price - b.prod_price);
					break;
				case "high":
					filtered = [...filtered].sort((a, b) => b.prod_price - a.prod_price);
					break;
				case "rating":
					filtered = [...filtered].sort((a, b) => b.prod_rating - a.prod_rating);
					break;
				default:
					break;
			}
		}
		
		setFilterData(filtered);
	}, [globalData, searchParams]);

	// Product Card Component
	const ProductCard = ({ item }) => {
		const isItemLoading = loadingStates[item._id] || false;
		
		return (
			<Box
				bg={cardBg}
				borderRadius="2xl"
				boxShadow="lg"
				border="1px solid"
				borderColor={borderColor}
				overflow="hidden"
				_hover={{
					boxShadow: "xl",
					transform: "translateY(-4px)",
					transition: "all 0.3s ease"
				}}
				transition="all 0.3s ease"
				position="relative"
			>
				{/* Product Image with Discount Badge */}
				<Box position="relative">
					<Image
						src={item.prod_image}
						alt={item.prod_name}
						w="full"
						h="48"
						objectFit="cover"
					/>
					
					{/* Discount Badge */}
					{item.prod_discount > 0 && (
						<Badge
							position="absolute"
							top="3"
							left="3"
							colorScheme="pink"
							variant="solid"
							borderRadius="full"
							px="3"
							py="1"
							fontSize="xs"
							fontWeight="bold"
						>
							{item.prod_discount}% OFF
						</Badge>
					)}
					
					{/* Loading Overlay */}
					{isItemLoading && (
						<Box
							position="absolute"
							top="3"
							right="3"
							bgGradient="linear(to-r, blue.500, purple.500)"
							color="white"
							px="3"
							py="1"
							borderRadius="full"
							fontSize="xs"
							fontWeight="bold"
							display="flex"
							alignItems="center"
							gap="2"
						>
							<Spinner size="xs" />
							Adding...
						</Box>
					)}
				</Box>

				{/* Product Info */}
				<Box p="4">
					<VStack align="stretch" spacing="3">
						<Heading size="md" noOfLines={2} color="gray.700">
							{item.prod_name}
						</Heading>
						
						<HStack justify="space-between" align="center">
							<Text fontSize="xl" fontWeight="bold" color="blue.600">
								₹{item.prod_price}
							</Text>
							
							<HStack spacing="1">
								<Icon as={FiStar} color="yellow.400" />
								<Text fontSize="sm" fontWeight="medium" color="gray.600">
									{item.prod_rating}
								</Text>
							</HStack>
						</HStack>

						{item.prod_tag && (
							<HStack spacing="2">
								<Badge
									colorScheme="blue"
									variant="subtle"
									borderRadius="full"
									px="3"
									py="1"
									fontSize="xs"
								>
									<Icon as={FiTrendingUp} mr="1" />
									{item.prod_tag}
								</Badge>
							</HStack>
						)}
					</VStack>
				</Box>

				<Box p="4" pt="0">
					<Button
						w="full"
						bgGradient="linear(to-r, blue.500, purple.500)"
						color="white"
						_hover={{
							bgGradient: "linear(to-r, blue.600, purple.600)"
						}}
						onClick={() => handleClick(item)}
						isLoading={isItemLoading}
						loadingText="Adding to Cart..."
						borderRadius="xl"
						size="md"
						leftIcon={<Icon as={BsCartPlusFill} />}
						_disabled={{
							bgGradient: "linear(to-r, blue.500, purple.500)",
							opacity: 0.7
						}}
					>
						Add to Cart
					</Button>
				</Box>
			</Box>
		);
	};

	return (
		<Box bg={bgColor} minH="100vh" py="8">
			<Container maxW="7xl">
				<Flex direction={{ base: "column", lg: "row" }} gap="8">
					{/* Sidebar with Filter */}
					<Box
						w={{ base: "full", lg: "280px" }}
						flexShrink="0"
						position={{ base: "static", lg: "sticky" }}
						top="8"
						h="fit-content"
					>
						<Box
							bg={cardBg}
							p="6"
							borderRadius="2xl"
							boxShadow="lg"
							border="1px solid"
							borderColor={borderColor}
						>
							<Filter />
						</Box>
					</Box>

					{/* Main Content */}
					<Box flex="1">
						{/* Search Header */}
						<Box
							bg={cardBg}
							p="6"
							borderRadius="2xl"
							boxShadow="lg"
							mb="6"
							border="1px solid"
							borderColor={borderColor}
						>
							<VStack spacing="4">
								<Text color="gray.600" textAlign="center">
									Find the perfect items for your needs with our advanced search and filters
								</Text>
								<Box w="full" maxW="500px">
									<Input
										placeholder="Search for products..."
										size="lg"
										onChange={handleInputChange}
										borderRadius="xl"
										border="2px solid"
										borderColor="gray.200"
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
										leftIcon={<Icon as={FiSearch} />}
									/>
								</Box>
							</VStack>
						</Box>

						{/* Loading State */}
						{isLoading && (
							<Center py="20">
								<VStack spacing="6">
									<Spinner size="xl" color="blue.500" />
									<Text fontSize="lg" color="gray.500">
										Loading products...
									</Text>
								</VStack>
							</Center>
						)}

						{/* Error State */}
						{isError && !isLoading && (
							<Center py="20">
								<VStack spacing="6">
									<Icon as={FiZap} boxSize="16" color="red.400" />
									<Heading size="lg" color="red.500">
										Failed to load products
									</Heading>
									<Text fontSize="md" color="gray.500" textAlign="center" maxW="md">
										{errorMessage || "There was an issue loading the products. The server might be temporarily unavailable."}
									</Text>
									<Button
										onClick={() => dispatch(getData())}
										colorScheme="blue"
										borderRadius="xl"
										leftIcon={<Icon as={FiRefreshCw} />}
									>
										Retry
									</Button>
								</VStack>
							</Center>
						)}

						{/* Products Grid */}
						{!isLoading && !isError && filterData.length > 0 && (
							<>
								<Box mb="6">
									<Text color="gray.600" fontSize="lg">
										Showing {filterData.length} products
									</Text>
								</Box>
								
								<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
									{filterData.map((item) => (
										<ProductCard key={item._id} item={item} />
									))}
								</SimpleGrid>
							</>
						)}

						{/* Empty State */}
						{!isLoading && !isError && filterData.length === 0 && globalData.length === 0 && (
							<Center py="20">
								<VStack spacing="6">
									<Icon as={FiZap} boxSize="16" color="gray.400" />
									<Text fontSize="lg" color="gray.500" textAlign="center">
										No products available
									</Text>
									<Text fontSize="md" color="gray.400" textAlign="center">
										Please check back later or contact support if the issue persists.
									</Text>
								</VStack>
							</Center>
						)}

						{/* No Search Results */}
						{!isLoading && !isError && filterData.length === 0 && globalData.length > 0 && (
							<Center py="20">
								<VStack spacing="6">
									<Icon as={FiSearch} boxSize="16" color="gray.400" />
									<Text fontSize="lg" color="gray.500" textAlign="center">
										No products found matching your criteria
									</Text>
									<Text fontSize="md" color="gray.400" textAlign="center">
										Try adjusting your search or filters
									</Text>
								</VStack>
							</Center>
						)}
					</Box>
				</Flex>
			</Container>
		</Box>
	);
};

export default Products;
