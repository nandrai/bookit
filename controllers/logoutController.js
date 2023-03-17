const logoutHandler = async (req, res) => {
  try {
    res.cookie("loginToken", "", (maxAge = 1)).json("logged out");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = logoutHandler;
