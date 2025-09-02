const { Router } = require("express");
const { AdminAuthModel } = require("../Modal/AdminAuth.model.js");
const bcrypt = require("bcrypt");
const adminController = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
adminController.post("/register",async (req, res) => {
	const { name, email, password } = req.body;
	await bcrypt.hash(password, 5, async (err, hash) => {
		if (err) {
			return res.status(504).json("some error in while storing password");
		}
		const user = new AdminAuthModel({
			name,
			email,
			password: hash
		});
		try {
			await user.save();
			res.status(200).send({ message: "Registerd Successful" });
		} catch (err) {
			console.log('err: during register ', err);
			res.status(502).send({ message: "Already Registered" });
		}
	});
});
adminController.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await AdminAuthModel.findOne({ email: email });
	if (!user) {
		return res.status(406).send({ message: "Wrong Credentials" });
	}
	const hash = user.password;
	bcrypt.compare(password, hash, async (err, result) => {
		if (err) {
			console.log('err: during Login ', err);
			return res.status(406).send({ message: "Wrong Credentials" });
		}
		if (result) {
			const token = jwt.sign(
				{ userId: user.email },
				"manish"
			);
			res.status(200).json(token);
		}
	});
});
module.exports = {
	adminController
};