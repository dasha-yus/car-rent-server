require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')

const seedDB = require("./utils/seeds");
const carRoutes = require("./routes/car");
const userRoutes = require("./routes/auth");

const PORT = process.env.PORT || 4000;

// seedDB();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    mongoose.set("useFindAndModify", false);
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(carRoutes);
app.use(userRoutes);

start();
