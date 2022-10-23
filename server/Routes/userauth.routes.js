const { Router } = require("express");
const { AuthModel } = require("../Modal/userauth.model.js");
const bcrypt = require("bcrypt");
const userController = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

userController.post("/register", async (req, res) => {
	const { name, email, password, username, mobile } = req.body;
	bcrypt.hash(password, 5, async (err, hash) => {
		if (err) {
			return res.status(504).json("some error in while storing password");
		}
		const user = new AuthModel({
			name,
			email,
			password: hash,
			username,
			mobile
		});
		try {
			await user.save();
			res.status(200).send({ message: "Registerd Successful" });
		} catch (err) {
			res.status(502).send({ message: "Already Registered" });
			// console.log("err: ", err);
		}
	});
});
userController.post("/login", async (req, res) => {
	// console.log(req.body, "loginData");
	const { password, username } = req.body;
	const user = await AuthModel.findOne({ username: username });
	console.log(user)
	if (!user) {
		return res.status(406).send({ message: "Wrong Credentials" });
	}
	const hash = user.password;
	bcrypt.compare(password, hash, async (err, result) => {
		if (err) {
			return res.status(406).send({ message: "Wrong Credentials" });
		}
		if (result) {
			console.log(result,"login successfully");
			const token = jwt.sign({ userId: user.email }, process.env.SECRET_KEY);
			res.status(200).json(token); //TODO send user details also to client
		}
	});
});

module.exports = {
	userController
};


