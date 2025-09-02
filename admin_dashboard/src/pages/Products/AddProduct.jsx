import React, { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Select,
	Textarea,
	Grid,
	useColorModeValue,
	useToast,
	HStack,
	VStack,
	Text,
	Icon,
	Badge
} from "@chakra-ui/react";
import { 
	FiPackage, 
	FiDollarSign, 
	FiStar, 
	FiImage, 
	FiTag, 
	FiPercent,
	FiFileText,
	FiSave,
	FiArrowLeft
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/action/appAction.js";

const AddProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	// Color mode values
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");

	const initialState = {
		prod_name: "",
		prod_cat: "",
		prod_price: "",
		prod_rating: "",
		prod_desc: "",
		prod_tag: "",
		prod_image: "",
		prod_discount: ""
	};

	const [product, setProduct] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
		
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors({ ...errors, [name]: "" });
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!product.prod_name.trim()) {
			newErrors.prod_name = "Product name is required";
		}

		if (!product.prod_cat) {
			newErrors.prod_cat = "Product category is required";
		}

		if (!product.prod_price || isNaN(product.prod_price) || product.prod_price <= 0) {
			newErrors.prod_price = "Valid price is required";
		}

		if (!product.prod_rating || isNaN(product.prod_rating) || product.prod_rating < 1 || product.prod_rating > 5) {
			newErrors.prod_rating = "Rating must be between 1 and 5";
		}

		if (!product.prod_image.trim()) {
			newErrors.prod_image = "Product image URL is required";
		}

		if (!product.prod_desc.trim()) {
			newErrors.prod_desc = "Product description is required";
		}

		if (product.prod_discount && (isNaN(product.prod_discount) || product.prod_discount < 0 || product.prod_discount > 100)) {
			newErrors.prod_discount = "Discount must be between 0 and 100";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			toast({
				title: "Validation Error",
				description: "Please fix the errors before submitting",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		setIsSubmitting(true);
		try {
			await dispatch(addProduct(product));
			toast({
				title: "Product Added",
				description: `${product.prod_name} has been added successfully`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			navigate("/products");
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to add product. Please try again.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Box maxW="4xl" mx="auto">
			{/* Page Header */}
			<HStack mb={8} spacing={4}>
				<Button
					leftIcon={<FiArrowLeft />}
					variant="ghost"
					onClick={() => navigate("/products")}
					borderRadius="lg"
				>
					Back to Products
				</Button>
				<Box>
					<Heading size="lg" color={textColor} mb={2}>
						Add New Product
					</Heading>
					<Text color="gray.500">
						Create a new product listing for your store
					</Text>
				</Box>
			</HStack>

			<Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
				{/* Main Form */}
				<Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={6}>
					<Box mb={6}>
						<HStack spacing={3}>
							<Icon as={FiPackage} boxSize={6} color="blue.500" />
							<Heading size="md" color={textColor}>
								Product Information
							</Heading>
						</HStack>
					</Box>
					<Box>
						<Stack spacing={6}>
							{/* Product Name */}
							<FormControl isInvalid={errors.prod_name}>
								<FormLabel>Product Name</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<Icon as={FiPackage} color="gray.400" />
									</InputLeftElement>
									<Input
										type="text"
										value={product.prod_name}
										placeholder="Enter product name"
										name="prod_name"
										onChange={handleChange}
										borderRadius="lg"
									/>
								</InputGroup>
								{errors.prod_name && (
									<FormErrorMessage>{errors.prod_name}</FormErrorMessage>
								)}
							</FormControl>

							{/* Product Description */}
							<FormControl isInvalid={errors.prod_desc}>
								<FormLabel>Product Description</FormLabel>
								<InputGroup>
									<InputLeftElement top="12px">
										<Icon as={FiFileText} color="gray.400" />
									</InputLeftElement>
									<Textarea
										value={product.prod_desc}
										placeholder="Enter detailed product description"
										name="prod_desc"
										onChange={handleChange}
										borderRadius="lg"
										rows={4}
										pl="40px"
									/>
								</InputGroup>
								{errors.prod_desc && (
									<FormErrorMessage>{errors.prod_desc}</FormErrorMessage>
								)}
							</FormControl>

							{/* Product Image */}
							<FormControl isInvalid={errors.prod_image}>
								<FormLabel>Product Image URL</FormLabel>
								<InputGroup>
									<InputLeftElement>
										<Icon as={FiImage} color="gray.400" />
									</InputLeftElement>
									<Input
										type="url"
										value={product.prod_image}
										placeholder="https://example.com/image.jpg"
										name="prod_image"
										onChange={handleChange}
										borderRadius="lg"
									/>
								</InputGroup>
								<FormHelperText>
									Enter a valid image URL for your product
								</FormHelperText>
								{errors.prod_image && (
									<FormErrorMessage>{errors.prod_image}</FormErrorMessage>
								)}
							</FormControl>

							{/* Category and Tag */}
							<Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
								<FormControl isInvalid={errors.prod_cat}>
									<FormLabel>Category</FormLabel>
									<Select
										name="prod_cat"
										onChange={handleChange}
										placeholder="Select category"
										borderRadius="lg"
									>
										<option value="LAMP AND LIGHTS">Lamp and Lights</option>
										<option value="HOME GARDEN">Home Garden</option>
										<option value="POTS & PLANTERS">Pots & Planters</option>
										<option value="AQUARIUMS & TERRARIUMS">Aquariums & Terrariums</option>
										<option value="TABLE FOUNTAINS">Table Fountains</option>
										<option value="GARDEN ACCESSORIES">Garden Accessories</option>
									</Select>
									{errors.prod_cat && (
										<FormErrorMessage>{errors.prod_cat}</FormErrorMessage>
									)}
								</FormControl>

								<FormControl>
									<FormLabel>Product Tag</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<Icon as={FiTag} color="gray.400" />
										</InputLeftElement>
										<Input
											type="text"
											value={product.prod_tag}
											placeholder="e.g., Premium, New, Sale"
											name="prod_tag"
											onChange={handleChange}
											borderRadius="lg"
										/>
									</InputGroup>
									<FormHelperText>
										Optional tag for product categorization
									</FormHelperText>
								</FormControl>
							</Grid>

							{/* Price, Rating, and Discount */}
							<Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4}>
								<FormControl isInvalid={errors.prod_price}>
									<FormLabel>Price (₹)</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<Icon as={FiDollarSign} color="gray.400" />
										</InputLeftElement>
										<Input
											type="number"
											value={product.prod_price}
											placeholder="0"
											name="prod_price"
											onChange={handleChange}
											borderRadius="lg"
											min="0"
											step="0.01"
										/>
									</InputGroup>
									{errors.prod_price && (
										<FormErrorMessage>{errors.prod_price}</FormErrorMessage>
									)}
								</FormControl>

								<FormControl isInvalid={errors.prod_rating}>
									<FormLabel>Rating</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<Icon as={FiStar} color="gray.400" />
										</InputLeftElement>
										<Input
											type="number"
											value={product.prod_rating}
											placeholder="0"
											name="prod_rating"
											onChange={handleChange}
											borderRadius="lg"
											min="1"
											max="5"
											step="0.1"
										/>
									</InputGroup>
									<FormHelperText>1-5 stars</FormHelperText>
									{errors.prod_rating && (
										<FormErrorMessage>{errors.prod_rating}</FormErrorMessage>
									)}
								</FormControl>

								<FormControl isInvalid={errors.prod_discount}>
									<FormLabel>Discount (%)</FormLabel>
									<InputGroup>
										<InputLeftElement>
											<Icon as={FiPercent} color="gray.400" />
										</InputLeftElement>
										<Input
											type="number"
											value={product.prod_discount}
											placeholder="0"
											name="prod_discount"
											onChange={handleChange}
											borderRadius="lg"
											min="0"
											max="100"
										/>
									</InputGroup>
									<FormHelperText>Optional discount</FormHelperText>
									{errors.prod_discount && (
										<FormErrorMessage>{errors.prod_discount}</FormErrorMessage>
									)}
								</FormControl>
							</Grid>

							{/* Submit Button */}
							<Button
								leftIcon={<FiSave />}
								colorScheme="blue"
								size="lg"
								onClick={handleSubmit}
								isLoading={isSubmitting}
								loadingText="Adding Product..."
								borderRadius="lg"
								w="full"
							>
								Add Product
							</Button>
						</Stack>
					</Box>
				</Box>

				{/* Preview Card */}
				<Box bg={cardBg} border="1px solid" borderColor={borderColor} h="fit-content" borderRadius="lg" p={6}>
					<Box mb={4}>
						<Heading size="md" color={textColor}>
							Product Preview
						</Heading>
					</Box>
					<Box>
						<VStack spacing={4} align="stretch">
							{/* Product Image Preview */}
							<Box
								w="100%"
								h="200px"
								bg="gray.100"
								borderRadius="lg"
								overflow="hidden"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								{product.prod_image ? (
									<img
										src={product.prod_image}
										alt="Product preview"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover"
										}}
									/>
								) : (
									<VStack spacing={2}>
										<Icon as={FiImage} boxSize={8} color="gray.400" />
										<Text color="gray.500" fontSize="sm">
											No image selected
										</Text>
									</VStack>
								)}
							</Box>

							{/* Product Details Preview */}
							<VStack align="start" spacing={2}>
								<Text fontSize="lg" fontWeight="semibold" color={textColor}>
									{product.prod_name || "Product Name"}
								</Text>
								
								{product.prod_cat && (
									<Badge colorScheme="blue" variant="subtle" borderRadius="full">
										{product.prod_cat}
									</Badge>
								)}

								{product.prod_desc && (
									<Text fontSize="sm" color="gray.600" noOfLines={3}>
										{product.prod_desc}
									</Text>
								)}

								<HStack justify="space-between" w="full">
									<Text fontSize="lg" fontWeight="bold" color="green.500">
										₹{product.prod_price || "0"}
									</Text>
									{product.prod_rating && (
										<HStack spacing={1}>
											<Text fontSize="sm" fontWeight="semibold">
												{product.prod_rating}
											</Text>
											<Icon as={FiStar} color="yellow.400" />
										</HStack>
									)}
								</HStack>

								{product.prod_discount && product.prod_discount > 0 && (
									<Badge colorScheme="red" borderRadius="full">
										{product.prod_discount}% OFF
									</Badge>
								)}
							</VStack>
						</VStack>
					</Box>
				</Box>
			</Grid>
		</Box>
	);
};

export default AddProduct;

// prod_cat: "Lamp";
// prod_desc: "An eccentric human figure floor lamp that instantly lifts up the mood. A fun and creative designer wooden lamp which could be the best addition to the living room as well as bedroom. The best part is, it is movable and adjustable, therefore you can change it's position and stance as according to the way you want";
// prod_discount: "25";
// prod_image: "https://raw.githubusercontent.com/KManishY/product_image/main/iMAGE/Playful%20Figurine%20Wooden%20Floor%20Lamp.webp";
// prod_name: "Playful Figurine Wooden Floor Lamp";
// prod_price: 4999;
// prod_rating: "5";
// prod_tag: "Lamp And Lights";
// _id: "633db02a355685f9d7cdcad2";
