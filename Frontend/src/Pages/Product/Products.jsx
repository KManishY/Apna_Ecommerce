import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../Components/Filter.jsx";
import { getData } from "../../Redux/AppReducer/action.js";
const Products = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	let { data } = useSelector((state) => state.AppReducer);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (location || data.length == 0) {
			const sortBy = searchParams.get("sortBy");
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
			{/* filter&& Sorting */}
			<Filter />
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
};;;


export default Products;
