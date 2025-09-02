import React, { useState } from "react";
import {
	HStack,
	Button,
	Text,
	Icon,
	Select,
	Box,
	useColorModeValue
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const PaginationComp = ({ 
	totalItems = 100, 
	itemsPerPage = 10, 
	currentPage = 1, 
	onPageChange,
	onItemsPerPageChange 
}) => {
	const [page, setPage] = useState(currentPage);
	const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

	// Color mode values
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");

	const totalPages = Math.ceil(totalItems / itemsPerPageState);
	const startItem = (page - 1) * itemsPerPageState + 1;
	const endItem = Math.min(page * itemsPerPageState, totalItems);

	const handlePageChange = (newPage) => {
		setPage(newPage);
		if (onPageChange) {
			onPageChange(newPage);
		}
	};

	const handleItemsPerPageChange = (newItemsPerPage) => {
		setItemsPerPageState(Number(newItemsPerPage));
		setPage(1); // Reset to first page when changing items per page
		if (onItemsPerPageChange) {
			onItemsPerPageChange(Number(newItemsPerPage));
		}
	};

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;
		
		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (page <= 3) {
				for (let i = 1; i <= 4; i++) {
					pages.push(i);
				}
				pages.push('...');
				pages.push(totalPages);
			} else if (page >= totalPages - 2) {
				pages.push(1);
				pages.push('...');
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				pages.push(1);
				pages.push('...');
				for (let i = page - 1; i <= page + 1; i++) {
					pages.push(i);
				}
				pages.push('...');
				pages.push(totalPages);
			}
		}
		
		return pages;
	};

	if (totalPages <= 1) return null;

	return (
		<Box
			bg={bgColor}
			p="4"
			borderRadius="xl"
			boxShadow="lg"
			border="1px solid"
			borderColor={borderColor}
		>
			<HStack justify="space-between" align="center" flexWrap="wrap" gap="4">
				{/* Items per page selector */}
				<HStack spacing="3">
					<Text fontSize="sm" color={textColor}>
						Show:
					</Text>
					<Select
						size="sm"
						value={itemsPerPageState}
						onChange={(e) => handleItemsPerPageChange(e.target.value)}
						w="70px"
						borderRadius="md"
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
					</Select>
					<Text fontSize="sm" color={textColor}>
						per page
					</Text>
				</HStack>

				{/* Page info */}
				<Text fontSize="sm" color={textColor}>
					Showing {startItem}-{endItem} of {totalItems} items
				</Text>

				{/* Pagination controls */}
				<HStack spacing="2">
					{/* First page button */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => handlePageChange(1)}
						isDisabled={page === 1}
						borderRadius="md"
						_hover={{
							bg: "blue.50",
							borderColor: "blue.300"
						}}
					>
						<Icon as={FiChevronsLeft} />
					</Button>

					{/* Previous page button */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => handlePageChange(page - 1)}
						isDisabled={page === 1}
						borderRadius="md"
						_hover={{
							bg: "blue.50",
							borderColor: "blue.300"
						}}
					>
						<Icon as={FiChevronLeft} />
					</Button>

					{/* Page numbers */}
					{getPageNumbers().map((pageNum, index) => (
						<Button
							key={index}
							size="sm"
							variant={pageNum === page ? "solid" : "outline"}
							colorScheme={pageNum === page ? "blue" : "gray"}
							onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
							isDisabled={pageNum === '...'}
							borderRadius="md"
							minW="40px"
							_hover={{
								bg: pageNum === page ? "blue.600" : "blue.50",
								borderColor: "blue.300"
							}}
						>
							{pageNum}
						</Button>
					))}

					{/* Next page button */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => handlePageChange(page + 1)}
						isDisabled={page === totalPages}
						borderRadius="md"
						_hover={{
							bg: "blue.50",
							borderColor: "blue.300"
						}}
					>
						<Icon as={FiChevronRight} />
					</Button>

					{/* Last page button */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => handlePageChange(totalPages)}
						isDisabled={page === totalPages}
						borderRadius="md"
						_hover={{
							bg: "blue.50",
							borderColor: "blue.300"
						}}
					>
						<Icon as={FiChevronsRight} />
					</Button>
				</HStack>
			</HStack>
		</Box>
	);
};

export default PaginationComp;
