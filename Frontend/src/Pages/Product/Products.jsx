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

	const [category, setCategory] = useState(initialProductParams || []);

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

	useEffect(() => {
		if (category) {
			setSearchParams({ allProduct: category });
		}
	}, [category, setSearchParams]);
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

	// 	if (location || musicRecordes.length === 0) {
	// 		const sortBy = searchParams.get("sortBy");
	// 		const query = {
	// 			params: {
	// 				genre: searchParams.getAll("genre"),
	// 				_sort: sortBy && "year",
	// 				_order: sortBy,
	// 			},
	// 		};
	// 		dispatch(getMusicRecord(query));
	// 	}
	// }, [location.search]);

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

			<div>
				<button>ascending</button>
				<button>decending</button>
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
};;;;;;

// prod_name: {
// 		type: String,
// 		required: true
// 	},
// 	prod_cat: {
// 		type: String,
// 		required: true
// 		// unique: true
// 	},
// 	prod_price: {
// 		type: String,
// 		required: true
// 		// unique: true
// 	},
// 	prod_rating: {
// 		type: String,
// 		required: true
// 	},
// 	prod_desc: {
// 		type: String,
// 		// unique: true,
// 		required: true
// 	},
// 	prod_tag: {
// 		type: String,
// 		required: true
// 	},
// 	prod_image: {
// 		type: String
// 	}

export default Products;
