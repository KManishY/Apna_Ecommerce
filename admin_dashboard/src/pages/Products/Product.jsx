import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	Text,
	Image,
	Badge,
	HStack,
	VStack,
	IconButton,
	useColorModeValue,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Spinner,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	useDisclosure
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProduct } from "../../redux/action/appAction.js";

const Product = () => {
	const dispatch = useDispatch();
	const { productData, isLoading, isError } = useSelector(state => state.productReducer);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("");
	const [sortBy, setSortBy] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [productToDelete, setProductToDelete] = useState(null);
	const toast = useToast();

	// Color mode values
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");

	const handleDelete = (product) => {
		setProductToDelete(product);
		onOpen();
	};

	const confirmDelete = () => {
		if (productToDelete) {
			dispatch(deleteProduct(productToDelete._id));
			dispatch(getProduct());
			toast({
				title: "Product deleted",
				description: `${productToDelete.prod_name} has been deleted successfully.`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			onClose();
		}
	};

	useEffect(() => {
		dispatch(getProduct());
	}, [dispatch]);

	// Filter and search products
	const filteredProducts = productData?.filter(product => {
		const matchesSearch = product.prod_name.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = !categoryFilter || product.prod_cat === categoryFilter;
		return matchesSearch && matchesCategory;
	}) || [];

	// Sort products
	const sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (sortBy) {
			case "price-low":
				return a.prod_price - b.prod_price;
			case "price-high":
				return b.prod_price - a.prod_price;
			case "rating":
				return b.prod_rating - a.prod_rating;
			case "name":
				return a.prod_name.localeCompare(b.prod_name);
			default:
				return 0;
		}
	});

	// Get unique categories
	const categories = [...new Set(productData?.map(product => product.prod_cat) || [])];

	if (isLoading) {
		return (
			<Flex justify="center" align="center" h="400px">
				<Spinner size="xl" color="blue.500" />
			</Flex>
		);
	}

	if (isError) {
		return (
			<Alert status="error">
				<AlertIcon />
				<AlertTitle>Error!</AlertTitle>
				<AlertDescription>Failed to load products. Please try again.</AlertDescription>
			</Alert>
		);
	}

	return (
		<Box>
			{/* Page Header */}
			<Flex justify="space-between" align="center" mb={8}>
				<Box>
					<Heading size="lg" color={textColor} mb={2}>
						Product Management
					</Heading>
					<Text color="gray.500">
						Manage your product inventory and listings
					</Text>
				</Box>
				<Link to="/addProduct">
					<Button
						leftIcon={<FiPlus />}
						colorScheme="blue"
						size="lg"
						borderRadius="lg"
					>
						Add Product
					</Button>
				</Link>
			</Flex>

			{/* Filters and Search */}
			<Box bg={cardBg} border="1px solid" borderColor={borderColor} mb={6} borderRadius="lg" p={6}>
				<Box>
					<Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4}>
						<InputGroup>
							<InputLeftElement>
								<FiSearch color="gray.400" />
							</InputLeftElement>
							<Input
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								borderRadius="lg"
							/>
						</InputGroup>

						<Select
							placeholder="Filter by category"
							value={categoryFilter}
							onChange={(e) => setCategoryFilter(e.target.value)}
							borderRadius="lg"
						>
							{categories.map(category => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</Select>

						<Select
							placeholder="Sort by"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							borderRadius="lg"
						>
							<option value="name">Name (A-Z)</option>
							<option value="price-low">Price (Low to High)</option>
							<option value="price-high">Price (High to Low)</option>
							<option value="rating">Rating</option>
						</Select>
					</Grid>
				</Box>
			</Box>

			{/* Products Grid */}
			<Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap={6}>
				{sortedProducts.map(product => (
					<Box
						key={product._id}
						bg={cardBg}
						border="1px solid"
						borderColor={borderColor}
						_hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
						transition="all 0.2s ease"
						position="relative"
						overflow="hidden"
						borderRadius="lg"
					>
						{/* Product Image */}
						<Box position="relative" h="200px" overflow="hidden">
							<Image
								src={product.prod_image}
								alt={product.prod_name}
								w="100%"
								h="100%"
								objectFit="cover"
								_hover={{ transform: "scale(1.05)" }}
								transition="transform 0.3s ease"
							/>
							
							{/* Action Buttons */}
							<HStack
								position="absolute"
								top={2}
								right={2}
								spacing={1}
								opacity={0}
								_hover={{ opacity: 1 }}
								transition="opacity 0.2s ease"
							>
								<Link to={`/editproduct/${product._id}`}>
									<IconButton
										icon={<FiEdit />}
										size="sm"
										colorScheme="blue"
										variant="solid"
										aria-label="Edit product"
									/>
								</Link>
								<IconButton
									icon={<FiTrash2 />}
									size="sm"
									colorScheme="red"
									variant="solid"
									aria-label="Delete product"
									onClick={() => handleDelete(product)}
								/>
							</HStack>

							{/* Discount Badge */}
							{product.prod_discount > 0 && (
								<Badge
									position="absolute"
									top={2}
									left={2}
									colorScheme="red"
									borderRadius="full"
									px={2}
									py={1}
								>
									{product.prod_discount}% OFF
								</Badge>
							)}
						</Box>

						<Box p={4}>
							<VStack align="start" spacing={3}>
								<Box>
									<Text
										fontSize="md"
										fontWeight="semibold"
										color={textColor}
										noOfLines={2}
									>
										{product.prod_name}
									</Text>
									<Badge
										colorScheme="blue"
										variant="subtle"
										mt={1}
										borderRadius="full"
									>
										{product.prod_cat}
									</Badge>
								</Box>

								<HStack justify="space-between" w="full">
									<VStack align="start" spacing={0}>
										<Text fontSize="sm" color="gray.500">
											Price
										</Text>
										<Text fontSize="lg" fontWeight="bold" color="green.500">
											₹{product.prod_price}
										</Text>
									</VStack>
									<VStack align="end" spacing={0}>
										<Text fontSize="sm" color="gray.500">
											Rating
										</Text>
										<HStack spacing={1}>
											<Text fontSize="sm" fontWeight="semibold" color={textColor}>
												{product.prod_rating}
											</Text>
											<Text color="yellow.400">★</Text>
										</HStack>
									</VStack>
								</HStack>
							</VStack>
						</Box>
					</Box>
				))}
			</Grid>

			{/* Empty State */}
			{sortedProducts.length === 0 && (
				<Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={6}>
					<Box textAlign="center" py={12}>
						<Text fontSize="lg" color="gray.500" mb={4}>
							No products found
						</Text>
						<Text color="gray.400" mb={6}>
							Try adjusting your search or filter criteria
						</Text>
						<Link to="/addProduct">
							<Button colorScheme="blue" leftIcon={<FiPlus />}>
								Add Your First Product
							</Button>
						</Link>
					</Box>
				</Box>
			)}

			{/* Delete Confirmation Modal */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>
							Are you sure you want to delete "{productToDelete?.prod_name}"? 
							This action cannot be undone.
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="red" onClick={confirmDelete}>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Product;






