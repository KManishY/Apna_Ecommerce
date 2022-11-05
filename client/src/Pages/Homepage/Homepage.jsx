import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
	getCartData,
	getData,
	postCartData
} from "../../Redux/AppReducer/action.js";
import Banner from "./Banner.jsx";
import HomePageContainer from "./HomePageContainer.jsx";

const Homepage = () => {
	const { data } = useSelector(state => state.productReducer);
	console.log("data: ", data);
	const dispatch = useDispatch();
	const location = useLocation();
	//! Product data comming from store
	// let { data, message } = useSelector(state => state.productReducer);
	const [searchParams] = useSearchParams();
	const token = localStorage.getItem("token");
	//! add to cart function
	const handleClick = item => {
		const payload = { token: token, data: item };
		// console.log(payload);
		dispatch(postCartData(payload)); //TODO need response there to popup status
		// alert("data added successfully");
		dispatch(getCartData());
	};
	// useEffect(() => {
	// }, []);

	useEffect(
		() => {
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
		},
		[location.search]
	);
	console.log(data);

	return (
		<div>
			<Banner />
			<HomePageContainer data={data} />
			<Box bg="white" color="black">
				{" "}<Heading>Made by Manish Kumar</Heading>
			</Box>
		</div>
	);
};

export default Homepage