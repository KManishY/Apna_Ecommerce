import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData, postCartDataAll } from "../../Redux/AppReducer/action.js";

const Cart = () => {
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.AppReducer);
	console.log("cart: ", cart);
	if (cart) {
		const total_price = cart.reduce(
			(sum, item) => sum + Number(item.prod_price),
			0
		);
		console.log("price", total_price);
	}
	useEffect(() => {
		dispatch(getCartData());
	}, []);

	return (
		<Box w='80' m='auto'>
			{cart &&
				cart.map((el) => (
					<Box key={el._id}>
						<img src={el.prod_image} alt={el.prod_name} />
						<Text>{el.prod_name}</Text>
						<Text>{el.prod_price}</Text>
					</Box>
				))}
			<Button>Order Now</Button>
		</Box>
	);
};

export default Cart;
