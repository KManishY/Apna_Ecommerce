import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	Box,
	VStack,
	HStack,
	Heading,
	Text,
	Checkbox,
	Radio,
	RadioGroup,
	Divider,
	Badge,
	Icon,
	useColorModeValue
} from "@chakra-ui/react";
import { FiFilter, FiTrendingUp, FiStar, FiTag } from "react-icons/fi";

const Filter = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialProductParams = searchParams.getAll("category");
	const initialSortParams = searchParams.get("sortBy");
	const initialRatingSortParams = searchParams.get("sortByRating");

	const [category, setCategory] = useState(initialProductParams || []);
	const [sortBy, setSortBy] = useState(initialSortParams || "");
	const [sortByRating, setSortByRating] = useState(initialRatingSortParams || "");

	// Color mode values
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");
	const subTextColor = useColorModeValue("gray.600", "gray.400");

	const handleCategoryChange = (value) => {
		setCategory((prevCategories) => {
			const newCategories = [...prevCategories];
			if (newCategories.includes(value)) {
				newCategories.splice(newCategories.indexOf(value), 1);
			} else {
				newCategories.push(value);
			}
			return newCategories;
		});
	};

	const handleSortBy = (value) => {
		setSortBy(value);
	};

	const handleSortByRating = (value) => {
		setSortByRating(value);
	};

	useEffect(() => {
		setSearchParams({
			category: category,
			sortBy: sortBy,
			sortByRating: sortByRating
		});
	}, [category, setSearchParams, sortBy, sortByRating]);

	const categories = [
		{ name: "Lamp", icon: "💡" },
		{ name: "Pots & Planters", icon: "🪴" },
		{ name: "Aquariums & Terrariums", icon: "🐠" },
		{ name: "Table Fountains", icon: "⛲" },
		{ name: "Garden Accessories", icon: "🌿" }
	];

	return (
		<VStack spacing="6" align="stretch">
			{/* Header */}
			<Box textAlign="center" pb="4">
				<Heading size="md" color={textColor} mb="2">
					<Icon as={FiFilter} mr="2" color="blue.500" />
					Filters
				</Heading>
				<Text fontSize="sm" color={subTextColor}>
					Refine your search
				</Text>
			</Box>

			{/* Categories Section */}
			<Box>
				<Heading size="sm" color={textColor} mb="4" display="flex" alignItems="center">
					<Icon as={FiTag} mr="2" color="green.500" />
					Categories
				</Heading>
				<VStack spacing="3" align="stretch">
					{categories.map((item) => (
						<Checkbox
							key={item.name}
							value={item.name}
							isChecked={category.includes(item.name)}
							onChange={(e) => handleCategoryChange(e.target.value)}
							colorScheme="blue"
							size="md"
							spacing="3"
							_hover={{ transform: "translateX(4px)" }}
							transition="all 0.2s ease"
						>
							<HStack spacing="2">
								<Text fontSize="lg">{item.icon}</Text>
								<Text fontSize="sm" color={textColor} fontWeight="medium">
									{item.name}
								</Text>
							</HStack>
						</Checkbox>
					))}
				</VStack>
			</Box>

			<Divider />

			{/* Price Sorting Section */}
			<Box>
				<Heading size="sm" color={textColor} mb="4" display="flex" alignItems="center">
					<Icon as={FiTrendingUp} mr="2" color="orange.500" />
					Sort by Price
				</Heading>
				<RadioGroup value={sortBy} onChange={handleSortBy}>
					<VStack spacing="3" align="stretch">
						<Radio value="asc" colorScheme="blue" size="md">
							<HStack spacing="2">
								<Badge colorScheme="green" variant="subtle" borderRadius="full" px="2">
									Low to High
								</Badge>

							</HStack>
						</Radio>
						<Radio value="desc" colorScheme="blue" size="md">
							<HStack spacing="2">
								<Badge colorScheme="red" variant="subtle" borderRadius="full" px="2">
									High to Low
								</Badge>
								
							</HStack>
						</Radio>
					</VStack>
				</RadioGroup>
			</Box>

			<Divider />

			{/* Rating Sorting Section */}
			<Box>
				<Heading size="sm" color={textColor} mb="4" display="flex" alignItems="center">
					<Icon as={FiStar} mr="2" color="yellow.500" />
					Sort by Rating
				</Heading>
				<RadioGroup value={sortByRating} onChange={handleSortByRating}>
					<VStack spacing="3" align="stretch">
						<Radio value="high" colorScheme="blue" size="md">
							<HStack spacing="2">
								<Badge colorScheme="yellow" variant="subtle" borderRadius="full" px="2">
									⭐ Top Rated
								</Badge>
								
							</HStack>
						</Radio>
						<Radio value="low" colorScheme="blue" size="md">
							<HStack spacing="2">
								<Badge colorScheme="gray" variant="subtle" borderRadius="full" px="2">
									📉 Low Rated
								</Badge>
								
							</HStack>
						</Radio>
					</VStack>
				</RadioGroup>
			</Box>

			{/* Active Filters Summary */}
			{(category.length > 0 || sortBy || sortByRating) && (
				<>
					<Divider />
					<Box>
						<Heading size="sm" color={textColor} mb="3">
							Active Filters
						</Heading>
						<VStack spacing="2" align="stretch">
							{category.length > 0 && (
								<HStack>
									<Badge colorScheme="blue" variant="subtle">
										Categories: {category.length}
									</Badge>
								</HStack>
							)}
							{sortBy && (
								<HStack>
									<Badge colorScheme="green" variant="subtle">
										Price: {sortBy === "asc" ? "Low to High" : "High to Low"}
									</Badge>
								</HStack>
							)}
							{sortByRating && (
								<HStack>
									<Badge colorScheme="yellow" variant="subtle">
										Rating: {sortByRating === "high" ? "High to Low" : "Low to High"}
									</Badge>
								</HStack>
							)}
						</VStack>
					</Box>
				</>
			)}
		</VStack>
	);
};

export default Filter;
