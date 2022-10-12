import { useState } from "react";
import {
	Flex,
	Heading,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	Avatar,
	FormControl,
	FormHelperText,
	InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/AuthReducer/action.js";
import { LOGIN_SUCCESS } from "../../Redux/AuthReducer/constants.js";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const handleShowClick = () => setShowPassword(!showPassword);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.AuthReducer);

	const initialState = {
		username: "",
		password: ""
	};
	const [loginDetails, setLoginDetails] = useState(initialState);

	const handleChange = (e) => {
		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
	};
	const handleSubmit = () => {
		if (loginDetails) {
			dispatch(login(loginDetails)).then((r) => {
				if (r.type === LOGIN_SUCCESS) {
					alert("Login Successfully");
					navigate("/product");
					localStorage.setItem("token", token);
				}
			});
		}
	};

	return (
		<Flex
			flexDirection='column'
			width='100wh'
			height='100vh'
			justifyContent='center'
			alignItems='center'
		>
			<Stack
				flexDir='column'
				mb='2'
				justifyContent='center'
				alignItems='center'
			>
				<Avatar bg='teal.500' />
				<Heading color='teal.400'>Welcome</Heading>
				<Box minW={{ base: "90%", md: "468px" }}>
					<form>
						<Stack
							spacing={4}
							p='1rem'
							// backgroundColor='#E2DFD2'
							boxShadow='md'
						>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents='none'
										children={
											<CFaUserAlt color='gray.300' />
										}
									/>
									<Input
										type='text'
										placeholder='UserName'
										name='username'
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
										type={
											showPassword ? "text" : "password"
										}
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
				</Box>
			</Stack>
			<Box>
				<Link to='/signup'>New to us? Sign Up</Link>
			</Box>
		</Flex>
	);
}
//  "@material-ui/core": "^4.12.4",