import {
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	FormLabel,
	Input
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart.jsx";

const Checkout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector(state => state.AuthReducer);

	const initialState = { username: "", password: "" };
	const [addressDetails, setAddressDetails] = useState(initialState);

	const handleChange = e => {
		setAddressDetails({
			...addressDetails,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = () => {
		if (addressDetails) {
			console.log("addressDetails: ", addressDetails);
			// dispatch(login(addressDetails)).then(r => {
			// 	if (r.type === LOGIN_SUCCESS) {
			// 		alert("Login Successfully");
			// 		localStorage.setItem("token", token);
			// 		console.log("token: login ", token);
			// 		navigate("/product");
			// 		window.location.reload();
			// 	}
			// });
		}
	};
	return (
		<div style={{ minHeight: "90vh" }}>
			<Container
				mt="1rem"
				bg="white"
				color="black"
				style={{ textAlign: "center", borderRadius: "1rem" }}
			>
				
				<FormControl isRequired>
					<FormLabel>Addres Line1</FormLabel>
					<Input
						type="text"
						name="username"
						onChange={e => handleChange(e)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Addres Line2</FormLabel>
					<Input
						type="text"
						name="username"
						onChange={e => handleChange(e)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Landmark</FormLabel>
					<Input
						type="text"
						name="username"
						onChange={e => handleChange(e)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>City</FormLabel>
					<Input
						type="text"
						name="username"
						onChange={e => handleChange(e)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Pin-Code</FormLabel>
					<Input
						type="text"
						name="username"
						onChange={e => handleChange(e)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>State</FormLabel>
					<Input
						type="text"
						name="username"
						onChange={e => handleChange(e)}
					/>
				</FormControl>

				<Button mt="1rem" mb="1rem" color="white">
					Submit
				</Button>
			</Container>
		</div>
	);
};

export default Checkout;
