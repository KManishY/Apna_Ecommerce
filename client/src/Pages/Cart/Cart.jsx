import { Box, Button, Heading, IconButton, Text } from "@chakra-ui/react";
import style from "./cart.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartData, getCartData } from "../../Redux/AppReducer/action.js";

const Cart = () => {
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.getCartReducer);
	console.log("cart: ", cart);
	if (cart) {
		const total_price = cart.reduce(
			(sum, item) => sum + Number(item.prod_price),
			0
		);
		console.log("price", total_price);
	}
	const [count, setCount] = useState(1);
	const handelincres = () => {
		setCount(count + 1);
	};
	const handeldec = () => {
		if (count > 1) {
			setCount(count - 1);
		} else {
			setCount(count);
		}
	};

	const handleDelete = (item) => {
		const query = {
			params: item
		};
		dispatch(deleteCartData(query));
		dispatch(getCartData());
	};

	useEffect(() => {
		dispatch(getCartData());
	}, []);

	const ReadMore = ({ children }) => {
		const text = children;
		const [isReadMore, setIsReadMore] = useState(true);
		const toggleReadMore = () => {
			setIsReadMore(!isReadMore);
		};
		return (
			<p className='text'>
				{isReadMore ? text.slice(0, 100) : text}
				<span onClick={toggleReadMore} className='read-or-hide'>
					{isReadMore ? "...read more" : " show less"}
				</span>
			</p>
		);
	};
	//   console.log(cart);

	return (
		<Box m='auto' className={style.cart_div}>
			{cart &&
				cart.map((el) => (
					<div key={el._id} className={style.main_div}>
						<div>
							<img
								className={style.img}
								src={el.prod_image}
								alt={el.prod_name}
							/>
						</div>

						<div>
							{/* product name */}
							<div>
								<Heading className={style.product_name}>
									{el.prod_name}
								</Heading>
							</div>
							{/* product discription */}
							<div className='container'>
								<ReadMore className={style.prod_description}>
									{el.prod_desc}
								</ReadMore>

								{/* <Text></Text> */}
							</div>

							<div className={style.price_main_div}>
								{/* price */}

								{/* discount */}
								<div>
									<Text color={"teal"}>
										{" "}
										Price: &#x20b9;{el.prod_price * count}
									</Text>
									<Text>
										{" "}
										Discount: &#x20b9;
										<span className={style.discount}>
											{el.prod_discount}
										</span>
									</Text>
								</div>
								<div className={style.inc_dec_main_div}>
									<div
										style={{ display: "flex", gap: "10px" }}
									>
										<button onClick={handelincres}>
											+
										</button>
										<p>{count}</p>
										<button onClick={handeldec}>-</button>
									</div>
								</div>
							</div>
							<Button
								colorScheme='teal'
								className={style.delete_btn}
								onClick={() => handleDelete(el.prod_id)}
							>
								delete
							</Button>
						</div>
					</div>
				))}

			<Button className={style.order_btn}>Order Now</Button>
		</Box>
	);
};;

export default Cart;
