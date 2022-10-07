import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../Components/Filter.jsx";
import { getData, postCartData } from "../../Redux/AppReducer/action.js";
import styled from "./products.module.css";
const Products = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	let { data } = useSelector((state) => state.AppReducer);
	console.log("data: ", data);
	const [searchParams] = useSearchParams();
	//! userEmail, Prod_id, count;

	const token = localStorage.getItem("token");
	// console.log("token: ", token);
	const handleClick = (item) => {
		// console.log("item: ", item);
		const payload = {
			token: token,
			data: {
				Prod_id: item._id
			}
		};
		dispatch(postCartData(payload));
	};

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
		<div className={styled.main_div}>
			{/* filter&& Sorting */}
			<div>
				{" "}
				<Filter />
			</div>{" "}
			<div className={styled.products_div}>
				{" "}
				{data &&
					data.map((item) => (
						<div key={item._id} className={styled.all_prod_div}>
							<div>
								<img
									style={{ height: "270px", width: "100%" }}
									src={item.prod_image}
								/>
							</div>
							<p>{item.prod_name}</p>
							<p>{item.prod_cat}</p>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between"
								}}
							>
								<div>
									<p>
										<b> &#x20b9; </b> {item.prod_price}
									</p>
								</div>
								<div>
									<p>{item.prod_rating}</p>
								</div>
							</div>
							<p>{item.prod_tag}</p>
							<button onClick={() => handleClick(item)}>
								add to cart
							</button>
						</div>
					))}
			</div>
		</div>
	);
};;

export default Products;
