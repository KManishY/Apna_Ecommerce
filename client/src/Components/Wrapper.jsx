import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
	HStack,
	Link as ChakraLink,
	Text,
	Box,
	useColorModeValue,
	Icon
} from "@chakra-ui/react";
import { FiHome, FiPackage, FiShoppingCart, FiUserPlus, FiLogIn } from "react-icons/fi";

const Wrapper = () => {
	const location = useLocation();
	
	// Color mode values
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const activeColor = useColorModeValue("blue.500", "blue.300");
	const textColor = useColorModeValue("gray.600", "gray.300");

	const navItems = [
		{ path: '/', label: 'Home', icon: FiHome },
		{ path: '/product', label: 'Product', icon: FiPackage },
		{ path: '/cart', label: 'Cart', icon: FiShoppingCart },
		{ path: '/signup', label: 'Signup', icon: FiUserPlus },
		{ path: '/login', label: 'Login', icon: FiLogIn }
	];

	return (
		<Box
			bg={bgColor}
			borderBottom="1px solid"
			borderColor={borderColor}
			px="6"
			py="4"
			position="sticky"
			top="0"
			zIndex="10"
			backdropFilter="blur(10px)"
			boxShadow="sm"
		>
			<HStack spacing="8" justify="center" align="center">
				{navItems.map((item) => {
					const isActive = location.pathname === item.path;
					const IconComponent = item.icon;
					
					return (
						<ChakraLink
							key={item.path}
							as={Link}
							to={item.path}
							_hover={{ textDecoration: "none" }}
							position="relative"
						>
							<HStack
								spacing="2"
								px="4"
								py="2"
								borderRadius="lg"
								bg={isActive ? "blue.50" : "transparent"}
								color={isActive ? activeColor : textColor}
								fontWeight={isActive ? "semibold" : "medium"}
								_hover={{
									bg: isActive ? "blue.100" : "gray.50",
									transform: "translateY(-2px)",
									transition: "all 0.2s ease"
								}}
								transition="all 0.2s ease"
								position="relative"
							>
								<Icon as={IconComponent} boxSize="4" />
								<Text fontSize="sm">{item.label}</Text>
								
								{/* Active indicator */}
								{isActive && (
									<Box
										position="absolute"
										bottom="-8px"
										left="50%"
										transform="translateX(-50%)"
										w="2"
										h="2"
										bg={activeColor}
										borderRadius="full"
									/>
								)}
							</HStack>
						</ChakraLink>
					);
				})}
			</HStack>
		</Box>
	);
};

export default Wrapper;
