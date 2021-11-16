const router = require("express").Router();
const Product = require("../models/Product.model");

// GET "/products" to get all products
router.get("/", (req, res, next) => {
  Product.find()
  .then( (products) => res.status(200).json(products))
  .catch( (err) => next(err));
})


module.exports = router;