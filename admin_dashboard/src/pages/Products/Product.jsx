import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  Modal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
  Heading,
  Portal,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduct } from "../../redux/action/appAction.js";
import style from "./product.module.css";
import { MdDeleteForever } from "react-icons/md";

const Product = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.productReducer);
  console.log("product: ", productData);
  const handleEdit = (e) => {
    console.log(e);
  };

	useEffect(() => {
		dispatch(getProduct());
	}, []);
	return (
		<div>
			<div className={style.mainDiv}>
				<Flex justify='space-between' gap='0'>
					<Box
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
					</Box>
					<Box justify='center'>
						<Heading>All Products</Heading>
						<Grid gap={2} templateColumns='repeat(3, 1fr)'>
							{productData &&
								productData.map((e) => (
									<div key={e._id}>
										<GridItem>
											<img
												src={e.prod_image}
												alt={e.prod_name}
											/>
											<p>{e.prod_name}</p>
											<Button
												onClick={() => handleEdit(e)}
												colorScheme='teal'
											>
												Edit
											</Button>
										</GridItem>
									</div>
								))}
						</Grid>
					</Box>
				</Flex>
			</div>
		</div>
	);
};

export default Product;
