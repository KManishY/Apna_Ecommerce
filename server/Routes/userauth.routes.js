const { Router } = require("express");
const { AuthModel } = require("../Modal/userauth.model.js");
const bcrypt = require("bcrypt");
const userController = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

userController.post("/register", async (req, res) => {
  try {
    const { name, email, password, username, mobile } = req.body;
    const hash = await bcrypt.hash(password, 5);
    const user = new AuthModel({
      name,
      email,
      password: hash,
      username,
      mobile
    });
    await user.save();
    res.status(200).send({ message: "Registered Successfully" });
  } catch (err) {
    res.status(502).send({ message: "Already Registered" });
  }
});

userController.post("/login", async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await AuthModel.findOne({ username: username });

    if (!user) {
      return res.status(406).send({ message: "Wrong Credentials" });
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign({ userId: user.email }, process.env.SECRET_KEY);
      res.status(200).json({ token, user });
    } else {
      res.status(406).send({ message: "Wrong Credentials" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = {
  userController
};
