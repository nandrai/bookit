const place = require("../database/models/placeModel");
const { uploadToCloudinary } = require("../cloudinary/cloudinary");
const { verifyToken } = require("./tokenControllers");

const getMyPlacesHandler = async (req, res) => {
  const { loginToken } = req.cookies;
  if (!loginToken) {
    res.json(null);
  } else {
    const userDoc = verifyToken(loginToken);
    if (!userDoc) {
      return res.json(null);
    } else {
      const owner_id = userDoc._id;
      try {
        const myPlaces = await place.find({ owner: owner_id });
        res.json(myPlaces).status(200);
      } catch (error) {
        res.json(error);
      }
    }
  }
};

const deleteMyPlacesHandler = async (req, res) => {
  const { loginToken } = req.cookies;
  if (!loginToken) {
    res.json(null);
  } else {
    const userDoc = verifyToken(loginToken);
    if (!userDoc) {
      return res.json(null);
    } else {
      const { _id } = req.body;
      try {
        await place.findByIdAndDelete({ _id });
        res.json("One place deleted").status(200);
      } catch (error) {
        res.json(error);
      }
    }
  }
};

const addPlaceHandler = async (req, res) => {
  const { loginToken } = req.cookies;

  if (!loginToken) {
    res.json(null);
  } else {
    const userDoc = verifyToken(loginToken);
    if (!userDoc) {
      return res.json(null);
    }

    const owner = userDoc._id;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    } = req.body;
    const photos = [];
    try {
      for (let i of addedPhotos) {
        const result = await uploadToCloudinary(i);
        photos.push(result.secure_url);
      }
    } catch (error) {
      return res.status(400).json("error uploading photo");
    }

    try {
      await place.create({
        owner,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price,
      });

      res.status(200).json("New place added");
    } catch (error) {
      return res.status(400).json("error mongo");
    }
  }
};

const updatePlaceHandler = async (req, res) => {
  const { loginToken } = req.cookies;

  if (!loginToken) {
    return res.json(null);
  } else {
    const userDoc = verifyToken(loginToken);
    if (!userDoc) {
      return res.json(null);
    }

    const owner = userDoc._id;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    } = req.body;
    const photos = [];
    try {
      for (let i of addedPhotos) {
        const result = await uploadToCloudinary(i);
        photos.push(result.secure_url);
      }
    } catch (error) {
      return res.status(400).json("error uploading photo");
    }

    try {
      const { placeId } = req.params;
      await place.findByIdAndUpdate(placeId, {
        owner,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price,
      });

      res.status(200).json("Place updated");
    } catch (error) {
      return res.status(400).json("error mongo");
    }
  }
};

const getAPlaceHandler = async (req, res) => {
  const { placeId } = req.params;
  try {
    const placeDoc = await place.findOne({ _id: placeId });
    return res.status(200).json(placeDoc);
  } catch (error) {
    return res.json(error);
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const allPlaces = await place.find({});
    return res.status(200).json(allPlaces);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  getMyPlacesHandler,
  deleteMyPlacesHandler,
  addPlaceHandler,
  updatePlaceHandler,
  getAPlaceHandler,
  getAllPlaces,
};
