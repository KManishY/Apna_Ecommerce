const jwt = require("jsonwebtoken");
const { AuthModel } = require("../Modal/userauth.model.js");
require("dotenv").config();

const authentication = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res.send("Please Login Again");
	}
	const token = req.headers.authorization;
	
	try {
		const decoded = jwt.verify(token, "manish" || "manish");
		const userEmail = decoded.userId;
		
		// Find user in database to get ObjectId
		const user = await AuthModel.findOne({ email: userEmail });
		if (!user) {
			return res.send("User not found");
		}
		
		req.body.userEmail = userEmail;
		req.body.userId = user._id; // Set the actual ObjectId
		next();
	} catch (err) {
		console.log(err);
		res.send("Please Login");
	}
};

module.exports = { authentication };
