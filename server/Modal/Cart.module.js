const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
	prod_id: {
		type: String,
		// unique: true,
		required: true
	},
	userEmail: {
		type: String,
		required: true
	},
	prod_name: {
		type: String,
		required: true
	},
	prod_cat: {
		type: String,
		required: true
		// unique: true
	},
	prod_price: {
		type: Number,
		required: true
		// unique: true
	},
	prod_rating: {
		type: String,
		required: true
	},
	prod_desc: {
		type: String,
		// unique: true,
		required: true
	},
	prod_tag: {
		type: String,
		required: true
	},
	prod_image: {
		type: String
	},
	prod_discount: {
		type: String
	},
	count: { type: Number, default: 1 }
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = { CartModel };
