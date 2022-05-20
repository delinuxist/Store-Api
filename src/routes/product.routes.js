const router = require("express").Router();
const productControllers = require("../controllers/product.controllers");

router.get("/", productControllers.getAllProducts);

router.get("/search", productControllers.search);

router.get("/test", productControllers.testProduct);

module.exports = router;
