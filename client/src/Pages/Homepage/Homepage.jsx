import React from 'react'
import { useSelector } from "react-redux";

const Homepage = () => {
	const { data } = useSelector((state) => state.productReducer);
	console.log("data: ", data);

	return <div>this is Homepage</div>;
};

export default Homepage