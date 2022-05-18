const mongoose = require("mongoose");
require("dotenv").config();

const dbpass = process.env.dbPass;

const connectDb = () => {
  return mongoose.connect(
    `mongodb+srv://delinuxist:${dbpass}@cluster0.3byoe.mongodb.net/Store-Api?retryWrites=true&w=majority`
  );
};

module.exports = connectDb;
