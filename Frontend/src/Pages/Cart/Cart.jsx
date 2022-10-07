import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData, postCartDataAll } from "../../Redux/AppReducer/action.js";

const Cart = () => {
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.AppReducer);
	console.log("cart: ", cart);
	useEffect(() => {
		dispatch(getCartData());
	}, []);

	return <div>Cart</div>;
};

export default Cart;
