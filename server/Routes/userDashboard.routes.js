const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { CartModel } = require("../Modal/Cart.module.js");
const { ProductModel } = require("../Modal/product.module.js");
require("dotenv").config();

const userProductController = Router();
userProductController.get("/cart", async (req, res) => {
	try {
		const { userEmail } = req.body;
		const cartWithProducts = await CartModel.aggregate([
			// Stage 1: Match cart items for the specific user
			{
				$match: {
					userEmail: userEmail
				}
			},
			// Stage 2: Convert prod_id string to ObjectId for proper lookup
			{
				$addFields: {
					prod_id_object: { $toObjectId: "$prod_id" }
				}
			},
			// Stage 3: Lookup to join with products collection
			{
				$lookup: {
					from: "products", // Collection name in MongoDB (usually pluralized)
					localField: "prod_id_object",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			// Stage 4: Unwind the productDetails array (since lookup returns an array)
			{
				$unwind: {
					path: "$productDetails",
					preserveNullAndEmptyArrays: true // Keep cart items even if product not found
				}
			},
			// Stage 5: Project the final structure
			{
				$project: {
					_id: 1,
					prod_id: 1,
					userEmail: 1,
					count: 1,
					// Product details
					productName: "$productDetails.prod_name",
					productCategory: "$productDetails.prod_cat",
					productPrice: "$productDetails.prod_price",
					productRating: "$productDetails.prod_rating",
					productDescription: "$productDetails.prod_desc",
					productTag: "$productDetails.prod_tag",
					productImage: "$productDetails.prod_image",
					// Calculate total price for this cart item
					totalPrice: {
						$multiply: [
							{ $toDouble: "$productDetails.prod_price" },
							"$count"
						]
					}
				}
			},
			// Stage 6: Sort by creation date (optional)
			{
				$sort: {
					_id: -1
				}
			}
		]);

		// Calculate cart summary
		const cartSummary = {
			totalItems: cartWithProducts.length,
			totalPrice: cartWithProducts.reduce((sum, item) => sum + (item.totalPrice || 0), 0),
			items: cartWithProducts
		};

		res.status(200).json({
			success: true,
			data: cartSummary
		});

	} catch (error) {
		console.error("Error fetching cart:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching cart items",
			error: error.message
		});
	}
});

userProductController.post("/create", async (req, res) => {
	const {
		userEmail,
		_id
	} = req.body;
	let alreadyData = await CartModel.findOne({
		userEmail: req.body.userEmail,
		prod_id: _id
	});

	const product = new CartModel({
		prod_id: _id,
		userEmail: userEmail,

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
	try {
		await CartModel.findOneAndDelete({
			prod_id: id,
			userEmail
		});
		res.status(200).send({ message: "Product delete successfully" });
	} catch (error) {
		res.status(500).send(error);
	}
});

// Advanced aggregation pipeline for cart analytics
userProductController.get("/cart/analytics", async (req, res) => {
	try {
		const { userEmail } = req.body;
		
		// Advanced aggregation pipeline for cart analytics
		const cartAnalytics = await CartModel.aggregate([
			// Stage 1: Match cart items for the specific user
			{
				$match: {
					userEmail: userEmail
				}
			},
			// Stage 2: Convert prod_id string to ObjectId for proper lookup
			{
				$addFields: {
					prod_id_object: { $toObjectId: "$prod_id" }
				}
			},
			// Stage 3: Lookup to join with products collection
			{
				$lookup: {
					from: "products",
					localField: "prod_id_object",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			// Stage 4: Unwind the productDetails array
			{
				$unwind: {
					path: "$productDetails",
					preserveNullAndEmptyArrays: true
				}
			},
			// Stage 5: Add calculated fields
			{
				$addFields: {
					totalPrice: {
						$multiply: [
							{ $toDouble: "$productDetails.prod_price" },
							"$count"
						]
					},
					productPrice: { $toDouble: "$productDetails.prod_price" }
				}
			},
			// Stage 6: Group by category for analytics
			{
				$group: {
					_id: "$productDetails.prod_cat",
					categoryCount: { $sum: "$count" },
					categoryTotal: { $sum: "$totalPrice" },
					avgPrice: { $avg: "$productPrice" },
					products: {
						$push: {
							productId: "$prod_id",
							productName: "$productDetails.prod_name",
							quantity: "$count",
							price: "$productPrice",
							totalPrice: "$totalPrice"
						}
					}
				}
			},
			// Stage 7: Sort by category total
			{
				$sort: {
					categoryTotal: -1
				}
			}
		]);

		// Calculate overall cart statistics
		const overallStats = await CartModel.aggregate([
			{
				$match: {
					userEmail: userEmail
				}
			},
			{
				$addFields: {
					prod_id_object: { $toObjectId: "$prod_id" }
				}
			},
			{
				$lookup: {
					from: "products",
					localField: "prod_id_object",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
				$unwind: {
					path: "$productDetails",
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$group: {
					_id: null,
					totalItems: { $sum: "$count" },
					totalValue: {
						$sum: {
							$multiply: [
								{ $toDouble: "$productDetails.prod_price" },
								"$count"
							]
						}
					},
					avgItemPrice: {
						$avg: { $toDouble: "$productDetails.prod_price" }
					},
					uniqueProducts: { $addToSet: "$prod_id" }
				}
			},
			{
				$project: {
					_id: 0,
					totalItems: 1,
					totalValue: 1,
					avgItemPrice: 1,
					uniqueProductCount: { $size: "$uniqueProducts" }
				}
			}
		]);

		res.status(200).json({
			success: true,
			data: {
				overallStats: overallStats[0] || {
					totalItems: 0,
					totalValue: 0,
					avgItemPrice: 0,
					uniqueProductCount: 0
				},
				categoryBreakdown: cartAnalytics
			}
		});

	} catch (error) {
		console.error("Error fetching cart analytics:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching cart analytics",
			error: error.message
		});
	}
});

// Debug route to check cart and product data
userProductController.get("/debug/cart-products", async (req, res) => {
	try {
		const { userEmail } = req.body;
		
		// Get cart items
		const cartItems = await CartModel.find({ userEmail: userEmail });
		
		// Get sample products
		const sampleProducts = await ProductModel.find().limit(5);
		
		// Try to find products by the cart prod_ids
		const cartProductIds = cartItems.map(item => item.prod_id);
		const foundProducts = await ProductModel.find({
			_id: { $in: cartProductIds.map(id => new mongoose.Types.ObjectId(id)) }
		});
		
		res.status(200).json({
			success: true,
			debug: {
				cartItems: cartItems,
				sampleProducts: sampleProducts,
				cartProductIds: cartProductIds,
				foundProducts: foundProducts,
				message: "Debug information for cart-product join"
			}
		});
		
	} catch (error) {
		console.error("Debug error:", error);
		res.status(500).json({
			success: false,
			message: "Debug error",
			error: error.message
		});
	}
});

module.exports = { userProductController };
