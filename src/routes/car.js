const express = require("express");
const router = express.Router();
const Car = require("../models/car");
const isAdmin = require("../middleware/isAdmin");

// Get all cars
router.get("/cars", (req, res) => {
  Car.find()
    .then((cars) => res.json(cars))
    .catch((err) => res.status(500).json(err));
});

// Get car by id
router.get("/cars/:id", (req, res) => {
  Car.findById(req.params.id)
    .then((car) => res.json(car))
    .catch((err) => res.status(500).json(err));
});

// Delete car
router.delete("/cars/:id", isAdmin, (req, res) => {
  Car.findByIdAndRemove(req.params.id)
    .then((car) => res.json(car))
    .catch((err) => res.status(500).json(err));
});

// Add new car
router.post("/cars", isAdmin, (req, res) => {
  Car.create(req.body)
    .then((car) => res.json(car))
    .catch((err) => res.status(500).json(err));
});

// Update car
router.put("/cars/:id", isAdmin, (req, res) => {
  Car.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json(data);
      }
    }
  );
});

// winston for logging
// swagger
// validation middleware

module.exports = router;
