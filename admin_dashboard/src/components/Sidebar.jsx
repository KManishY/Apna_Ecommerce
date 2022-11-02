import React, { useState } from "react";
import {
	Avatar,
	Button,
	Divider,
	Flex,
	Heading,
	IconButton,
	Text
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { ImUsers } from "react-icons/im";
import { BsCartPlusFill } from "react-icons/bs";
import NavItem from "./NavItem.jsx";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
	let [navSize, changeNavSize] = useState("large");
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("authToken");
		navigate("/login");
	};
	return (
		<div>
			<Flex
				border="1px solid red"
				pos="sticky"
				left="5"
				h="95vh"
				marginTop="2.5vh"
				boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
				borderRadius={navSize === "small" ? "15px" : "30px"}
				w={navSize === "small" ? "75px" : "200px"}
				flexDir="column"
				justifyContent="space-between"
			>
				<Flex p="5" flexDir="column" alignItems="flex-start" as="nav">
					<IconButton
						background="none"
						mt={5}
						_hover={{ background: "none" }}
						icon={<FiMenu />}
						onClick={() => {
							if (navSize === "small") {
								changeNavSize("large");
							} else {
								changeNavSize("small");
							}
						}}
					/>
					{/* -----------NavItems---------  */}
					<Link to="/user">
						<NavItem
							navSize={navSize}
							icon={ImUsers}
							title="Users"
						/>
					</Link>
					<Link to="/">
						<NavItem
							navSize={navSize}
							icon={FaProductHunt}
							title="Products"
						/>
					</Link>
					<Link to="/addProduct">
						<NavItem
							navSize={navSize}
							icon={CgAdd}
							title="Add Product"
						/>
					</Link>
					<Link to="/order">
						<NavItem
							navSize={navSize}
							icon={BsCartPlusFill}
							title="Cart"
						/>
					</Link>
				</Flex>
				{/* ---------------Admin Info------------ */}
				<Flex
					p="5%"
					flexDir="column"
					w="100%"
					alignItems="center"
					mb={
						4 // alignItems={navSize === "small" ? "center" : "flex-start"}
					}
				>
					<Divider display={navSize === "small" ? "none" : "flex"} />
					<Flex mt={4} align="center">
						<Avatar
							size="sm"
							src="https://i.ibb.co/W5bWybN/profile-pic.jpg"
						/>{" "}
						{/* //--------- setImage ----- */}
						<Flex
							ml={4}
							align="center"
							flexDir="column"
							display={navSize === "small" ? "none" : "flex"}
						>
							{/* -------------Set Name-------------------- */}
							<Heading as="h3" size="sm">
								Manish Kumar
							</Heading>
							<Text color="gray">Admin</Text>
						</Flex>
					</Flex>
					<Flex
						mt={5}
						justifyContent="center"
						display={navSize === "small" ? "none" : "flex"}
					>
						<Button colorScheme="linkedin" onClick={handleLogout}>
							Logout
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</div>
	);
};

export default Sidebar;
