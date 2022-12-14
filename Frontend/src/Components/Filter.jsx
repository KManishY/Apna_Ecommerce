import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "./filter.module.css";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";

const Filter = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialProductParams = searchParams.getAll("category");
	const initialSortParams = searchParams.get("sortBy");
	const initialRatingSortParams = searchParams.get("sortByRating");
	const [category, setCategory] = useState(initialProductParams || []);
	const [sortBy, setSortBy] = useState(initialSortParams || "");
	const [sortByRating, setSortByRating] = useState(
		initialRatingSortParams || ""
	);

	const handleChange = (e) => {
		const option = e.target.value;
		const newCat = [...category];
		if (category.includes(option)) {
			newCat.splice(newCat.indexOf(option), 1);
		} else {
			newCat.push(option);
		}
		setCategory(newCat);
	};
	const handleSortBy = (e) => {
		setSortBy(e.target.value);
	};
	const handleSortByRating = (e) => {
		setSortByRating(e.target.value);
	};

	useEffect(() => {
		if (category || sortBy || sortByRating) {
			setSearchParams({
				category: category,
				sortBy: sortBy,
				sortByRating: sortByRating
			});
		}
	}, [category, setSearchParams, sortBy, sortByRating]);

	return (
		<Box className={styled.min_div}>
			<Box className={styled.Filter_main_div}>
				<Heading size='lg'>Filters</Heading>
				<Box>
					<input
						type='checkbox'
						value='Lamp'
						defaultChecked={category.includes("Lamp")}
						onChange={(e) => handleChange(e)}
					/>
					<label>Lamp</label>
				</Box>
				<Box>
					<input
						type='checkbox'
						value='Pots & Planters'
						defaultChecked={category.includes("Pots & Planters")}
						onChange={(e) => handleChange(e)}
					/>
					<label>Pots & Planters</label>
				</Box>
				<Box>
					<input
						type='checkbox'
						value='Aquariums & Terrariums'
						defaultChecked={category.includes(
							"Aquariums & Terrariums"
						)}
						onChange={(e) => handleChange(e)}
					/>
					<label>Aquariums & Terrariums</label>
				</Box>
				<Box>
					<input
						type='checkbox'
						value='Table Fountains'
						defaultChecked={category.includes("Table Fountains")}
						onChange={(e) => handleChange(e)}
					/>
					<label>Table Fountains</label>
				</Box>
				<Box>
					<input
						type='checkbox'
						value='Garden Accessories'
						defaultChecked={category.includes("Garden Accessories")}
						onChange={(e) => handleChange(e)}
					/>
					<label>Garden Accessories</label>
				</Box>
			</Box>
			{/* <label>Wall Art</label>
				<input type='checkbox' value='wall_art' /> */}

			{/* ------------Sort by price---------------  */}

			<Box>
				<Heading size='lg'>Sorting</Heading>

				<Box onChange={handleSortBy} className={styled.sorting_div}>
					<Box>
						<label>Highest Price</label>
						<input
							type='radio'
							name='sortBy'
							value='asc'
							defaultChecked={sortBy === "asc"}
						/>
					</Box>
					<Box>
						<label>Lowest Price</label>

						<input
							type='radio'
							name='sortBy'
							value='desc'
							defaultChecked={sortBy === "desc"}
						/>
					</Box>
				</Box>
				{/* ------------Sort By Rating-------------------- */}
				<Box
					onChange={handleSortByRating}
					className={styled.sorting_div}
				>
					<Box>
						<label>Highest Rating</label>
						<input
							type='radio'
							name='sortByRating'
							value='high'
							defaultChecked={sortBy === "high"}
						/>
					</Box>
					<Box>
						<label>Lowest Rating</label>

						<input
							type='radio'
							name='sortByRating'
							value='low'
							defaultChecked={sortBy === "low"}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Filter;
