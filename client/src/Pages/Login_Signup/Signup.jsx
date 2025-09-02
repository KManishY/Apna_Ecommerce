import { useState } from "react";
import {
	Flex,
	Heading,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	Box,
	FormControl,
	FormHelperText,
	InputRightElement,
	Text,
	HStack,
	Divider,
	Icon,
	useColorModeValue,
	Container,
	Alert,
	AlertIcon
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaShoppingBag, FaEnvelope, FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../Redux/AuthReducer/action.js";
import { REGISTER_SUCCESS } from "../../Redux/AuthReducer/constants.js";

export default function Signup() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const handleShowClick = () => setShowPassword(!showPassword);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status } = useSelector(state => state.AuthReducer);

	const initialState = { name: "", email: "", password: "", username: "", mobile: "" };
	const [registerDetails, setRegisterDetails] = useState(initialState);

	// Color scheme
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.600");

	const handleChange = e => {
		setError(""); // Clear error when user types
		setSuccess(""); // Clear success message
		setRegisterDetails({
			...registerDetails,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async () => {
		// Validation
		if (!registerDetails.name || !registerDetails.email || !registerDetails.password || !registerDetails.username || !registerDetails.mobile) {
			setError("Please fill in all fields");
			return;
		}

		if (registerDetails.password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}

		if (registerDetails.mobile.length < 10) {
			setError("Please enter a valid phone number");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const result = await dispatch(register(registerDetails));
			if (result.type === REGISTER_SUCCESS) {
				setSuccess("Registration successful! Redirecting to login...");
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			} else {
				setError("Registration failed. Please try again.");
			}
		} catch (err) {
			setError("Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<Box
			minH="100vh"
			bgGradient="linear(to-br, blue.50, purple.50, pink.50)"
		>
			<Container maxW="lg" py={{ base: '8', md: '16' }} px={{ base: '4', sm: '8' }}>
				<Stack spacing="8">
					{/* Header Section */}
					<Stack spacing="6" textAlign="center">
						<Flex justify="center">
							<Box
								p="4"
								borderRadius="2xl"
								bgGradient="linear(to-r, blue.500, purple.500)"
								color="white"
								boxShadow="xl"
								_hover={{ transform: "scale(1.05)" }}
								transition="transform 0.2s ease"
							>
								<Icon as={FaShoppingBag} boxSize="8" />
							</Box>
						</Flex>
						<Stack spacing="3">
							<Heading
								size="2xl"
								bgGradient="linear(to-r, blue.600, purple.600)"
								bgClip="text"
								fontWeight="extrabold"
							>
								Create Account
							</Heading>
							<Text color="gray.600" fontSize="lg">
								Join Apna Ecommerce and start shopping today
							</Text>
						</Stack>
					</Stack>

					{/* Signup Form Card */}
					<Box
						py={{ base: '0', sm: '8' }}
						px={{ base: '4', sm: '10' }}
						bg={cardBg}
						borderRadius="2xl"
						boxShadow="2xl"
						border="1px solid"
						borderColor={borderColor}
					>
						<Stack spacing="6">
							{/* Success Alert */}
							{success && (
								<Alert status="success" borderRadius="lg">
									<AlertIcon />
									{success}
								</Alert>
							)}

							{/* Error Alert */}
							{error && (
								<Alert status="error" borderRadius="lg">
									<AlertIcon />
									{error}
								</Alert>
							)}

							{/* Name Field */}
							<FormControl>
								<InputGroup size="lg">
									<InputLeftElement
										pointerEvents="none"
										color="gray.400"
									>
										<Icon as={FaUserAlt} />
									</InputLeftElement>
									<Input
										type="text"
										placeholder="Full Name"
										name="name"
										value={registerDetails.name}
										onChange={handleChange}
										onKeyPress={handleKeyPress}
										borderRadius="xl"
										border="2px solid"
										borderColor={borderColor}
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
										_hover={{
											borderColor: "blue.400"
										}}
									/>
								</InputGroup>
							</FormControl>

							{/* Username Field */}
							<FormControl>
								<InputGroup size="lg">
									<InputLeftElement
										pointerEvents="none"
										color="gray.400"
									>
										<Icon as={FaUserAlt} />
									</InputLeftElement>
									<Input
										type="text"
										placeholder="Username"
										name="username"
										value={registerDetails.username}
										onChange={handleChange}
										onKeyPress={handleKeyPress}
										borderRadius="xl"
										border="2px solid"
										borderColor={borderColor}
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
										_hover={{
											borderColor: "blue.400"
										}}
									/>
								</InputGroup>
							</FormControl>

							{/* Email Field */}
							<FormControl>
								<InputGroup size="lg">
									<InputLeftElement
										pointerEvents="none"
										color="gray.400"
									>
										<Icon as={FaEnvelope} />
									</InputLeftElement>
									<Input
										type="email"
										placeholder="Email Address"
										name="email"
										value={registerDetails.email}
										onChange={handleChange}
										onKeyPress={handleKeyPress}
										borderRadius="xl"
										border="2px solid"
										borderColor={borderColor}
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
										_hover={{
											borderColor: "blue.400"
										}}
									/>
								</InputGroup>
							</FormControl>

							{/* Password Field */}
							<FormControl>
								<InputGroup size="lg">
									<InputLeftElement
										pointerEvents="none"
										color="gray.400"
									>
										<Icon as={FaLock} />
									</InputLeftElement>
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										name="password"
										value={registerDetails.password}
										onChange={handleChange}
										onKeyPress={handleKeyPress}
										borderRadius="xl"
										border="2px solid"
										borderColor={borderColor}
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
										_hover={{
											borderColor: "blue.400"
										}}
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleShowClick}
											bgGradient="linear(to-r, blue.500, purple.500)"
											color="white"
											borderRadius="lg"
											_hover={{
												bgGradient: "linear(to-r, blue.600, purple.600)"
											}}
										>
											<Icon as={showPassword ? FaEyeSlash : FaEye} boxSize="3" />
										</Button>
									</InputRightElement>
								</InputGroup>
								<FormHelperText color="gray.500">
									Password must be at least 6 characters long
								</FormHelperText>
							</FormControl>

							{/* Phone Number Field */}
							<FormControl>
								<InputGroup size="lg">
									<InputLeftElement
										pointerEvents="none"
										color="gray.400"
									>
										<Icon as={FaPhone} />
									</InputLeftElement>
									<Input
										type="tel"
										placeholder="Phone Number"
										name="mobile"
										value={registerDetails.mobile}
										onChange={handleChange}
										onKeyPress={handleKeyPress}
										borderRadius="xl"
										border="2px solid"
										borderColor={borderColor}
										_focus={{
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500"
										}}
										_hover={{
											borderColor: "blue.400"
										}}
									/>
								</InputGroup>
							</FormControl>

							{/* Sign Up Button */}
							<Button
								size="lg"
								bgGradient="linear(to-r, blue.500, purple.500)"
								color="white"
								_hover={{
									bgGradient: "linear(to-r, blue.600, purple.600)",
									transform: "translateY(-2px)",
									boxShadow: "xl"
								}}
								_active={{
									transform: "scale(0.95)"
								}}
								onClick={handleSubmit}
								isLoading={isLoading}
								loadingText="Creating Account..."
								borderRadius="xl"
								fontWeight="bold"
								boxShadow="lg"
								transition="all 0.2s ease"
							>
								Create Account
							</Button>
						</Stack>
					</Box>

					{/* Login Link */}
					<Stack spacing="6" textAlign="center">
						<Divider />
						<HStack justify="center" spacing="1">
							<Text color="gray.600" fontSize="md" fontWeight="medium">
								Already have an account?
							</Text>
							<Link 
								to="/login"
								color="blue.500"
								fontWeight="semibold"
								_hover={{
									color: "blue.600",
									textDecoration: "underline"
								}}
								sx={{ color: "blue.500 !important" }}
							>
								Sign In
							</Link>
						</HStack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
