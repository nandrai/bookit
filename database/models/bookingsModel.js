const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Place",
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  numberOfGuest: {
    type: Number,
    required: true,
  },
  numberOfNights: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const booking = mongoose.model("Booking", bookingSchema);

module.exports = booking;
