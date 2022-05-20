const Product = require("../models/product.model");

// test controller
exports.testProduct = async (req, res) => {
  const search = "a";
  const products = await Product.find({}).sort("-name");
  res.status(200).json({
    status: "success",
    numberOfProducts: products.length,
    data: products,
  });
};

// Get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    numberOfProducts: products.length,
    data: products,
  });
};

// Get products by query
exports.search = async (req, res) => {
  const { name, featured, company, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // numeric filters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }

  // select specific fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // limit results and skip page
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({
    status: "success",
    page: `${page}`,
    numberOfProducts: products.length,
    data: products,
  });
};
