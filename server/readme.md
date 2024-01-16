# Authentication Middleware

This code provides an authentication middleware for protecting routes in an Express application. It uses JSON Web Tokens (JWT) for authentication.


## Usage

To use the authentication middleware, follow these steps:
```
1. Import the required dependencies and configure the environment variables:
const jwt = require("jsonwebtoken");
require("dotenv").config();
2. Define the authentication middleware function:
const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Please Login Again");
  }
  const token = req.headers.authorization;
  await jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      res.send("Please Login");
    } else {
      req.body.userEmail = decoded.userId;
      next();
    }
  });
};
3. Export the authentication middleware function:
module.exports = { authentication };
4. In your Express application, use the authentication middleware to protect routes:

const express = require("express");
const app = express();

const { authentication } = require("./path/to/authentication.js");

// Protected route
app.get("/protected", authentication, (req, res) => {
  res.send("Protected route");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
``````
Make sure to replace  `"./path/to/authentication.js"`  with the actual path to the authentication middleware file.

## Configuration

Before using the authentication middleware, make sure to configure the following environment variable:

-  `SECRET_KEY` : Secret key used for signing and verifying JWTs

You can set the  `SECRET_KEY`  environment variable in a  `.env`  file in the root directory of your project.

## License

This code is licensed under the [MIT License](https://opensource.org/licenses/MIT).


# Authorization
This code provides an authorization middleware for protecting routes in an Express application using JSON Web Tokens (JWT). It verifies the JWT token from the request header and checks if the decoded user ID matches a specific value ("manishyadav4657@gmail.com"). If the token is valid and the user ID matches, the middleware allows access to the protected route. If not, it returns an error message indicating that the user is not authorized. The middleware relies on the  `jsonwebtoken`  library and requires the  `SECRET_KEY`  environment variable to be set.
```
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authorized = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Please Login Again");
  }
  console.log("helloUpdate")

  const token = req.headers.authorization;
  await jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
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
```
