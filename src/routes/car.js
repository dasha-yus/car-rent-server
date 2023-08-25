const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/cars", (req, res) => {
  Car.find()
    .then((cars) => res.json(cars))
    .catch((err) => res.status(500).json(err));
});

router.get("/cars/:id", (req, res) => {
  Car.findById(req.params.id)
    .then((car) => res.json(car))
    .catch((err) => res.status(500).json(err));
});

router.delete("/cars/:id", (req, res, next) => {
  Car.findByIdAndRemove(req.params.id)
    .then((car) => res.json(car))
    .catch((err) => res.status(500).json(err));
});

router.post("/cars", (req, res) => {
  Car.create(req.body)
    .then((car) => res.json(car))
    .catch((err) => res.status(500).json(err));
});

// winston for logging
// swagger
// validation middleware

module.exports = router;
