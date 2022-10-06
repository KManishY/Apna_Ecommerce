const { Router } = require("express");
const { ProductModel } = require("../Modal/product.module.js");

const dataController = Router();

dataController.get("/", async (req, res) => {
	const a = req.query.params;

	// const search = a.allProduct[0];
	// console.log("a: ", a.allProduct[0]);
	let product;
	if (a) {
		product = await ProductModel.find({ prod_cat: a.allProduct });
	} else {
		product = await ProductModel.find();
	}
	res.status(200).json(product);
});

module.exports = { dataController };
