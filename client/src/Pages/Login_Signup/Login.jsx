import { useEffect, useState } from "react";
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
	const [first, setfirst] = useState(true);
	const handleShowClick = () => setShowPassword(!showPassword);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector(state => state.AuthReducer);

	const initialState = { username: "", password: "" };
	const [loginDetails, setLoginDetails] = useState(initialState);

	const handleChange = e => {
		setLoginDetails({
			...loginDetails,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = () => {
		if (loginDetails) {
			console.log("loginDetails: ", loginDetails);
			dispatch(login(loginDetails)).then(r => {
				if (r.type === LOGIN_SUCCESS) {
					alert("Login Successfully");
					localStorage.setItem("token", token);
					console.log("token: login ", token);
					navigate("/product");
					window.location.reload();
				}
			});
		}
	};
	// useEffect(() => {
	// 	if (first) {
	// 		setfirst(false);
	// 		window.location.reload();
	// 	}
	// }, []);

	return (
		<Flex
			flexDirection="column"
			width="100wh"
			height="105.6vh"
			justifyContent="center"
			alignItems="center"
			mt="-110px"
		>
			<Stack
				border="2px solid #070b34"
				flexDir="column"
				mb="2"
				justifyContent="center"
				alignItems="center"
				bg="white"
			>
				<Avatar bg="#070b34" mt="1rem" />
				<Heading color="#070b34">Welcome</Heading>
				<Box minW={{ base: "90%", md: "468px" }}>
					<form>
						<Stack spacing={4} p="1rem" boxShadow="md">
							{" "}// backgroundColor='#E2DFD2'
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										children={
											<CFaUserAlt color="gray.300" />
										}
									/>
									<Input
										type="text"
										placeholder="UserName"
										name="username"
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
										type={
											showPassword ? "text" : "password"
										}
										placeholder="Password"
										name="password"
										onChange={e => handleChange(e)}
									/>
									<InputRightElement width="4.5rem">
										<Button
											style={{
												color: "white",
												backgroundColor: "teal"
											}}
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
					</form>
				</Box>
			</Stack>
			<Box>
				<Link to="/signup">New to us? Sign Up</Link>
			</Box>
		</Flex>
	);
}
//  "@material-ui/core": "^4.12.4",
