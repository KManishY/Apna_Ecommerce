import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Stack,
	Text,
	VStack,
	HStack,
	Icon,
	useColorModeValue,
	Flex,
	Divider,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	useToast
} from "@chakra-ui/react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiUsers, FiPackage, FiBarChart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { login } from "../../redux/action/authAction.js";
import { LOGIN_SUCCESS } from "../../redux/constants/appConstant.js";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	
	const handleShowClick = () => setShowPassword(!showPassword);
	const initialState = { email: "", password: "" };
	const [loginDetails, setLoginDetails] = useState(initialState);
	
	// Color mode values
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");
	const accentColor = useColorModeValue("blue.500", "blue.300");
	
	const handleChange = e => {
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
		setError(""); // Clear error when user types
	};
	
	const handleSubmit = async () => {
		if (!loginDetails.email || !loginDetails.password) {
			setError("Please fill in all fields");
			return;
		}
		
		setIsLoading(true);
		setError("");
		
		try {
			const result = await dispatch(login(loginDetails));
			if (result.type === LOGIN_SUCCESS) {
				toast({
					title: "Login Successful",
					description: "Welcome to Admin Dashboard",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				// Small delay to ensure Redux state is updated
				setTimeout(() => {
					navigate("/");
				}, 100);
			} else {
				setError("Invalid email or password");
			}
		} catch (err) {
			setError("Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box minH="100vh" bg={bgColor}>
			<Flex minH="100vh" align="center" justify="center" p={4}>
				<Box
					w="full"
					maxW="6xl"
					bg={cardBg}
					borderRadius="2xl"
					shadow="2xl"
					overflow="hidden"
					display="flex"
					minH="600px"
				>
					{/* Left Section - Branding & Features */}
					<Box
						flex="1"
						bgGradient="linear(to-br, blue.500, purple.600)"
						color="white"
						p={12}
						display={{ base: "none", lg: "flex" }}
						flexDirection="column"
						justifyContent="center"
						position="relative"
						overflow="hidden"
					>
						{/* Background Pattern */}
						<Box
							position="absolute"
							top="-50%"
							right="-50%"
							w="200%"
							h="200%"
							bg="whiteAlpha.100"
							borderRadius="full"
							transform="rotate(45deg)"
						/>
						
						<VStack spacing={8} align="start" position="relative" zIndex={1}>
							<VStack spacing={4} align="start">
								<HStack spacing={3}>
									<Icon as={FiShield} boxSize={8} />
									<Heading size="xl" fontWeight="bold">
										Admin Dashboard
									</Heading>
								</HStack>
								<Text fontSize="lg" opacity={0.9} maxW="md">
									Manage your e-commerce platform with powerful analytics and intuitive controls
								</Text>
							</VStack>

							<VStack spacing={6} align="start" w="full">
								<HStack spacing={4}>
									<Box
										p={3}
										bg="whiteAlpha.200"
										borderRadius="lg"
										backdropFilter="blur(10px)"
									>
										<Icon as={FiBarChart} boxSize={6} />
									</Box>
									<VStack align="start" spacing={1}>
										<Text fontWeight="semibold">Analytics Dashboard</Text>
										<Text fontSize="sm" opacity={0.8}>
											Real-time insights and performance metrics
										</Text>
									</VStack>
								</HStack>

								<HStack spacing={4}>
									<Box
										p={3}
										bg="whiteAlpha.200"
										borderRadius="lg"
										backdropFilter="blur(10px)"
									>
										<Icon as={FiPackage} boxSize={6} />
									</Box>
									<VStack align="start" spacing={1}>
										<Text fontWeight="semibold">Product Management</Text>
										<Text fontSize="sm" opacity={0.8}>
											Easily manage inventory and product listings
										</Text>
									</VStack>
								</HStack>

								<HStack spacing={4}>
									<Box
										p={3}
										bg="whiteAlpha.200"
										borderRadius="lg"
										backdropFilter="blur(10px)"
									>
										<Icon as={FiUsers} boxSize={6} />
									</Box>
									<VStack align="start" spacing={1}>
										<Text fontWeight="semibold">User Management</Text>
										<Text fontSize="sm" opacity={0.8}>
											Monitor and manage customer accounts
										</Text>
									</VStack>
								</HStack>
							</VStack>
						</VStack>
					</Box>

					{/* Right Section - Login Form */}
					<Box flex="1" p={12} display="flex" flexDirection="column" justifyContent="center">
						<VStack spacing={8} align="stretch" maxW="md" mx="auto" w="full">
							{/* Header */}
							<VStack spacing={4} align="center">
								<Box
									p={4}
									bg={accentColor}
									borderRadius="full"
									display={{ base: "block", lg: "none" }}
								>
									<Icon as={FiShield} boxSize={8} color="white" />
								</Box>
								<VStack spacing={2} align="center">
									<Heading size="xl" color={textColor} textAlign="center">
										Welcome Back
									</Heading>
									<Text color="gray.500" textAlign="center">
										Sign in to your admin account
									</Text>
								</VStack>
							</VStack>

							{/* Error Alert */}
							{error && (
								<Alert status="error" borderRadius="lg">
									<AlertIcon />
									<AlertTitle mr={2}>Error!</AlertTitle>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							{/* Login Form */}
							<Stack spacing={6}>
								<FormControl>
									<InputGroup>
										<InputLeftElement pointerEvents="none">
											<Icon as={FiMail} color="gray.400" />
										</InputLeftElement>
										<Input
											type="email"
											placeholder="Enter your email"
											name="email"
											value={loginDetails.email}
											onChange={handleChange}
											size="lg"
											borderRadius="lg"
											borderColor={borderColor}
											_focus={{
												borderColor: accentColor,
												boxShadow: `0 0 0 1px ${accentColor}`,
											}}
										/>
									</InputGroup>
								</FormControl>

								<FormControl>
									<InputGroup>
										<InputLeftElement pointerEvents="none">
											<Icon as={FiLock} color="gray.400" />
										</InputLeftElement>
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											name="password"
											value={loginDetails.password}
											onChange={handleChange}
											size="lg"
											borderRadius="lg"
											borderColor={borderColor}
											_focus={{
												borderColor: accentColor,
												boxShadow: `0 0 0 1px ${accentColor}`,
											}}
										/>
										<InputRightElement>
											<Button
												variant="ghost"
												size="sm"
												onClick={handleShowClick}
												_hover={{ bg: "transparent" }}
											>
												<Icon
													as={showPassword ? FiEyeOff : FiEye}
													color="gray.400"
												/>
											</Button>
										</InputRightElement>
									</InputGroup>
									<FormHelperText textAlign="right">
										<Link color={accentColor} fontSize="sm">
											Forgot password?
										</Link>
									</FormHelperText>
								</FormControl>

								<Button
									colorScheme="blue"
									size="lg"
									borderRadius="lg"
									onClick={handleSubmit}
									isLoading={isLoading}
									loadingText="Signing in..."
									bgGradient="linear(to-r, blue.500, purple.500)"
									_hover={{
										bgGradient: "linear(to-r, blue.600, purple.600)",
										transform: "translateY(-1px)",
									}}
									transition="all 0.2s"
									fontWeight="semibold"
								>
									Sign In
								</Button>
							</Stack>

							{/* Footer */}
							<VStack spacing={4} align="center">
								<Divider />
								<Text fontSize="sm" color="gray.500" textAlign="center">
									Secure admin access powered by modern authentication
								</Text>
							</VStack>
						</VStack>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default Login;

