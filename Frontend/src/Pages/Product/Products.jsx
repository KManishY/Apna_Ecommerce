import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData } from "../../Redux/AppReducer/action.js";
const Products = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	let { data } = useSelector((state) => state.AppReducer);

	const [searchParams, setSearchParams] = useSearchParams();
	console.log("searchParams: ", searchParams.getAll("allProduct"));

	const initialProductParams = searchParams.getAll("allProduct");
	const initialSortParams = searchParams.get("sortBy");

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
			setSearchParams({ allProduct: category, sortBy: sortBy });
		}
	}, [category, setSearchParams, sortBy]);
	useEffect(() => {
		if (location || data.length == 0) {
			const query = {
				params: {
					allProduct: searchParams.getAll("allProduct")
				}
			};
			dispatch(getData(query));
		}
	}, [location.search]);

	return (
		<div>
			{/* filter by category  */}
			<div>
				<label>Lamp</label>
				<input
					type='checkbox'
					value='Lamp'
					defaultChecked={category.includes("Lamp")}
					onChange={(e) => handleChange(e)}
				/>
				<label>Pots & Planters</label>
				<input
					type='checkbox'
					value='Pots & Planters'
					defaultChecked={category.includes("Pots & Planters")}
					onChange={(e) => handleChange(e)}
				/>
				{/* <label>Wall Art</label>
				<input type='checkbox' value='wall_art' /> */}
			</div>

			{/* sort by price  */}

			<div onChange={handleSortBy}>
				<input
					type='radio'
					name='sortBy'
					value='asc'
					defaultChecked={sortBy === "asc"}
				/>
				<input
					type='radio'
					name='sortBy'
					value='desc'
					defaultChecked={sortBy === "desc"}
				/>
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
};


export default Products;
