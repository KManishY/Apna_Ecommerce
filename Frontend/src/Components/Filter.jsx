import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialProductParams = searchParams.getAll("category");
	const initialSortParams = searchParams.get("sortBy");
	const [category, setCategory] = useState(initialProductParams || []);
	const [sortBy, setSortBy] = useState(initialSortParams || "");

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

	useEffect(() => {
		if (category || sortBy) {
			setSearchParams({ category: category, sortBy: sortBy });
		}
	}, [category, setSearchParams, sortBy]);

	return (
		<div
			style={{
				backgroundColor: "blue",
				fontSize: "20px",
				padding: "20px",
				color: "white",
				display: "flex",
				gap: "20px",
				justifyContent: "space-around"
			}}
		>
			<div
				style={{
					backgroundColor: "blue",
					fontSize: "20px",
					color: "white",
					display: "flex",
					gap: "20px",
					justifyContent: "space-between"
				}}
			>
				<div>
					<label>Lamp</label>
					<input
						type='checkbox'
						value='Lamp'
						defaultChecked={category.includes("Lamp")}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Pots & Planters</label>
					<input
						type='checkbox'
						value='Pots & Planters'
						defaultChecked={category.includes("Pots & Planters")}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Aquariums & Terrariums</label>
					<input
						type='checkbox'
						value='Aquariums & Terrariums'
						defaultChecked={category.includes(
							"Aquariums & Terrariums"
						)}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Table Fountains</label>
					<input
						type='checkbox'
						value='Table Fountains'
						defaultChecked={category.includes("Table Fountains")}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label>Garden Accessories</label>
					<input
						type='checkbox'
						value='Garden Accessories'
						defaultChecked={category.includes("Garden Accessories")}
						onChange={(e) => handleChange(e)}
					/>
				</div>
			</div>
			{/* <label>Wall Art</label>
				<input type='checkbox' value='wall_art' /> */}

			{/* sort by price  */}

			<div onChange={handleSortBy}>
				<label>Highest Price</label>

				<input
					type='radio'
					name='sortBy'
					value='asc'
					defaultChecked={sortBy === "asc"}
				/>
				<label>Lowest Price</label>

				<input
					type='radio'
					name='sortBy'
					value='desc'
					defaultChecked={sortBy === "desc"}
				/>
			</div>
		</div>
	);
};

export default Filter;
