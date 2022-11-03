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
				<Heading
					className={styled.allHeading}
				>
					Products
				</Heading>
				<Box className={styled.main_box_input}>
					<input
						className={styled.checkbox_size}
						type='checkbox'
						value='Lamp'
						defaultChecked={category.includes("Lamp")}
						onChange={(e) => handleChange(e)}
					/>
					<label className={styled.label}>Lamp</label>
				</Box>
				<Box className={styled.main_box_input}>
					<input
						type='checkbox'
						className={styled.checkbox_size}
						value='Pots & Planters'
						defaultChecked={category.includes("Pots & Planters")}
						onChange={(e) => handleChange(e)}
					/>
					<label className={styled.label}>Pots & Planters</label>
				</Box>
				<Box className={styled.main_box_input}>
					<input
						type='checkbox'
						value='Aquariums & Terrariums'
						className={styled.checkbox_size}
						defaultChecked={category.includes(
							"Aquariums & Terrariums"
						)}
						onChange={(e) => handleChange(e)}
					/>
					<label className={styled.label}>Aquariums</label>
				</Box>
				<Box className={styled.main_box_input}>
					<input
						type='checkbox'
						value='Table Fountains'
						className={styled.checkbox_size}
						defaultChecked={category.includes("Table Fountains")}
						onChange={(e) => handleChange(e)}
					/>
					<label className={styled.label}>Table Fountains</label>
				</Box>
				<Box className={styled.main_box_input}>
					<input
						type='checkbox'
						className={styled.checkbox_size}
						value='Garden Accessories'
						defaultChecked={category.includes("Garden Accessories")}
						onChange={(e) => handleChange(e)}
					/>
					<label className={styled.label}>Garden Accessories</label>
				</Box>
			</Box>

			{/* ------------Sort by price---------------  */}

			<Box className={styled.Filter_main_div}>
				<Heading
					// color={"white"}
					className={styled.allHeading}
				>
					Sorting by Price
				</Heading>

				<Box onChange={handleSortBy} className={styled.sorting_div}>
					<Box className={styled.main_box_input}>
						<input
							type='radio'
							name='sortBy'
							value='asc'
							className={styled.checkbox_size}
							defaultChecked={sortBy === "asc"}
						/>
						<label className={styled.label}>Highest Price</label>
					</Box>
					<Box className={styled.main_box_input}>
						<input
							type='radio'
							name='sortBy'
							className={styled.checkbox_size}
							value='desc'
							defaultChecked={sortBy === "desc"}
						/>
						<label className={styled.label}>Lowest Price</label>
					</Box>
				</Box>
				{/* ------------Sort By Rating-------------------- */}
				<Box
					onChange={handleSortByRating}
					className={styled.sorting_div}
				>
					<Heading
						className={styled.allHeading}
						// color={"white"}
					>
						Sorting by Rating
					</Heading>
					<Box className={styled.main_box_input}>
						<input
							type='radio'
							name='sortByRating'
							className={styled.checkbox_size}
							value='high'
							defaultChecked={sortBy === "high"}
						/>
						<label className={styled.label}>Highest Rating</label>
					</Box>
					<Box className={styled.main_box_input}>
						<input
							type='radio'
							name='sortByRating'
							className={styled.checkbox_size}
							value='low'
							defaultChecked={sortBy === "low"}
						/>
						<label className={styled.label}>Lowest Rating</label>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Filter;
