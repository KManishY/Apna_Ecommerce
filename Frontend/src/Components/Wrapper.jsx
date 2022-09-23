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
				<Link to='/about'>About</Link>
			</div>
			<div>
				<Link to='/contact'>Contact</Link>
			</div>
			<div>
				<Link to='/service'>Service</Link>
			</div>
		</div>
	);
};

export default Wrapper;
