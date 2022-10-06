import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { login } from "../../Redux/AuthReducer/action.js";
import { LOGIN_SUCCESS } from "../../Redux/AuthReducer/constants.js";
import { useDispatch, useSelector } from "react-redux";
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

export default function Login() {
	const classes = useStyles();
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
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					{/* <LockOutlinedIcon /> */}
				</Avatar>
				<Typography component='h1' variant='h5'>
					Login Page
				</Typography>
				<form>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='username'
						label='Username'
						name='username'
						onChange={(e) => handleChange(e)}
						autoComplete='username'
						autoFocus
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						onChange={(e) => handleChange(e)}
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>

					<Button
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						onClick={handleSubmit}
					>
						Log In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link variant='body2'>Forgot password?</Link>
						</Grid>
						<Grid item>
							<Link to='/signup'>
								{"Don't have an account? Register"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
