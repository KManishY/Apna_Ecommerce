import {
	Container,
	Button,
	chakra,
	FormControl,
	FormHelperText,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Stack
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { login } from "../../redux/action/authAction.js";
import { LOGIN_SUCCESS } from "../../redux/constants/appConstant.js";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const handleShowClick = () => setShowPassword(!showPassword);
	const initialState = { email: "", password: "" };
	const [loginDetails, setLoginDetails] = useState(initialState);
	const handleChange = e => {
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
	};
	const handleSubmit = () => {
		console.log(loginDetails);
		if (loginDetails) {
			dispatch(login(loginDetails)).then(r => {
				if (r.type === LOGIN_SUCCESS) {
					alert("Login Successfully");
					navigate("/user");
					window.location.reload();
					// localStorage.setItem("token", token);
				}
			});
		}
	};

	return (
		<Container>
			<div>
				{/* <form> */}
				<Stack
					spacing={4}
					p="1rem"
					backgroundColor="whiteAlpha.900"
					boxShadow="md"
				>
					<Heading>Login</Heading>
					<FormControl>
						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								children={<CFaUserAlt color="gray.300" />}
							/>
							<Input
								type="email"
								placeholder="Email"
								name="email"
								onChange={e => handleChange(e)}
							/>
						</InputGroup>
					</FormControl>
					<FormControl>
						<InputGroup>
							<InputLeftElement
								pointerEvents="none"
								color="gray.300"
								children={<CFaLock color="gray.300" />}
							/>
							<Input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								name="password"
								onChange={e => handleChange(e)}
							/>
							<InputRightElement width="4.5rem">
								<Button
									h="1.75rem"
									size="sm"
									onClick={handleShowClick}
								>
									{showPassword ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
						<FormHelperText textAlign="right">
							<Link>forgot password?</Link>
						</FormHelperText>
					</FormControl>
					<Button
						borderRadius={0}
						variant="solid"
						colorScheme="teal"
						width="full"
						onClick={handleSubmit}
					>
						Login
					</Button>
				</Stack>
				
				{/* </form> */}
			</div>
		</Container>
	);
};

export default Login;

