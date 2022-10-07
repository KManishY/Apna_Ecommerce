import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../Components/Filter.jsx";
import { getData, postCartData } from "../../Redux/AppReducer/action.js";
import styled from "./products.module.css";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
const Products = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	let { data } = useSelector((state) => state.AppReducer);
	console.log("data: ", data);
	const [searchParams] = useSearchParams();
	const token = localStorage.getItem("token");
	const handleClick = (item) => {
		const payload = {
			token: token,
			data: item
		};
		dispatch(postCartData(payload));
	};
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
			dispatch(getData(query));
		}
	}, [location.search]);

	return (
		<div className={styled.main_div}>
			{/* filter&& Sorting */}
			<Flex justify='center'>
				<Box>
					<div>
						<Filter />
					</div>
				</Box>
				<Flex wrap='wrap' justifyContent='space-between' gap={3}>
					{data &&
						data.map((item) => (
							<Box key={item._id} style={{ width: "330px" }}>
								<Box>
									<img
										className={styled.zoom}
										style={{
											height: "200px",
											width: "100%"
										}}
										src={item.prod_image}
									/>
									<div className={styled.centered}></div>
								</Box>

								<Box p={2}>
									<Text as='b' fontSize='lg' noOfLines={2}>
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
									<Button
										style={{ color: "brown" }}
										onClick={() => handleClick(item)}
									>
										add to cart
									</Button>
								</Box>
							</Box>
						))}
				</Flex>
			</Flex>
		</div>
	);
};;

export default Products;
