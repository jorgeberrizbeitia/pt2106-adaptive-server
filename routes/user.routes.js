const router = require("express").Router();
const User = require("../models/User.model");

// ! Simple GET "/users" to get all users, just username
router.get("/", (req, res, next) => {
  User.find({}, { username: 1 })
  .then( (users) => res.status(200).json(users))
  .catch( (err) => next(err));
})


module.exports = router;