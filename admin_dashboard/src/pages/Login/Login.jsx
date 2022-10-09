import {
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
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { login } from "../../redux/action/authAction.js";
import { LOGIN_SUCCESS } from "../../redux/constants/appConstant.js";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const Login = () => {
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const handleShowClick = () => setShowPassword(!showPassword);
	const initialState = {
		username: "",
		password: ""
	};
	const [loginDetails, setLoginDetails] = useState(initialState);
	// const handleSubmit = () => {};
	const handleSubmit = () => {
		if (loginDetails) {
			dispatch(login(loginDetails)).then((r) => {
				if (r.type === LOGIN_SUCCESS) {
					alert("Login Successfully");
					// localStorage.setItem("token", token);
				}
			});
		}
	};
	const handleChange = (e) => {
		console.log(loginDetails);
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<form>
				<Stack
					spacing={4}
					p='1rem'
					backgroundColor='whiteAlpha.900'
					boxShadow='md'
				>
					<Heading>Login</Heading>
					<FormControl>
						<InputGroup>
							<InputLeftElement
								pointerEvents='none'
								children={<CFaUserAlt color='gray.300' />}
							/>
							<Input
								type='email'
								placeholder='Email'
								name='email'
								onChange={(e) => handleChange(e)}
							/>
						</InputGroup>
					</FormControl>
					<FormControl>
						<InputGroup>
							<InputLeftElement
								pointerEvents='none'
								color='gray.300'
								children={<CFaLock color='gray.300' />}
							/>
							<Input
								type={showPassword ? "text" : "password"}
								placeholder='Password'
								name='password'
								onChange={(e) => handleChange(e)}
							/>
							<InputRightElement width='4.5rem'>
								<Button
									h='1.75rem'
									size='sm'
									onClick={handleShowClick}
								>
									{showPassword ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
						<FormHelperText textAlign='right'>
							<Link>forgot password?</Link>
						</FormHelperText>
					</FormControl>
					<Button
						borderRadius={0}
						type='submit'
						variant='solid'
						colorScheme='teal'
						width='full'
						onClick={handleSubmit}
					>
						Login
					</Button>
				</Stack>
			</form>
		</div>
	);
};

export default Login;

const Section = styled.div`
	margin: auto;
	width: 400px;
	height: 500px;
	border-radius: 30px;
	background: #e0e0e0;
	/* box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff; */
`;
