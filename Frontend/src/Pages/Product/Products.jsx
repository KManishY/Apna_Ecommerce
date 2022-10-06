import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../../Redux/AppReducer/action.js";
const Products = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getData()).then((r) => {
			if (r.type === GET_DATA_SUCCESS) {
			}
		});
	});

	return <div>Products</div>;
};

export default Products;
