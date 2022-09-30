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
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function Login() {
	const classes = useStyles();
	const initialState = {
		email: "",
		password: ""
	};
	const [loginDetails, setLoginDetails] = useState(initialState);

	const handleChange = (e) => {
		// console.log(e.target.value);

		setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
		console.log(loginDetails);
	};
	const handleSubmit = () => {};

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
						id='email'
						label='Email Address'
						name='email'
						onChange={(e) => handleChange(e)}
						autoComplete='email'
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
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
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
							<Link variant='body2'>
								{"Don't have an account? Register"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
