const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ProductModel } = require("../Modal/product.module.js");
const { AuthModel } = require("../Modal/userauth.model.js");
require("dotenv").config();

const adminProductController = Router();

adminProductController.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

adminProductController.get("/users", async (req, res) => {
  try {
    const users = await AuthModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

adminProductController.post("/create", async (req, res) => {
  try {
    const {
      prod_name,
      prod_cat,
      prod_price,
      prod_rating,
      prod_desc,
      prod_tag,
      prod_image
    } = req.body;

    const product = new ProductModel({
      prod_name,
      prod_cat,
      prod_price,
      prod_rating,
      prod_desc,
      prod_tag,
      prod_image
    });

    await product.save();

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

adminProductController.patch("/edit/:prodId", async (req, res) => {
  try {
    const { prodId } = req.params;

    const productUpdate = await ProductModel.findOneAndUpdate(
      { _id: prodId },
      req.body
    );

    if (productUpdate) {
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

adminProductController.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await ProductModel.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { adminProductController };