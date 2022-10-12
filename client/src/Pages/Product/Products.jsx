import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
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
			<Box justify='center' className={styled.main_flex_box}>
				<Box>
					<div className={styled.filter_div}>
						<Filter />
					</div>
				</Box>
				<Flex
					wrap='wrap'
					gap={3}
					justify='center'
					className={styled.flex_box}
				>
					{data &&
						data.map((item) => (
							<Box
								key={item._id}
								style={{ width: "330px" }}
								className={styled.all_box}
							>
								<Box className={styled.cartBtn}>
									<img
										className={styled.zoom}
										style={{
											height: "200px",
											width: "100%"
										}}
										src={item.prod_image}
									/>
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
			</Box>
		</div>
	);
};;;

export default Products;
