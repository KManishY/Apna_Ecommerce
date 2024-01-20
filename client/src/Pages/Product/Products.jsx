import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../Components/Filter.jsx";
import {
	getCartData,
	getData,
	postCartData
} from "../../Redux/AppReducer/action.js";
import styled from "./products.module.css";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { BsCartPlusFill } from "react-icons/bs";
import PaginationComp from "../../Components/Pagination.jsx";
// import { BsCartPlusFill } from "@react-icons/all-files/bs";




const Products = () => {
	const dispatch = useDispatch();
  const location = useLocation();
  const [text, setText] = useState("");
  const { data } = useSelector((state) => state.productReducer);
  const [globalData, setGlobalData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");

  // Update globalData when data changes
  useEffect(() => {
    data?.length && setGlobalData(data);
  }, [data]);

  // Add to cart function
  const handleClick = (item) => {
    const payload = { token: token, data: item };
    dispatch(postCartData(payload));
    dispatch(getCartData());
  };

  // Handle input change for filtering data
  const handleInputChange = (e) => {
		const searchText = e.target.value.toLowerCase();
	
		setText(searchText);
	
		const filteredData = globalData.filter((item) =>
			item.prod_name.toLowerCase().includes(searchText)
		);
	
		setFilterData(filteredData);
	};
	

  // Fetch data based on search params or location changes
  useEffect(() => {
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
    setFilterData([]);
  }, [location.search, dispatch, searchParams]);

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
				<div
					style={{
						backgroundColor: "white",
						width: "60%",
						margin: "auto",
						marginBottom: "10px",
						marginTop: "10px",
						borderRadius:"1rem"
					}}
				>
					<Input
						textAlign='center'
						borderRadius="1rem"
						placeholder="Search for a Product..."
						size="lg"
						onChange={e => handleInputChange(e)}
					/>
				</div>
				<Flex wrap="wrap" gap={3} justify="center">
					{/* <div className={styled.main_div}> */}
					{(filterData.length ? filterData : globalData).map(item =>
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
										as="b"
										fontSize="md"
										className={styled.textoverflow}
									>
										{item.prod_name}
									</Text>
									<Flex justifyContent="space-around">
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
						)}
				</Flex>
				{/* <PaginationComp /> */}
				{/* </div> */}
			</div>
		</div>
	);
};

export default Products;
