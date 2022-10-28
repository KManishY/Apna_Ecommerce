import React from 'react'
import { useSelector } from "react-redux";

const Homepage = () => {
	const { data } = useSelector((state) => state.productReducer);
	console.log("data: ", data);

	return <div>
		<img style={{width:"100%",height:"95vh"}} src="https://i.pinimg.com/736x/8f/25/2c/8f252c8949460c94c0e3b4454ff1c55f.jpg" alt="home logo" />
	</div>;
};

export default Homepage