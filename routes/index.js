const router = require("express").Router();
const paymentRoutes = require("./payment.routes")
const productRoutes = require("./product.routes")
const authRoutes = require("./auth.routes")
const userRoutes = require("./user.routes")
const chatRoutes = require("./chat.routes")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// basic auth
router.use("/auth", authRoutes)

// payments via stripe.js
router.use("/products", productRoutes)
router.use("/payments", paymentRoutes)

// chat via socket.io
router.use("/users", userRoutes)
router.use("/chat", chatRoutes)

module.exports = router;
