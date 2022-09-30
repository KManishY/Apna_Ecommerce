import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper.jsx";
import styled from "./navbar.module.css";
const Navbar = () => {
	const [hamBtn, sethamBtn] = useState(false);
	const handleClick = () => {
		sethamBtn(!hamBtn);
	};
	return (
		<>
			<div>
				<header>
					<nav className={styled.nav}>
						<div>
							<img
								width='90px'
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_XlY_YQ_sb2AsnI0MeajVvqJxDawVOJjwg&usqp=CAU'
							/>
						</div>
						<div>
							<Link className={styled.abc} to='/'>
								Home
							</Link>
							<Link className={styled.abc} to='/signup'>
								Signup
							</Link>
							<Link className={styled.abc} to='/login'>
								Login
							</Link>
							<Link className={styled.abc} to='/checkout'>
								Contact
							</Link>
							<Link className={styled.abc} to='/product'>
								Product
							</Link>
						</div>
						<div
							className={styled.hamburger}
							style={{ fontSize: "40px" }}
						>
							<GiHamburgerMenu onClick={handleClick} />
						</div>
					</nav>
				</header>
				<div>{hamBtn && <Wrapper />}</div>
			</div>
		</>
	);
};

export default Navbar;
