import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../Components/Filter.jsx";
import { getData, postCartData } from "../../Redux/AppReducer/action.js";
import styled from "./products.module.css";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsCartPlusFill } from "react-icons/bs";
// import { BsCartPlusFill } from "@react-icons/all-files/bs";
const Products = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	//! Product data comming from store
	let { data, message } = useSelector((state) => state.productReducer);
	const [searchParams] = useSearchParams();
	const token = localStorage.getItem("token");
	//! add to cart function
	const handleClick = (item) => {
		const payload = {
			token: token,
			data: item
		};
		console.log(payload);
		dispatch(postCartData(payload));
	};
	//! Problem :- when my handle click function is called after that my product data
	//! is getting undefined

	useEffect(() => {
		if (location || data.length == 0) {
			const sortBy = searchParams.get("sortBy");
			const sortByRating = searchParams.get("sortByRating");

			const query = {
				params: {
					category: searchParams.getAll("category"),
					sort: sortBy,
					sortByRating: sortByRating
				}
			};
			//! dispatching getData function
			dispatch(getData(query));
		}
	}, [location.search]);
	console.log(data);

	return (
		<div className={styled.main_div}>
			{/* filter&& Sorting */}
			<div className={styled.side}>
				<div style={{ position: "fixed", top: "20" }}>
					<Filter />
				</div>
			</div>
			{/* ----------------All Products ---------------- */}
			<div className={styled.main}>
				<Flex wrap='wrap' gap={3} justify='center'>
					{data &&
						data.map((item) => (
							<Box key={item._id} className={styled.all_box}>
								<Box className={styled.cartBtn}>
									<Link to={`/singleProduct/${item._id}`}>
										<img
											className={styled.zoom}
											src={item.prod_image}
										/>
									</Link>
									<button
										onClick={() => handleClick(item)}
										className={styled.centered}
									>
										<BsCartPlusFill />
									</button>
									{/* <p>{item.prod_discount}% off</p> */}
								</Box>

								<Box p={2}>
									<Text
										as='b'
										fontSize='md'
										className={styled.textoverflow}
									>
										{item.prod_name}
									</Text>
									<Flex justifyContent='space-around'>
										<Box>
											<Text>
												<b> &#x20b9; </b>{" "}
												{item.prod_price}
											</Text>
										</Box>
										<Box>
											<Text>
												{item.prod_rating}&#9733;
											</Text>
										</Box>
									</Flex>
								</Box>
							</Box>
						))}
				</Flex>
			</div>
		</div>
	);
};;;

export default Products;
