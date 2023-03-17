const express = require("express");
const bookingsRoute = express.Router();
const {
  addBookings,
  getBookings,
  deleteBooking,
} = require("../controllers/bookingsController");

bookingsRoute
  .route("/")
  .get(getBookings)
  .post(addBookings)
  .delete(deleteBooking);

module.exports = bookingsRoute;
