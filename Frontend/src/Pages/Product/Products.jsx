import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData } from "../../Redux/AppReducer/action.js";
const Products = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	let { data } = useSelector((state) => state.AppReducer);
	console.log("data: ", data);

	const [searchParams, setSearchParams] = useSearchParams();
	console.log("searchParams: ", searchParams.getAll("category"));

	const initialProductParams = searchParams.getAll("category");
	const initialSortParams = searchParams.get("sortBy");
	if (data) {
		const a = data.filter(
			(el) => el.prod_cat == searchParams.getAll("category")
		);
		console.log("a: ", a);
	}

	const [category, setCategory] = useState(initialProductParams || []);

	const [sortBy, setSortBy] = useState(initialSortParams || "");
	console.log("sortBy: ", sortBy);

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
	useEffect(() => {
		if (location || data.length == 0) {
			const query = {
				params: {
					category: searchParams.getAll("category"),
					sort: sortBy
				}
			};
			dispatch(getData(query));
		}
	}, [location.search]);

	return (
		<div>
			{/* filter by category  */}
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
							defaultChecked={category.includes(
								"Pots & Planters"
							)}
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
							defaultChecked={category.includes(
								"Table Fountains"
							)}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>
						<label>Garden Accessories</label>
						<input
							type='checkbox'
							value='Garden Accessories'
							defaultChecked={category.includes(
								"Garden Accessories"
							)}
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

			{data &&
				data.map((item) => (
					<div key={item._id}>
						<p>{item.prod_name}</p>
						<p>{item.prod_cat}</p>
						<p>{item.prod_price}</p>
						<p>{item.prod_rating}</p>
						<p>{item.prod_tag}</p>
						<img
							width='100px'
							height='100px'
							src={item.prod_image}
						/>
						{/* <button onClick={handleClick}>add to cart</button> */}
					</div>
				))}
		</div>
	);
};;


export default Products;
