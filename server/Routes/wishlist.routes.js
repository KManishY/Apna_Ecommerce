const express = require("express");
const { WishlistModel } = require("../Modal/wishlist.module.js");
const { ProductModel } = require("../Modal/product.module.js");
const { authentication } = require("../Middleware/authentication.js");

const wishlistController = express.Router();

// Apply authentication middleware to all routes
wishlistController.use(authentication);

// GET /wishlist - Get user's wishlist with product details
wishlistController.get("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const userId = req.body.userId;
    
    // Get wishlist items with product details using aggregation
    const wishlistItems = await WishlistModel.aggregate([
      {
        $match: { userEmail: userEmail }
      },
      {
        $addFields: {
          productIdObjectId: { $toObjectId: "$productId" }
        }
      },
      {
        $lookup: {
          from: "products", // Collection name in MongoDB
          localField: "productIdObjectId",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true // Don't remove items if product not found
        }
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          userEmail: 1,
          productId: 1,
          addedAt: 1,
          createdAt: 1,
          updatedAt: 1,
          product: {
            _id: "$product._id",
            prod_name: "$product.prod_name",
            prod_image: "$product.prod_image",
            prod_price: "$product.prod_price",
            prod_cat: "$product.prod_cat",
            prod_rating: "$product.prod_rating",
            prod_desc: "$product.prod_desc",
            prod_tag: "$product.prod_tag",
            prod_discount: "$product.prod_discount"
          }
        }
      },
      {
        $sort: { addedAt: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully",
      data: {
        totalItems: wishlistItems.length,
        items: wishlistItems
      }
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message
    });
  }
});

// POST /wishlist - Add product to wishlist
wishlistController.post("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const userId = req.body.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Check if product is already in wishlist
    const existingWishlistItem = await WishlistModel.findOne({
      userEmail,
      productId
    });

    if (existingWishlistItem) {
      return res.status(200).json({
        success: true,
        message: "Product already in wishlist",
        data: existingWishlistItem
      });
    }

    // Create new wishlist item with only references
    const wishlistItem = new WishlistModel({
      userId,
      userEmail,
      productId
    });

    await wishlistItem.save();

    res.status(201).json({
      success: true,
      message: "Product added to wishlist successfully",
      data: wishlistItem
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Product already in wishlist"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
      error: error.message
    });
  }
});

// DELETE /wishlist/:productId - Remove product from wishlist
wishlistController.delete("/:productId", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const { productId } = req.params;

    const deletedItem = await WishlistModel.findOneAndDelete({
      userEmail,
      productId
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      data: deletedItem
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist",
      error: error.message
    });
  }
});

// DELETE /wishlist - Clear entire wishlist
wishlistController.delete("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;

    const result = await WishlistModel.deleteMany({ userEmail });

    res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
      data: {
        deletedCount: result.deletedCount
      }
    });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear wishlist",
      error: error.message
    });
  }
});

// GET /wishlist/check/:productId - Check if product is in wishlist
wishlistController.get("/check/:productId", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const { productId } = req.params;

    const wishlistItem = await WishlistModel.findOne({
      userEmail,
      productId
    });

    res.status(200).json({
      success: true,
      data: {
        isInWishlist: !!wishlistItem,
        item: wishlistItem
      }
    });
  } catch (error) {
    console.error("Error checking wishlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check wishlist status",
      error: error.message
    });
  }
});

// GET /wishlist/count - Get wishlist item count
wishlistController.get("/count", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;

    const count = await WishlistModel.countDocuments({ userEmail });

    res.status(200).json({
      success: true,
      data: {
        count
      }
    });
  } catch (error) {
    console.error("Error getting wishlist count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get wishlist count",
      error: error.message
    });
  }
});

module.exports = wishlistController;
