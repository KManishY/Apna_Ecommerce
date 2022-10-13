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
			<div className={styled.main_div}>
				<header>
					<nav className={styled.nav}>
						<div>
							<img
								width='70px'
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_XlY_YQ_sb2AsnI0MeajVvqJxDawVOJjwg&usqp=CAU'
							/>
						</div>
						<div>
							<Link className={styled.abc} to='/'>
								<b className={styled.nav_elem}>Home</b>
							</Link>
							<Link className={styled.abc} to='/product'>
								<b className={styled.nav_elem}>Product</b>
							</Link>
							<Link className={styled.abc} to='/cart'>
								<b className={styled.nav_elem}>Cart</b>
							</Link>
							{/* <Link className={styled.abc} to='/checkout'>
								<b className={styled.nav_elem}>Contact</b>
							</Link> */}
							<Link className={styled.abc} to='/login'>
								<b className={styled.nav_elem}>Login</b>
							</Link>
							<Link className={styled.abc} to='/signup'>
								<b className={styled.nav_elem}>Signup</b>
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
