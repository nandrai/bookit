const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./database/connect");

dotenv.config();

const port = 8001 || process.env.PORT;
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
