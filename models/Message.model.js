const { Schema, model } = require("mongoose");
require("./User.model");
require("./Chat.model");

// ! Messages will be attached to the ChatId, have a sender and content.
let messageSchema = new Schema(
  {
    sender: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    input: String,
    chatId: {
      ref: "Chat",
      type: Schema.Types.ObjectId,
    }, // the chatId will also be the socket id
  },
  {
    timestamps: true,
  }
);

let Message = model("Message", messageSchema);

module.exports = Message;
