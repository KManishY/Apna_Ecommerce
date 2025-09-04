const jwt = require("jsonwebtoken");
require("dotenv").config();
const authorized = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Please Login Again");
  }

  const token = req.headers.authorization;
  await jwt.verify(token, "manish", function (err, decoded) {
    // console.log(decoded);
    if (err) {
      res.status(400).send(err);
    } else if (decoded.userId == "manishyadav4657@gmail.com") {
      next();
    } else {
      // req.body.adminEmail = decoded.userId;
      res.status(401).send({
        message: "You are not authorized to access this"
      });
    }
  });
};

module.exports = { authorized };


