const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/auth");

// Get all reservations
router.get("/", isAdmin, (req, res) => {
  Reservation.find()
    .then((reservations) => res.json(reservations))
    .catch((err) => res.status(500).json(err));
});

// Get reservations for specific user
router.get("/user/:userId", isAuth, (req, res) => {
  Reservation.find({ userId: req.params.userId })
    .then((reservations) => res.json(reservations))
    .catch((err) => res.status(500).json(err));
});

// Add reservation
router.post("/", isAuth, (req, res) => {
  Reservation.create(req.body)
    .then((reservation) => res.json(reservation))
    .catch((err) => res.status(500).json(err));
});

// Delete reservation
router.delete("/:id", isAuth, (req, res) => {
  Reservation.findByIdAndRemove(req.params.id)
    .then((reservation) => res.json(reservation))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
