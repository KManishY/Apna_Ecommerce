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

export default function Signup() {
	const classes = useStyles();

	const initialState = {
		name: "",
		email: "",
		password: "",
		username: "",
		mobile: ""
	};
	const [registerDetails, setRegisterDetails] = useState(initialState);

	const handleChange = (e) => {
		// console.log(e.target.value);

		setRegisterDetails({
			...registerDetails,
			[e.target.name]: e.target.value
		});
		console.log(registerDetails);
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
