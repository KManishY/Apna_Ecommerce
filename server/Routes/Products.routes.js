const { Router } = require("express");
const { ProductModel } = require("../Modal/product.module.js");

const dataController = Router();

dataController.get("/", async (req, res) => {
	const a = req.query.params;
	console.log("a: ", a);

	let product;
	if (a.sort == "asc" && a.category) {
		product = await ProductModel.find({ prod_cat: a.category }).sort({
			prod_price: -1
		});
	} else if (a.sort == "desc" && a.category) {
		product = await ProductModel.find({ prod_cat: a.category }).sort({
			prod_price: 1
		});
	} else if (a.sort == "" || a.category) {
		product = await ProductModel.find({ prod_cat: a.category });
	} else {
		product = await ProductModel.find();
	}
	res.status(200).json(product);
});

module.exports = { dataController };
