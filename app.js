const express = require("express");
require("dotenv").config();
const connectDb = require("./src/config/db.config");
//async errors
const notFoundMiddleware = require("./src/middlewares/not-found");
const errorHandlerMiddleware = require("./src/middlewares/error-handler.js");

const app = express();
const Port = process.env.PORT || process.env.port;
const v1 = process.env.v1;

//built in middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Welcome To Store-Api");
});

// Notfound middleware
app.use(notFoundMiddleware);
// errorhandler middleware
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb();
    console.log("🚀 Connected to Database");
    app.listen(Port, () => {
      console.log(`🚀 Server running on port: ${Port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
