const mongoose = require("mongoose");
const adminAuthSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
		// unique: true
	},
	password: {
		type: String,
		required: true
	}
});

const AdminAuthModel = mongoose.model("Admin", adminAuthSchema);
module.exports = { AdminAuthModel };
