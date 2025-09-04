const jwt = require("jsonwebtoken");
const { AuthModel } = require("../Modal/userauth.model.js");
require("dotenv").config();

const authentication = async (req, res, next) => {
	console.log("Authentication middleware called for:", req.method, req.path);
	console.log("Authorization header:", req.headers.authorization ? "Present" : "Missing");
	
	if (!req.headers.authorization) {
		console.log("No authorization header found");
		return res.send("Please Login Again");
	}
	const token = req.headers.authorization;
	
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || "manish");
		const userEmail = decoded.userId;
		
		// Find user in database to get ObjectId
		const user = await AuthModel.findOne({ email: userEmail });
		if (!user) {
			console.log("Authentication failed: User not found for email:", userEmail);
			return res.send("User not found");
		}
		
		console.log("Authentication successful for user:", userEmail, "with ID:", user._id);
		req.body.userEmail = userEmail;
		req.body.userId = user._id; // Set the actual ObjectId
		next();
	} catch (err) {
		console.log(err);
		res.send("Please Login");
	}
};

module.exports = { authentication };
