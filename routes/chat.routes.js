const router = require("express").Router();
const Chat = require("../models/Chat.model");
const Message = require("../models/Message.model");

// TODO Step 1.1. A route to create a new Chat or send an existing one between users.
router.post("/create", (req, res, next) => {
  // user 1 comes from session
  // user 2 comes from FE (req.body)

  // eg. participants = [req.session.user._id, req.body.userId]
  // eg. participants = ['609b63324f3c1632c8ff35f4', '609b63644f3c1632c8ff35f5']

  const user1Id = req.session.user._id;
  const user2Id = req.body.userId;

  let participants = [ user1Id, user2Id ]

  // 1. check if chat exists
  Chat.findOne({ participants: { $all: participants } })
  .then( (foundChat) => {
    if (foundChat) {
      res.status(200).json(foundChat)
    } else {
      // 2. if not, create new
      Chat.create({ participants })
      .then( (newChat) => {
        // 3. route should send back id of chat (either new or existing)
        res.status(200).json(newChat)
      })
      .catch( (err) => next(err));
    }
  })
  .catch( (err) => next(err));


});

// 
// TODO Step 1.2. A route to get all messages of a certain converstaion
router.get("/messages/:chatId", (req, res, next) => {
  const { chatId } = req.params
  // 1. find all messages of chatId
  Message.find({ chatId })
  // 2. populate sender (to display name of person)
  .populate("sender")
  // 3. send all messages
  .then( (allMessages) => res.status(200).json(allMessages))
  .catch( (err) => next(err));

});

module.exports = router;
