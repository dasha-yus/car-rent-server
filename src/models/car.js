const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    enum : ['premium','business', 'sport', 'SUV', 'cabriolet', 'economy', 'electro'],
    required: true,
  },
  doors: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  gearbox: {
    type: String,
    enum : ['manual','auto', 'electro'],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fuel: {
    type: String,
    enum : ['hybrid','petrol', 'diesel'],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Car", carSchema);
