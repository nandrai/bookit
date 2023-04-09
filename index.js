const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./database/connect");

dotenv.config();

const port = process.env.PORT || 8001;
const uri = process.env.URI;

const start = () => {
  try {
    app.listen(port, () => {
      connectDB(uri);
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
