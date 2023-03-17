const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (data) => {
  return jwt.sign(data, process.env.TOKENSECRET);
};

const verifyToken = (str) => {
  return jwt.verify(str, process.env.TOKENSECRET, (err, user) => {
    if (err) {
      return null;
    }
    return user;
  });
};

module.exports = { generateToken, verifyToken };
