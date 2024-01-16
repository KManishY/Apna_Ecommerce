const { Router } = require("express");
const { ProductModel } = require("../Modal/product.module.js");
const dataController = Router();

// GET request to fetch products based on query parameters
dataController.get("/", async (req, res) => {
	const a = req.query.params;

	// Sorting products in ascending order based on price and high rating
	if (a.sort == "asc" && a.category && a.sortByRating == "high") {
		let product = await ProductModel.find({
			prod_cat: a.category,
			prod_rating: { $gte: 4 }
		})
			.sort({
				prod_price: -1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	} 
	// Sorting products in ascending order based on price and low rating
	else if (a.sort == "asc" && a.category && a.sortByRating == "low") {
		let product = await ProductModel.find({
			prod_cat: a.category, 
			prod_rating: { $lte: 4 }
		})
			.sort({
				prod_price: -1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	}
	// Sorting products in descending order based on price and low rating
	else if (a.sort == "desc" && a.category && a.sortByRating == "low") {
		let product = await ProductModel.find({
			prod_cat: a.category,
			prod_rating: { $lte: 3 }
		})
			.sort({
				prod_price: 1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	} 
	// Sorting products in descending order based on price and high rating
	else if (a.sort == "desc" && a.category && a.sortByRating == "high") {
		let product = await ProductModel.find({
			prod_cat: a.category,
			prod_rating: { $gte: 3 }
		})
			.sort({
				prod_price: 1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	}
	// Sorting products in ascending order based on price and low rating
	else if (a.sort == "asc" && a.sortByRating == "low") {
		let product = await ProductModel.find({ prod_rating: { $lte: 3 } })
			.sort({
				prod_price: -1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	} 
	// Sorting products in ascending order based on price and high rating
	else if (a.sort == "asc" && a.sortByRating == "high") {
		let product = await ProductModel.find({ prod_rating: { $gte: 4 } })
			.sort({
				prod_price: -1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	}
	// Sorting products in descending order based on price and low rating
	else if (a.sort == "desc" && a.sortByRating == "low") {
		let product = await ProductModel.find({ prod_rating: { $lte: 3 } })
			.sort({
				prod_price: 1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	} 
	// Sorting products in descending order based on price and high rating
	else if (a.sort == "desc" && a.sortByRating == "high") {
		let product = await ProductModel.find({ prod_rating: { $gte: 4 } })
			.sort({
				prod_price: 1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	}
	// Sorting products in ascending order based on price and category
	else if (a.category && a.sort == "asc") {
		let product = await ProductModel.find({
			prod_cat: a.category,
		}).sort({
				prod_price: -1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	} 
	// Sorting products in descending order based on price and category
	else if (a.category && a.sort == "desc") {
		let product = await ProductModel.find({
			prod_cat: a.category,
		}).sort({
				prod_price: 1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	}
	// Fetching products based on category and low rating
	else if (a.category && a.sortByRating == "low") {
		let product = await ProductModel.find({
			prod_cat: a.category,
			prod_rating: { $lte: 3 }
		});
		return res.status(200).json(product);
	} 
	// Fetching products based on category and high rating
	else if (a.category && a.sortByRating == "high") {
		let product = await ProductModel.find({
			prod_cat: a.category,
			prod_rating: { $gte: 4 }
		});
		return res.status(200).json(product);
	}
	// Fetching products based on category
	else if (a.category) {
		let product = await ProductModel.find({
			prod_cat: a.category
		});
		return res.status(200).json(product);
	}
	// Fetching products with high rating
	else if (a.sortByRating == "high") {
		let product = await ProductModel.find({ prod_rating: { $gte: 4 } });
		return res.status(200).json(product);
	} 
	// Fetching products with low rating
	else if (a.sortByRating == "low") {
		let product = await ProductModel.find({ prod_rating: { $lte: 3 } });
		return res.status(200).json(product);
	} 
	// Sorting products in ascending order based on price
	else if (a.sort == "asc") {
		let product = await ProductModel.find()
			.sort({
				prod_price: -1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	}
	// Sorting products in descending order based on price
	else if (a.sort == "desc") {
		let product = await ProductModel.find()
			.sort({
				prod_price: 1
			})
			.collation({ locale: "en_US", numericOrdering: true });
		return res.status(200).json(product);
	}
	// Fetching products based on category
	else if (a.category) {
		let product = await ProductModel.find({ prod_cat: a.category });
		return res.status(200).json(product);
	}
	// Fetching 10 products if no parameters are provided
	else {
		let product = await ProductModel.find().limit(10);
		return res.status(200).json(product);
	}
});

// POST request to fetch cart data
dataController.post("/cartData", async (req, res) => {
	const ids = req.body;
	const cartData = await ProductModel.find({});
});

module.exports = { dataController };