const fs = require("fs");
const path = require("path");
const Car = require("../models/car");

const filePath = path.join(__dirname, "/../data/cars.json");
const fileData = fs.readFileSync(filePath);
const cars = JSON.parse(fileData);

const seedDB = () => {
  Car.remove({}, (err) => {
    if (err) console.log(err);
    console.log("removed cars");
    cars.forEach((car) => {
      Car.create(car, (err, cars) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added a car");
        }
      });
    });
  });
};

module.exports = seedDB;
