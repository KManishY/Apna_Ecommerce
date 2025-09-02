import { useState } from "react";
import {
	Flex,
	Heading,
	Input,
	Button,
	InputGroup,
	Stack,
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
	AlertIcon,
	InputLeftElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/AuthReducer/action.js";
import { LOGIN_SUCCESS } from "../../Redux/AuthReducer/constants.js";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const handleShowClick = () => setShowPassword(!showPassword);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token, user } = useSelector(state => state.AuthReducer);
	
	const initialState = { username: "", password: "" };
	const [loginDetails, setLoginDetails] = useState(initialState);

	// Color scheme
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.600");

	const handleChange = e => {
		setError(""); // Clear error when user types
		setLoginDetails({
			...loginDetails,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async () => {
		if (!loginDetails.username || !loginDetails.password) {
			setError("Please fill in all fields");
			return;
		}
		setIsLoading(true);
		setError("");
		try {
			const result = await dispatch(login(loginDetails));
			if (result.type === LOGIN_SUCCESS) {
				localStorage.setItem("token", token);
				localStorage.setItem("user", user);
				navigate("/product");
			} else {
				setError("Invalid credentials. Please try again.");
			}
		} catch (err) {
			setError("Login failed. Please try again.");
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
			py="8"
		>
			<Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }}>
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
								Welcome Back
							</Heading>
							<Text color="gray.600" fontSize="lg">
								Sign in to your Apna Ecommerce account
							</Text>
						</Stack>
					</Stack>

					{/* Login Form Card */}
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
							{/* Error Alert */}
							{error && (
								<Alert status="error" borderRadius="lg">
									<AlertIcon />
									{error}
								</Alert>
							)}

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
										value={loginDetails.username}
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
										value={loginDetails.password}
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
								<FormHelperText textAlign="right">
									<Link 
										color="blue.500" 
										_hover={{ color: "blue.600", textDecoration: "underline" }}
									>
										Forgot password?
									</Link>
								</FormHelperText>
							</FormControl>

							{/* Login Button */}
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
								loadingText="Signing in..."
								borderRadius="xl"
								fontWeight="bold"
								boxShadow="lg"
								transition="all 0.2s ease"
							>
								Sign In
							</Button>
						</Stack>
					</Box>

					{/* Sign Up Link */}
					<Stack spacing="6" textAlign="center">
						<Divider />
						<HStack justify="center" spacing="1">
							<Text 
								color="gray.600" 
								fontSize="md" 
								fontWeight="medium"
								sx={{ color: "gray.600 !important" }}
							>
								New to Apna Ecommerce?
							</Text>
							<Link to="/signup" _hover={{color: "blue.500 !important"}} style={{color: "blue.500 !important"}}>Create an account</Link>
						</HStack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
