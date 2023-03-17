const user = require("../database/models/userModel");
const bcrypt = require("bcryptjs");

const registerHandler = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync();

  try {
    await user.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(201).json({ message: `New user ${name} is registered` });
  } catch (error) {
    res
      .status(422)
      .json({ message: `Error occured while registering ${name}:- ${error}` });
  }
};

module.exports = registerHandler;
