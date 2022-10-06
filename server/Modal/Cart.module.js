const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
	Prod_id: {
		type: String,
		required: true
	},
	userEmail: {
		type: String,
		required: true
	},
	count: { type: String }
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = { CartModel };
