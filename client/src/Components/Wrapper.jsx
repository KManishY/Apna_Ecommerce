import React from "react";
import { Link } from "react-router-dom";

import styled from "./navbar.module.css";

const Wrapper = () => {
	return (
		<div className={styled.wrapper}>
			<div>
				<Link to='/'>Home</Link>
			</div>
			<div>
				<Link to='/product'>Product</Link>
			</div>
			<div>
				<Link to='/cart'>Cart</Link>
			</div>
			<div>
				<Link to='/signup'>Signup</Link>
			</div>
			<div>
				<Link to='/login'>Login</Link>
			</div>
		</div>
	);
};

export default Wrapper;
