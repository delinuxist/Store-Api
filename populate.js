const connectDb = require("./src/config/db.config");
const Product = require("./src/models/product.model");

const jsoProducts = require("./products.json");

const start = async () => {
  try {
    await connectDb();
    console.log(`Db connected`);
    await Product.deleteMany();
    await Product.create(jsoProducts);
    console.log("success!!!!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
