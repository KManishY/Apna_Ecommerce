import {
	Box,
	Button,
	Checkbox,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	Text
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProduct } from "../../redux/action/appAction.js";
import styled from "./product.module.css";

const Product = () => {
	const dispatch = useDispatch();
	const { productData } = useSelector(state => state.productReducer);
	console.log("product: ", productData);
	const handleDelete = e => {
		console.log(e);
		// dispatch(deleteProduct(e._id));
		// dispatch(getProduct());
	};

	useEffect(() => {
		dispatch(getProduct());
	}, []);
	return (
		<div>
			<div className={styled.mainDiv}>
				<Flex justify="space-between" gap="0">
					{/* <Box
						w='100%'
						h='90vh'
						mt='30px'
						border='2px solid red'
						textAlign='left'
						lineHeight='2rem'
					>
						<Heading as='h3' size='lg' mb='20px'>
							Filter
						</Heading>
						<Checkbox colorScheme='green'>Lamp</Checkbox>
						<Divider orientation='horizontal' />
						<Checkbox colorScheme='green'>Pots & Planters</Checkbox>
						<Divider orientation='horizontal' />
						<Checkbox colorScheme='green'>
							Aquariums & Terrariums
						</Checkbox>
						<Divider orientation='horizontal' />
						<Checkbox colorScheme='green'>Table Fountains</Checkbox>
						<Divider orientation='horizontal' />
						<Checkbox colorScheme='green'>
							Garden Accessories
						</Checkbox>
					</Box> */}
					<Box justify="center">
						<Heading>All Products</Heading>
						<Grid gap={2} templateColumns="repeat(3, 1fr)">
							{productData &&
								productData.map(item =>
									<Box
										key={item._id}
										className={styled.all_box}
									>
										<Box className={styled.cartBtn}>
											<img
												className={styled.zoom}
												src={item.prod_image}
											/>
											<Link
												to={`/editproduct/${item._id}`}
											>
												<button
													className={styled.centered}
												>
													<FiEdit />
												</button>
											</Link>
											<button
												onClick={() =>
													handleDelete(item)}
												className={styled.centered_left}
											>
												<MdDelete />
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
						</Grid>
					</Box>
				</Flex>
			</div>
		</div>
	);
};

export default Product;






