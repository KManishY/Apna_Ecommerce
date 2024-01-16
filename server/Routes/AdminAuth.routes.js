const { Router } = require("express");
const { AdminAuthModel } = require("../Modal/AdminAuth.model.js");
const bcrypt = require("bcrypt");
const adminController = Router();
const jwt = require("jsonwebtoken");
const { adminControllerFn } = require("../controller/admin.Route.js");
require("dotenv").config();
adminController.post("/register",adminControllerFn);
adminController.post("/login", async (req, res) => {
	// console.log("login: ", req.body);
	const { email, password } = req.body;
	const user = await AdminAuthModel.findOne({ email: email });
	if (!user) {
		return res.status(406).send({ message: "Wrong Credentials" });
	}
	const hash = user.password;
	bcrypt.compare(password, hash, async (err, result) => {
		if (err) {
			return res.status(406).send({ message: "Wrong Credentials" });
		}
		if (result) {
			const token = jwt.sign(
				{ userId: user.email },
				process.env.SECRET_KEY
			);
			res.status(200).json(token);
		}
	});
});
module.exports = {
	adminController
};