const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGO_URL);
const connection = mongoose.connect(process.env.MONGO_URL || "mongodb+srv://devmanish:kmanishy@manish-database.qngxa4n.mongodb.net/apnaEcom?retryWrites=true&w=majority");

module.exports = {
	connection
};
