const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/cars", (req, res) => {
  Car.find()
    .then((videos) => res.json(videos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/cars/:id", (req, res) => {
  Car.findById(req.params.id)
    .then((car) => res.json(car))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
