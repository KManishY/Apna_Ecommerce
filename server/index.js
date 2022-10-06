const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");
const { userController } = require("./Routes/userauth.routes.js");
const { adminController } = require("./Routes/AdminAuth.routes.js");
const { adminProductController } = require("./Routes/AdminDashboard.routes.js");
const { authorized } = require("./Middleware/authorization.js");
const { authentication } = require("./Middleware/authentication.js");
const { userProductController } = require("./Routes/userDashboard.routes.js");
const { dataController } = require("./Routes/Products.routes.js");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", function (req, res) {
	res.status(200).send("Welcome to HomePage");
});
app.use("/user", userController);
app.use("/admin", adminController);
app.use("/getAllProduct",dataController);
app.use("/admindashboard", authorized, adminProductController);
app.use("/userDashboard", authentication, userProductController);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
	try {
		await connection;
		console.log(`application listen on ${PORT}`);
	} catch (error) {
		console.log(error);
	}
});
