import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
	Button,
	chakra,
	FormControl,
	FormHelperText,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Stack
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { SiNamecheap } from "react-icons/si";
import { MdPriceCheck } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import { TbDiscount2 } from "react-icons/tb";
import { editProduct } from "../../redux/action/appAction.js";
import { useDispatch, useSelector } from "react-redux";

const EditProduct = () => {
	const { id } = useParams();
	const { productData } = useSelector(state => state.productReducer);
	const [item] = productData.filter(el => el._id === id);
	console.log("item: ", item);
	const dispatch = useDispatch();

	var initialState = {
		prod_name: item.prod_name,
		prod_price: item.prod_price,
		prod_rating: item.prod_rating,
		prod_discount: item.prod_discount,
		id: id
	};
	// var initialState = {
	// 	prod_name: "",
	// 	prod_price: "",
	// 	prod_rating: "",
	// 	prod_discount: ""
	// };

	const [product, setProduct] = useState(initialState);
	// console.log("product: ", product);
	const handleChange = e => {
		// console.log(product);
		setProduct({ ...product, [e.target.name]: e.target.value });
	};
	const handleSubmit = () => {
		//TODO  onSubmit data fill sand to database to update
		dispatch(editProduct(product));
		// console.log(product, "editPage");
	};

	return (
		<div>
			{/* <form> */}
			<Stack
				spacing={4}
				p="1rem"
				backgroundColor="whiteAlpha.900"
				boxShadow="md"
				style={{ width: "40vw", margin: "auto", marginTop: "2rem" }}
			>
				<Heading>Update Product</Heading>
				<FormControl>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<SiNamecheap color="gray.300" />}
						/>
						<Input
							type="text"
							value={product.prod_name}
							placeholder="prod_name"
							name="prod_name"
							onChange={e => handleChange(e)}
						/>
					</InputGroup>
				</FormControl>
				{/* ----------------Prod Price-------------- */}
				<FormControl>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<MdPriceCheck color="gray.300" />}
						/>
						<Input
							type="text"
							value={product.prod_price}
							placeholder="prod_price"
							name="prod_price"
							onChange={e => handleChange(e)}
						/>
					</InputGroup>
				</FormControl>
				{/* ----------------prod_rating--------------- */}
				<FormControl>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<FcRating color="gray.300" />}
						/>
						<Input
							type="text"
							value={product.prod_rating}
							placeholder="prod_rating"
							name="prod_rating"
							onChange={e => handleChange(e)}
						/>
					</InputGroup>
				</FormControl>
				{/* -----------prod_discount---------------- */}
				<FormControl>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<TbDiscount2 color="gray.300" />}
						/>
						<Input
							type="text"
							value={product.prod_discount}
							placeholder="prod_discount"
							name="prod_discount"
							onChange={e => handleChange(e)}
						/>
					</InputGroup>
				</FormControl>
				<Button
					borderRadius={0}
					variant="solid"
					colorScheme="teal"
					width="full"
					onClick={handleSubmit}
				>
					Update
				</Button>
			</Stack>
			{/* </form> */}
		</div>
	);
};

export default EditProduct;



// prod_cat: "Lamp";
// prod_desc: "An eccentric human figure floor lamp that instantly lifts up the mood. A fun and creative designer wooden lamp which could be the best addition to the living room as well as bedroom. The best part is, it is movable and adjustable, therefore you can change it's position and stance as according to the way you want";
// prod_discount: "25";
// prod_image: "https://raw.githubusercontent.com/KManishY/product_image/main/iMAGE/Playful%20Figurine%20Wooden%20Floor%20Lamp.webp";
// prod_name: "Playful Figurine Wooden Floor Lamp";
// prod_price: 4999;
// prod_rating: "5";
// prod_tag: "Lamp And Lights";
// _id: "633db02a355685f9d7cdcad2";