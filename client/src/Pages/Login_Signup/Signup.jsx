import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/AuthReducer/action.js";
import { REGISTER_SUCCESS } from "../../Redux/AuthReducer/constants.js";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function Signup() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status } = useSelector((state) => state.AuthReducer);
	// console.log("state: ", status);

	const initialState = {
		name: "",
		email: "",
		password: "",
		username: "",
		mobile: ""
	};
	const [registerDetails, setRegisterDetails] = useState({
		name: "",
		email: "",
		password: "",
		username: "",
		mobile: ""
	});

	const handleChange = (e) => {
		setRegisterDetails({
			...registerDetails,
			[e.target.name]: e.target.value
		});
		console.log(registerDetails);
	};
	const handleSubmit = () => {
		if (registerDetails) {
			dispatch(register(registerDetails)).then((r) => {
				if (r.type === REGISTER_SUCCESS) {
					alert(status);
					navigate("/login");
				}
			});
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					{/* <LockOutlinedIcon /> */}
				</Avatar>
				<Typography component='h1' variant='h5'>
					Signup Page
				</Typography>
				<form className={classes.form}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='name'
						label='Name'
						name='name'
						// value={name}
						autoComplete='name'
						autoFocus
						onChange={(e) => handleChange(e)}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						// value={email}
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						onChange={(e) => handleChange(e)}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						// value={password}
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						onChange={(e) => handleChange(e)}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						// value={username}
						name='username'
						label='Username'
						type='text'
						id='username'
						onChange={(e) => handleChange(e)}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						// value={mobile}
						name='mobile'
						label='Mobile_Number'
						type='text'
						id='mobile'
						onChange={(e) => handleChange(e)}
					/>

					<Button
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						onClick={handleSubmit}
					>
						Register
					</Button>
				</form>
			</div>
		</Container>
	);
}

// {
//     "name":"lovie",
//     "email": "lovie@gmail.com",
// 	"password": "123",
//     "username":"lovie1",
//     "mobile":"9887654321"
// }
