const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.dbUri;

const connectDb = () => {
  return mongoose.connect(URI);
};

module.exports = connectDb;
