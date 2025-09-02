import React from "react";
import {
	Box,
	Heading,
	Text,
	useColorModeValue
} from "@chakra-ui/react";

const Order = () => {
	const textColor = useColorModeValue("gray.700", "gray.200");
	
	return (
		<Box>
			<Heading size="lg" color={textColor} mb={4}>
				Order Management
			</Heading>
			<Text color="gray.500">
				Manage and track customer orders
			</Text>
		</Box>
	);
};

export default Order;
