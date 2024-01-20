const { Router } = require("express");
const { ProductModel } = require("../Modal/product.module.js");
const dataController = Router();

// GET request to fetch products based on query parameters
dataController.get("/", async (req, res) => {
    const a = req.query.params;
    let query = {};

    // Check if a category parameter is provided
    if (a.category) {
        query.prod_cat = a.category; // Add category to the query
    }

    // Check if a sortByRating parameter is provided
    if (a.sortByRating) {
        if (a.sortByRating === "low") {
            query.prod_rating = { $lte: 3 }; // Add rating condition for low rating
        } else if (a.sortByRating === "high") {
            query.prod_rating = { $gte: 4 }; // Add rating condition for high rating
        }
    }

    let sort = {};

    // Check if a sort parameter is provided
    if (a.sort === "asc") {
        sort.prod_price = -1; // Sort in ascending order based on price
    } else if (a.sort === "desc") {
        sort.prod_price = 1; // Sort in descending order based on price
    }

    // Perform the database query using the constructed query and sort parameters
    let product = await ProductModel.find(query)
        .sort(sort)
        .collation({ locale: "en_US", numericOrdering: true })
        

    return res.status(200).json(product);
});

// POST request to fetch cart data
dataController.post("/cartData", async (req, res) => {
	const ids = req.body;
	const cartData = await ProductModel.find({});
});

module.exports = { dataController };