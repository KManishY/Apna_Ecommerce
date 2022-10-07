import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartData } from "../../Redux/AppReducer/action.js";

const Cart = () => {
	const dispatch = useDispatch();
	// const getData = () => {
	//     // console.log(a)
	//     getData();
	// };
	useEffect(() => {
		dispatch(getCartData());
	}, []);

	return <div>Cart</div>;
};

export default Cart;
