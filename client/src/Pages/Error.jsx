import React from "react";
import { Link } from "react-router-dom";
import {
	Box,
	VStack,
	Heading,
	Text,
	Button,
	Icon,
	Container,
	useColorModeValue
} from "@chakra-ui/react";
import { FiAlertTriangle, FiHome, FiArrowLeft } from "react-icons/fi";

const Error = () => {
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const textColor = useColorModeValue("gray.700", "gray.200");
	const subTextColor = useColorModeValue("gray.600", "gray.400");

	return (
		<Box
			bg={bgColor}
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			py="8"
		>
			<Container maxW="md">
				<VStack spacing="8" textAlign="center">
					{/* Error Icon */}
					<Box
						w="32"
						h="32"
						bgGradient="linear(to-br, red.400, orange.400)"
						borderRadius="full"
						display="flex"
						alignItems="center"
						justifyContent="center"
						boxShadow="2xl"
						_hover={{
							transform: "scale(1.05)",
							transition: "transform 0.3s ease"
						}}
						transition="transform 0.3s ease"
					>
						<Icon as={FiAlertTriangle} boxSize="16" color="white" />
					</Box>

					{/* Error Message */}
					<VStack spacing="4">
						<Heading
							size="2xl"
							color={textColor}
							bgGradient="linear(to-r, red.500, orange.500)"
							bgClip="text"
						>
							404
						</Heading>
						<Heading size="lg" color={textColor}>
							Oops! Page Not Found
						</Heading>
						<Text fontSize="lg" color={subTextColor} maxW="md">
							The page you're looking for doesn't exist or has been moved. 
							Let's get you back on track!
						</Text>
					</VStack>

					{/* Action Buttons */}
					<VStack spacing="4" w="full">
						<Button
							as={Link}
							to="/"
							size="lg"
							bgGradient="linear(to-r, blue.500, purple.500)"
							color="white"
							_hover={{
								bgGradient: "linear(to-r, blue.600, purple.600)",
								transform: "translateY(-2px)",
								boxShadow: "lg"
							}}
							leftIcon={<Icon as={FiHome} />}
							w="full"
							borderRadius="xl"
							transition="all 0.3s ease"
						>
							Go to Homepage
						</Button>
						
						<Button
							onClick={() => window.history.back()}
							size="md"
							variant="outline"
							colorScheme="blue"
							leftIcon={<Icon as={FiArrowLeft} />}
							w="full"
							borderRadius="xl"
							_hover={{
								bg: "blue.50",
								borderColor: "blue.300"
							}}
						>
							Go Back
						</Button>
					</VStack>

					{/* Helpful Links */}
					<Box pt="8">
						<Text fontSize="sm" color={subTextColor} mb="4">
							Or try these popular pages:
						</Text>
						<VStack spacing="2">
							<Button
								as={Link}
								to="/product"
								variant="ghost"
								colorScheme="blue"
								size="sm"
								_hover={{ bg: "blue.50" }}
							>
								Browse Products
							</Button>
							<Button
								as={Link}
								to="/login"
								variant="ghost"
								colorScheme="green"
								size="sm"
								_hover={{ bg: "green.50" }}
							>
								Sign In
							</Button>
						</VStack>
					</Box>
				</VStack>
			</Container>
		</Box>
	);
};

export default Error;
