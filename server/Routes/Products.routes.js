const { Router } = require("express");
const { ProductModel } = require("../Modal/product.module.js");
const dataController = Router();

// GET request to fetch products based on query parameters
dataController.get("/", async (req, res) => {
  try {
    const a = req.query || {}; // ✅ fallback if no query params
    let query = {};
    let sort = {};
    console.log(a);
    // Filter by category
    if (a.category) {
      query.prod_cat = a.category;
    }

    // Filter by rating
    if (a.sortByRating) {
      if (a.sortByRating === "low") {
        query.prod_rating = { $lte: 3 };
      } else if (a.sortByRating === "high") {
        query.prod_rating = { $gte: 4 };
      }
    }

    // Sort by price
    if (a.sort === "asc") {
      sort.prod_price = 1; // ascending
    } else if (a.sort === "desc") {
      sort.prod_price = -1; // descending
    }

    // Query DB
    let product = await ProductModel.find(query)
      .sort(sort)
      .collation({ locale: "en_US", numericOrdering: true });

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});


// POST request to fetch cart data
dataController.post("/cartData", async (req, res) => {
	const ids = req.body;
	const cartData = await ProductModel.find({});
});

module.exports = { dataController };