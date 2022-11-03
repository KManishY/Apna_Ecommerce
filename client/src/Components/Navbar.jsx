import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillCartFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper.jsx";
import styled from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartData } from "../Redux/AppReducer/action.js";
const Navbar = () => {
	const token = localStorage.getItem("token");

	const { name } = useSelector((state) => state.AuthReducer.user);
	console.log("state: ", name);

	const [hamBtn, sethamBtn] = useState(false);
	const navigate = useNavigate();
	const { cart } = useSelector((state) => state.getCartReducer);
	if (cart == "Please Login") {
		console.log(cart);
		cart = "";
	}
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCartData());
	}, []);

	const handleClick = () => {
		sethamBtn(!hamBtn);
	};

	// const user =JSON.parse(localStorage.getItem("user"))

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<>
			<div className={styled.main_div}>
				<header>
					<nav className={styled.nav}>
						<div>
							<Link to='/' style={{ margin: "0", padding: "0" }}>
								<img
									style={{ borderRadius: "50%" }}
									width='70px'
									src='https://media.istockphoto.com/vectors/online-shop-logo-designs-template-phone-shop-logo-symbol-icon-logo-vector-id1398022333?b=1&k=20&m=1398022333&s=612x612&w=0&h=nJ5jI5vZ-vBAA40nIvJs8xWEhVWx1d8IR61oVr_nfUs='
									alt='logo'
								/>
							</Link>
						</div>
						<div>
							<Link className={styled.abc} to='/'>
								<b className={styled.nav_elem}>Home</b>
							</Link>
							<Link className={styled.abc} to='/product'>
								<b className={styled.nav_elem}>Product</b>
							</Link>

							{/* ---------------------- */}

							{!token ? (
								<Link className={styled.abc} to='/login'>
									<b className={styled.nav_elem}>Login</b>
								</Link>
							) : (
								<span className={styled.abc}>
									{" "}
									<span
										style={{ cursor: "pointer" }}
										onClick={handleLogout}
										className={styled.nav_elem}
									>
										Logout{" "}
									</span>
										<span
											style={{ color: "red" }}
											onClick={handleLogout}
											className
										>
											{name}
										</span>
								</span>
							)}

							{/* ---------------------- */}

							<Link className={styled.abc} to='/cart'>
								<span style={{ position: "absolute" }}>
									<BsFillCartFill
										style={{ fontSize: "1.8rem" }}
									/>
								</span>
								<span
									style={{
										position: "relative",
										top: "-16px",
										right: "-9px",
										color: "red",
										fontWeight: "bold",
										fontSize: "1.2rem"
									}}
								>
									{cart && cart.length}
								</span>
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
				<div className={styled.mobileNav}>{hamBtn && <Wrapper />}</div>
			</div>
		</>
	);
};

export default Navbar;
