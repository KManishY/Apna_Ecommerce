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
	count: { type: Number, default: 1 }
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = { CartModel };
