const express = require("express");
const router = express.Router();
const generateToken = require("../utils/generateToken.js");
const User = require("../models/user.js");

router.post("/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.email, user.isAdmin),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

router.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
