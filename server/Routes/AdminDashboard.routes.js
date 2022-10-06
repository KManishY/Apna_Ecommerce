const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ProductModel } = require("../Modal/product.module.js");
require("dotenv").config();

const adminProductController = Router();

adminProductController.get("/", async (req, res) => {
	const product = await ProductModel.find();
	res.status(200).json(product);
});

adminProductController.post("/create", async (req, res) => {
	const {
		prod_name,
		prod_cat,
		prod_price,
		prod_rating,
		prod_desc,
		prod_tag,
		prod_image
	} = req.body;
	console.log(req.body);

	const product = new ProductModel({
		prod_name,
		prod_cat,
		prod_price,
		prod_rating,
		prod_desc,
		prod_tag,
		prod_image
	});
	try {
		await product.save();
		res.status(200).send({ employee: "Product added Successfully" });
	} catch (error) {
		res.status(500).send({ error: error });
	}
});

adminProductController.patch("/edit/:prodId", async (req, res) => {
	const { prodId } = req.params;
	const productUpdate = await ProductModel.findOneAndUpdate(
		{ _id: prodId },
		req.body
	);
	if (productUpdate) {
		res.status(200).send({ message: "Product Updated Successfully" });
	} else {
		res.send({ message: "Try Again" });
	}
});

adminProductController.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await ProductModel.findOneAndDelete({
			id
		});
		res.status(200).send({ message: "Product delete successfully" });
	} catch (error) {
		res.status(500).send(error);
	}
});
module.exports = { adminProductController };



 {
		// "prod_name":"product1",
		// 	"prod_cat":"cat1",
		// 	"prod_price":"price1",
		// 	"prod_rating":"rating1",
		// 	"prod_desc":"desc1",
		// 	"prod_tag":"tag1",
		// 	"prod_image":"imag1";
 }