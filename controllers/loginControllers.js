const user = require("../database/models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("./tokenControllers");

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await user.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);

      if (passOk) {
        const token = generateToken({
          name: userDoc.name,
          email: userDoc.email,
          _id: userDoc._id,
        });
        res
          .cookie("loginToken", token)
          .json({ name: userDoc.name, email: userDoc.email, _id: userDoc._id });
      } else {
        res.status(422).json({ message: "Invalid credential" });
      }
    } else {
      res.status(422).json({ message: "Invalid credential" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = loginHandler;
