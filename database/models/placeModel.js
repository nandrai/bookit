const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  perks: {
    type: [String],
    required: true,
  },
  extraInfo: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Number,
    required: true,
  },
  checkOut: {
    type: Number,
    required: true,
  },
  maxGuest: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const place = mongoose.model("Place", placeSchema);

module.exports = place;
