const booking = require("../database/models/bookingsModel");
const { verifyToken } = require("./tokenControllers");

const getBookings = async (req, res) => {
  const { loginToken } = req.cookies;
  if (!loginToken) {
    return res.json(null);
  }
  const { _id } = await verifyToken(loginToken);
  if (!_id) {
    return res.json(null);
  }
  try {
    const myBookings = await booking.find({ userId: _id }).populate("placeId");
    return res.status(200).json(myBookings);
  } catch (error) {
    return res.json(error);
  }
};

const addBookings = async (req, res) => {
  const { loginToken } = req.cookies;
  if (!loginToken) {
    return res.json(null);
  }
  const userDoc = verifyToken(loginToken);
  const _id = userDoc._id;
  if (!_id) {
    return res.json(null);
  }
  const {
    placeId,
    name,
    phone,
    checkInDate,
    checkOutDate,
    numberOfGuest,
    numberOfNights,
    totalPrice,
    rate,
  } = req.body;

  try {
    await booking.create({
      userId: _id,
      placeId,
      name,
      phone,
      checkInDate,
      checkOutDate,
      numberOfGuest,
      numberOfNights,
      totalPrice,
      rate,
    });
    return res.status(200).json("New booking Completed");
  } catch (error) {
    return res.json(error);
  }
};
const deleteBooking = async (req, res) => {
  const { loginToken } = req.cookies;
  if (!loginToken) {
    return res.json(null);
  }
  const userDoc = verifyToken(loginToken);
  const _id = userDoc._id;
  if (!_id) {
    return res.json(null);
  }

  const { bookingId } = req.body;

  try {
    await booking.findByIdAndDelete(bookingId);
    return res.status(200).json("Booking deleted");
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { getBookings, addBookings, deleteBooking };
