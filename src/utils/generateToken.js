const jwt = require("jsonwebtoken");

const generateToken = (id, email, isAdmin) => {
  return jwt.sign({ id, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

module.exports = generateToken;
