const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const userRoute = require("./routes/userRoutes");
const placesRoute = require("./routes/placesRoutes");
const bookingsRoute = require("./routes/bookingsRoutes");
const { verifyToken } = require("./controllers/tokenControllers");

const app = express();

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/places", placesRoute);
app.use("/api/bookings", bookingsRoute);

app.get("/api/profile", async (req, res) => {
  const { loginToken } = req.cookies;

  if (loginToken) {
    res.json(verifyToken(loginToken));
  } else {
    res.json(null);
  }
});

app.use(express.static(path.join(__dirname, "./client/dist/")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

module.exports = app;
