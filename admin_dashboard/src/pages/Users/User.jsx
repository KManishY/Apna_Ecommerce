import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/action/appAction.js";
import {
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Avatar,
	Badge,
	HStack,
	VStack
} from "@chakra-ui/react";
const User = () => {
	const dispatch = useDispatch();
	const { userData } = useSelector((state) => state.userReducer);
	const textColor = useColorModeValue("gray.700", "gray.200");
	const cardBg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const handleOrder = (e) => {
		console.log(e);
	};

	useEffect(() => {
		dispatch(allUsers());
	}, [dispatch]);

	return (
		<Box>
			{/* Page Header */}
			<Box mb={8}>
				<Heading size="lg" color={textColor} mb={2}>
					User Management
				</Heading>
				<Text color="gray.500">
					Manage and view all registered users
				</Text>
			</Box>

			{/* Users Table */}
			<Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={6}>
				<Box mb={6}>
					<HStack justify="space-between">
						<Heading size="md" color={textColor}>
							All Users ({userData?.length || 0})
						</Heading>
						<Badge colorScheme="blue" variant="subtle" borderRadius="full">
							Total: {userData?.length || 0}
						</Badge>
					</HStack>
				</Box>
				<Box>
					<TableContainer>
						<Table variant="simple" size="md">
							<Thead>
								<Tr>
									<Th isNumeric>#</Th>
									<Th>Avatar</Th>
									<Th>Name</Th>
									<Th>Email</Th>
									<Th>Phone Number</Th>
									<Th>Actions</Th>
								</Tr>
							</Thead>
							<Tbody>
								{userData && userData.length > 0 ? (
									userData.map((user, i) => (
										<Tr key={user._id} _hover={{ bg: "gray.50" }}>
											<Td isNumeric>
												<Text fontWeight="medium" color={textColor}>
													{i + 1}
												</Text>
											</Td>
											<Td>
												<Avatar
													size="sm"
													name={user.name}
													src={user.avatar || undefined}
													bg="blue.500"
												/>
											</Td>
											<Td>
												<Text fontWeight="medium" color={textColor}>
													{user.name}
												</Text>
											</Td>
											<Td>
												<Text fontSize="sm" color="gray.600">
													{user.email}
												</Text>
											</Td>
											<Td>
												<Text fontSize="sm" color="gray.600">
													{user.mobile || "N/A"}
												</Text>
											</Td>
											<Td>
												<Button
													onClick={() => handleOrder(user.email)}
													colorScheme="blue"
													size="sm"
													variant="outline"
													borderRadius="lg"
												>
													View Orders
												</Button>
											</Td>
										</Tr>
									))
								) : (
									<Tr>
										<Td colSpan={6} textAlign="center" py={8}>
											<VStack spacing={2}>
												<Text color="gray.500">No users found</Text>
												<Text fontSize="sm" color="gray.400">
													Users will appear here once they register
												</Text>
											</VStack>
										</Td>
									</Tr>
								)}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</Box>
	);
};

export default User;
