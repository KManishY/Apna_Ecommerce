import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SinglePage = () => {
	const { id } = useParams();
	const { data } = useSelector((state) => state.productReducer);
	// console.log("state: ", data);
	// console.log("params: ", params);

	const [product] = data.filter((el) => el._id == id);
	console.log("product: ", product);

	return <div>SinglePage</div>;
};

export default SinglePage;
