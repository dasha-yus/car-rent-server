const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/", (req, res) => {
  Car.find()
    .then((videos) => res.json(videos))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
