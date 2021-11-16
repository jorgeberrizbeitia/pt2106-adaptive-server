const router = require("express").Router();
const paymentRoutes = require("./payment.routes")
const productRoutes = require("./product.routes")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
router.use("/products", productRoutes)
router.use("/payments", paymentRoutes)

module.exports = router;
