const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
	prod_name: {
		type: String
		// required: true
	},
	prod_cat: {
		type: String
		// required: true
		// unique: true
	},
	prod_price: {
		type: Number
		// required: true
		// unique: true
	},
	prod_rating: {
		type: String
		// required: true
	},
	prod_desc: {
		type: String
		// unique: true,
		// required: true
	},
	prod_tag: {
		type: String
		// required: true
	},
	prod_image: {
		type: String
	}
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = { ProductModel };
