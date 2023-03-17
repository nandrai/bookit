const express = require("express");
const {
  getMyPlacesHandler,
  deleteMyPlacesHandler,
  addPlaceHandler,
  updatePlaceHandler,
  getAPlaceHandler,
  getAllPlaces,
} = require("../controllers/placesControllers");

const placesRoute = express.Router();

placesRoute.route("/").get(getAllPlaces);
placesRoute.route("/my-places").get(getMyPlacesHandler);
placesRoute.route("/my-places").delete(deleteMyPlacesHandler);
placesRoute.route("/").post(addPlaceHandler);
placesRoute.route("/:placeId").get(getAPlaceHandler);
placesRoute.route("/:placeId").put(updatePlaceHandler);

module.exports = placesRoute;
