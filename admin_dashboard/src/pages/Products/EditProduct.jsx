import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditProduct = () => {
	const { id } = useParams();
	const { productData } = useSelector((state) => state.productReducer);
	console.log("productData:edit page ", productData);
	const [item] = productData.filter((el) => el._id === id);

	console.log("id: ", id);

	return <div>EditProduct</div>;
};

export default EditProduct;
