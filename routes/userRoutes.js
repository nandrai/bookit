const express = require("express");
const loginHandler = require("../controllers/loginControllers");
const logoutHandler = require("../controllers/logoutController");
const registerHandler = require("../controllers/registerControllers");

const userRoute = express.Router();

userRoute.route("/login").post(loginHandler);

userRoute.route("/register").post(registerHandler);

userRoute.route("/logout").get(logoutHandler);

module.exports = userRoute;
