const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
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
	},
	username: {
		type: String,
		// unique: true,
		required: true
	},
	mobile: {
		type: String,
		required: true
	}
});

const AuthModel = mongoose.model("user", authSchema);
module.exports = { AuthModel };
