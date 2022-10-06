const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ProductModel } = require("../Modal/product.module.js");
const { CartModel } = require("../Modal/Cart.module.js");
require("dotenv").config();

const userProductController = Router();

userProductController.get("/", async (req, res) => {
	const product = await ProductModel.find();
	res.status(200).json(product);
});
userProductController.get("/cart", async (req, res) => {
	const product = await CartModel.find();
	res.status(200).json(product);
});

userProductController.post("/create", async (req, res) => {
	const { userEmail, Prod_id, count } = req.body;
	console.log(req.body);

	const product = new CartModel({
		userEmail,
		Prod_id,
		count
	});
	try {
		await product.save();
		res.status(200).send({ message: "Product added Successfully" });
	} catch (error) {
		res.status(500).send({ error: error });
	}
});

userProductController.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;
	const { userEmail } = req.body;
	console.log("blhghgj", id, userEmail);
	try {
		await CartModel.findOneAndDelete({
			_id: id,
			userEmail
		});
		res.status(200).send({ message: "Product delete successfully" });
	} catch (error) {
		res.status(500).send(error);
	}
});
module.exports = { userProductController };
