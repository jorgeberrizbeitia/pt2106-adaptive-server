const { Schema, model } = require("mongoose");

// ! Simple user with username & password for auth & checking who to chat with
// ! Full auth is needed for using the session
const userSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;