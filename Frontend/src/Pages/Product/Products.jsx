import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getData } from "../../Redux/AppReducer/action.js";
const Products = () => {
	const dispatch = useDispatch();
	let { data } = useSelector((state) => state.AppReducer);

	const [searchParams, setSearchParams] = useSearchParams();

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
		dispatch(getData());
	}, []);

	return (
		<div>
			<div>
				<label>Lamp</label>
				<input
					type='checkbox'
					value='Lamp'
					defaultChecked={category.includes("Lamp")}
					onChange={(e) => handleChange(e)}
				/>
				{/* <label>Furnishing</label>
				<input type='checkbox' value='furnishing' />
				<label>Wall Art</label>
				<input type='checkbox' value='wall_art' /> */}
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
